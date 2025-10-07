// import React, { useState } from "react";
// import styles from "./Login.module.css";

// // FontAwesome imports
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const Landing = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div className={styles.landing}>
//       {/* Left side - Login Box */}
//       <div className={styles.loginBox}>
//         <h2 className={styles.title}>Login to your account</h2>
//         <p className={styles.subtitle}>
//           Don’t have an account?{" "}
//           <a href="#" className={styles.link}>
//             Create a new account
//           </a>
//         </p>

//         <form className={styles.form}>
//           <input
//             type="email"
//             placeholder="Your Email"
//             className={styles.input}
//           />

//           {/* Password field with toggle */}
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Your Password"
//               className={styles.input}
//             />
//             <button
//               type="button"
//               className={styles.toggleBtn}
//               onClick={togglePassword}
//             >
//               <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//             </button>
//           </div>

//           <button type="submit" className={styles.submitBtn}>
//             submit
//           </button>
//         </form>

//         <a href="#" className={styles.createLink}>
//           Create an account?
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Landing;
