const express = require("express");
const router = express.Router();

const {
  question,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// Import authentication middleware

const authMiddleware = require("../middleware/authMiddleware");

//post quistion 
router.post("/question", authMiddleware, question);


// Get all questions
router.get("/quistion", authMiddleware, getAllQuestions);



// Get single question
router.get("/quistion/:question_id", authMiddleware, getSingleQuestion);



module.exports = router;

