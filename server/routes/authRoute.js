const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const authController = require("../controller/authController");

// Rate limiter: 5 requests per hour for forgot password
const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

// Validation middlewares
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

// Public routes
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
