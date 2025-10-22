const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const authController = require("../controller/authController");

const router = express.Router();

// Rate limiter for forgot-password (max 5 requests per hour)
const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests, try again later",
});

// Email validation middleware
const validateEmail = [
  body("email").isEmail().normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Password validation middleware
const validatePassword = [
  body("newPassword").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// -------------------
// Public Routes
// -------------------
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
