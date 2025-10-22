const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

// Debug route to verify auth routes are accessible
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!", timestamp: new Date().toISOString() });
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
