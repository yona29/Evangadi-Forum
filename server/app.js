<<<<<<< Updated upstream
<<<<<<< Updated upstream
const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig.js")
=======
=======
>>>>>>> Stashed changes
// Import dependencies
const express = require("express");
const cors = require("cors");

// Import custom routes and middleware
const answerRoutes = require("./routes/answerRoute");
const questionRoutes = require("./routes/questionRoute");
const userRoutes = require("./routes/userRoute");
const installRoutes = require("./routes/installRoute");
const authMiddleware = require("./middleware/authMiddleware");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT;
app.use(cors()); 
app.use(express.json()); 

// Test route
app.get("/", (req, res) => res.send("welcome"));

// Routes
app.use("/", installRoutes); 
app.use("/api/user", userRoutes); 
app.use("/api", authMiddleware, questionRoutes); 
app.use("/api", authMiddleware, answerRoutes); 

// Test DB connection
(async function start() {
  try {
    await dbConnection.getConnection();
    console.log("✅ Database connection established");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
<<<<<<< Updated upstream
<<<<<<< Updated upstream

// try conncet to database and if so app listen
async function start() {
  try {
    const result = await dbConnection.getConnection();
    console.log("database connection was established !!");
  } catch (error) {
    console.log(error.message);
  }
}
start();

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
