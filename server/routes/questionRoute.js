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
