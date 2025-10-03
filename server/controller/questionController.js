const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

// ---------------------- CREATE A NEW QUESTION ----------------------
async function question(req, res) {
  const { title, description } = req.body;

  // Generate unique question ID
  const questionid = uuidv4();

  // Validate input
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required information",
    });
  }

  if (title.length > 200) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Title must be less than 200 characters",
    });
  }

  try {
    // Get user info from auth middleware (JWT)
    const userid = req.user.userid;
    const username = req.user.username;

    // Extra safety: check for duplicate question ID (rare with UUID)
    const [existingQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );
    if (existingQuestion.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Question ID already exists" });
    }

    // Insert new question into database
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "Question added successfully",
      questionid,
    });
  } catch (error) {
    console.error("Error adding question:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later",
    });
  }
}

//get all question
const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM questionTable ORDER BY created_at DESC"
    );
    if (!rows.length) {
      return res.status(404).json({ message: "No questions found" });
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get single question
const getSingleQuestion = async (req, res) => {
  const { question_id } = req.params;
  
   if (!question_id) {
     return res
       .status(StatusCodes.BAD_REQUEST)
       .json({ msg: "Please provide a question ID." });
   }

  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM questionTable WHERE question_id = ?",
      [question_id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { question, getAllQuestions, getSingleQuestion };
