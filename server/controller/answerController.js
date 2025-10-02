// ---------------------- IMPORT DEPENDENCIES ----------------------
const {StatusCodes} = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// ---------------------- POST AN ANSWER ----------------------
async function postAnswer(req, res) {
  const {answer} = req.body;
  const {questionid} = req.params;

  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required information",
    });
  }

  try {
    const userid = req.user.userid;
    const username = req.user.username;

    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "Answer added successfully",
    });
  } catch (error) {
    console.error("Error while posting answer:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later",
    });
  }
}
