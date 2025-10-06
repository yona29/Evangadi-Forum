import React, { useState } from "react";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset message
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
      } else {
        console.error("Login failed:", data.msg);
        setErrorMessage("User not found. Please register before signing in.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.landing}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login to your account</h2>
        <p className={styles.subtitle}>
          Don’t have an account?{" "}
          <a href="#" className={styles.link}>
            Create a new account
          </a>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={togglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <a href="#" className={styles.createLink}>
          Create an account?
        </a>
      </div>
    </div>
  );
};

export default Login;
