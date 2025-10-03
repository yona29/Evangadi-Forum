const express = require("express");
const router = express.Router();

// Import controller functions
const { question } = require("../controller/questionController");

// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.post("/question", authMiddleware, question);
