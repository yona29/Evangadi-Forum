const express = require("express");
const router = express.Router();

// Import controller functions
const { postAnswer } = require("../controller/answerController");

// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.post("/answer/:questionid", authMiddleware, postAnswer);
