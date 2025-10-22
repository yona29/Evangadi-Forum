const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../db/dbConfig");
const sendEmail = require("../utils/sendEmail");

// FRONTEND URL from env
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// --- Forgot Password ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Validate user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      // Generic message to prevent enumeration
      return res
        .status(200)
        .json({ message: "If that email exists, a reset link has been sent." });
    }

    const user = users[0];

    // 2️⃣ Generate token & hash it
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 3️⃣ Save hashed token
    await db.query(
      "UPDATE users SET reset_token = ?, reset_expires = ? WHERE userid = ?",
      [tokenHash, expires, user.userid]
    );

    // 4️⃣ Build reset link
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    // 5️⃣ Email HTML
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;">
        <h3>Password Reset Request</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" style="background:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      </div>
    `;

    // 6️⃣ Send email (async)
    await sendEmail(email, "Reset Your Password", htmlContent);

    res
      .status(200)
      .json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Error sending reset email." });
  }
};

// --- Reset Password ---
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // 1️⃣ Verify token & expiry
    const [users] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_expires > NOW()",
      [tokenHash]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    // 2️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3️⃣ Update password and clear reset token
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
