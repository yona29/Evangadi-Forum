const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const authController = require("../controller/authController");

// Rate limiter for forgot password
const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many requests, please try again later.",
});

// Validation middleware
const validateEmail = [
  body("email").isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validatePassword = [
  body("newPassword").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Routes
router.post(
  "/forgot-password",
  forgotLimiter,
  validateEmail,
  authController.forgotPassword
);
router.post(
  "/reset-password/:token",
  validatePassword,
  authController.resetPassword
);

module.exports = router;
