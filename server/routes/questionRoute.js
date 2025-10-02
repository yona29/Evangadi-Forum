const express = require("express");
const router = express.Router();

const {
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// Get all questions
router.get("/", getAllQuestions);

// Get single question
router.get("/:question_id", getSingleQuestion);

module.exports = router;
// Import controller functions
const { question } = require("../controller/questionController");

// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.post("/question", authMiddleware, question);
