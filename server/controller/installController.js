// Import database connection
const dbConnection = require("../db/dbConfig");

// Function to create database tables if they don't exist
async function install(req, res) {
  let createUser = `CREATE TABLE IF NOT EXISTS users (
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,   
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,      
    password VARCHAR(255) NOT NULL,          
    PRIMARY KEY(userid)
  )`;

  let createQuestions = `CREATE TABLE IF NOT EXISTS questions (
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,  
    userid INT(20) NOT NULL,                  
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, questionid),
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
  )`;

  let createAnswers = `CREATE TABLE IF NOT EXISTS answers (
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,                 
    questionid VARCHAR(100) NOT NULL,        
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
  )`;

  try {
    await dbConnection.query(createUser);
    await dbConnection.query(createQuestions);
    await dbConnection.query(createAnswers);

    return res.status(201).json({ msg: "Tables created successfully" });
  } catch (error) {
    console.error("Error creating tables:", error.message);

    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later" });
  }
}

// Export the install function
module.exports = { install };
