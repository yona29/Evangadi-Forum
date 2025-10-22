// ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import classes from "./Auth.module.css";

export default function ResetPassword() {
  const { token } = useParams(); // expects /reset-password/:token
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info"); // "info"|"success"|"error"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid password reset link.");
      setType("error");
    }
  }, [token]);

  const validatePassword = (pwd) => {
    // enforce basic rules: min 6 chars (you can add more complexity)
    return typeof pwd === "string" && pwd.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("info");

    if (!validatePassword(newPassword)) {
      setMessage("Password must be at least 6 characters long.");
      setType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setType("error");
      return;
    }

    setLoading(true);
    try {
      // NOTE: backend route expects POST /auth/reset-password/:token
      const res = await axios.post(`/auth/reset-password/${token}`, {
        newPassword,
      });

      setMessage(
        res.data.message || "Password reset successful. Redirecting to login..."
      );
      setType("success");

      // Give user a moment to read the message, then navigate
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      console.error("Reset Password Error:", err);
      const serverMsg = err?.response?.data?.message;
      setMessage(
        serverMsg || "Error resetting password. The link may have expired."
      );
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["auth-container"]}>
      <div className={classes["auth-box"]}>
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            className={`${classes["auth-message"]} ${
              type === "success" ? classes.success : classes.error
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
