
const express = require("express");
const router = express.Router();

// Import controller functions
const { postAnswer, getAnswer } = require("../controller/answerController");


// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.post("/answer/:questionid", authMiddleware, postAnswer);

router.get("/answer/:questionid", authMiddleware, getAnswer);

module.exports = router;
