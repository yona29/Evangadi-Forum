// Import dependencies
const express = require("express");
const cors = require("cors");

// Import custom routes and middleware
const answerRoutes = require("./routes/answerRoute");
const questionRoutes = require("./routes/questionRoute");
const userRoutes = require("./routes/userRoute");
const aiRoute = require("./routes/aiRoute");
const installRoutes = require("./routes/installRoute");
const authMiddleware = require("./middleware/authMiddleware");
const dbConnection = require("./db/dbConfig");
const groupRoutes = require("./routes/groupRoute"); //new

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Evangadi Forum!");
});

app.use("/", installRoutes);
app.use("/api/user", userRoutes);
app.use("/api", authMiddleware, questionRoutes);
app.use("/api", authMiddleware, answerRoutes);
app.use("/api/ai", authMiddleware, aiRoute);
app.use("/api/groups", authMiddleware, groupRoutes); //new



// Attempt database connection; on success, the app starts listening.
async function start() {
  try {
    await dbConnection.getConnection();
    console.log("✅ Database connection established");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
