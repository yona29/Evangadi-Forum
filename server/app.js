
const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig.js")

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

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);

