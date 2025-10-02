const express = require("express");
const router = express.Router();

const {
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// Import authentication middleware

const authMiddleware = require("../middleware/authMiddleware");

// Get all questions
router.get("/", authMiddleware, getAllQuestions);

// Get single question
router.get("/:question_id", authMiddleware, getSingleQuestion);


router.post("/question", authMiddleware, question);

module.exports = router;

