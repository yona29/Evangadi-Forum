const dbConnection = require("../db/dbConfig");

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

module.exports = { getAllQuestions, getSingleQuestion };
