const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:token", resetPassword);

module.exports = router;
