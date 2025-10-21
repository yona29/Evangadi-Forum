const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../db/dbConfig");
const sendEmail = require("../utils/sendEmail");

// Use environment variable for frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    // 2️⃣ Generate reset token and expiration
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // 3️⃣ Save token and expiry to DB
    await db.query(
      "UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?",
      [token, expires, email]
    );

    // 4️⃣ Build password reset link dynamically (works in prod & dev)
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    // 5️⃣ Email HTML content
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;">
        <h3>Password Reset Request</h3>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" 
           style="background:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
           Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
      </div>
    `;

    // 6️⃣ Send email
    await sendEmail(email, "Reset Your Password", htmlContent);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Error sending reset email." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // 1️⃣ Verify valid token & expiration
    const [users] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_expires > NOW()",
      [token]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    // 2️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3️⃣ Update user password and clear reset fields
    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE userid = ?",
      [hashedPassword, users[0].userid]
    );

    res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Error resetting password." });
  }
};
