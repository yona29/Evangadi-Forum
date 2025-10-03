const express = require("express");
const router = express.Router();

//Authentication middleware

const authMiddleware = require("../middleware/authMiddleware");

//user controllers

const { register, login, checkUser } = require("../controller/userController");

//Login users
router.post("/login", login);

//check users

router.get("/check", authMiddleware, checkUser);

module.exports = router;
