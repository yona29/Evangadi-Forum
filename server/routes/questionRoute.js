const express = require("express");
const router = express.Router();

const {
  question,
  Allquestion,
  getSingleQuestion,
} = require("../controller/questionController");

// Import authentication middleware

const authMiddleware = require("../middleware/authMiddleware");

//post quistion
router.post("/question", authMiddleware, question);

// Get all questions
router.get("/question", authMiddleware, Allquestion);

// Get single question
router.get("/question/:question_id", authMiddleware, getSingleQuestion);

module.exports = router;
