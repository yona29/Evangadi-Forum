// ForgotPassword.jsx
import { useState } from "react";
import axios from "../../Api/axios";
import classes from "./Auth.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // user-visible message
  const [type, setType] = useState("info"); // "info" | "success" | "error"
  const [loading, setLoading] = useState(false);

  const validateEmail = (val) => {
    // simple client-side email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("info");

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setType("error");
      return;
    }

    setLoading(true);
    try {
      // NOTE: your axios base likely contains "/api" already.
      const res = await axios.post("/auth/forgot-password", { email });
      // backend returns a generic success message even if email not found
      setMessage(
        res.data.message || "If that email exists, a reset link was sent."
      );
      setType("success");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      // Keep frontend message generic if server returns generic; otherwise show server msg
      const serverMsg = err?.response?.data?.message;
      setMessage(serverMsg || "Error sending reset link. Try again later.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["auth-container"]}>
      <div className={classes["auth-box"]}>
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive a password reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            autoComplete="email"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
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
