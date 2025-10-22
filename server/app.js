const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const aiRoute = require("./routes/aiRoute");
const groupRoutes = require("./routes/groupRoute");
const installRoutes = require("./routes/installRoute");
const authMiddleware = require("./middleware/authMiddleware");
const db = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 14255;

// -------------------------------
// Middleware
// -------------------------------
app.use(helmet()); // Security headers
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// Optional HTTP logger for dev
if (process.env.NODE_ENV !== "production") {
  app.use(require("morgan")("dev"));
}

// -------------------------------
// Test route
// -------------------------------
app.get("/", (req, res) => res.send("Hello from Evangadi Forum!"));

// -------------------------------
// API routes
// -------------------------------

// Public routes (no auth)
app.use("/", installRoutes);
app.use("/api/user", userRoutes); // Register/Login
app.use("/api/auth", authRoutes); // Forgot/Reset Password

// Protected routes (authMiddleware)
app.use("/api", authMiddleware, questionRoutes);
app.use("/api", authMiddleware, answerRoutes);
app.use("/api/ai", authMiddleware, aiRoute);
app.use("/api/groups", authMiddleware, groupRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// -------------------------------
// 404 & Global Error Handler
// -------------------------------
app.use((req, res, next) =>
  res.status(404).json({ message: "Route not found" })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// -------------------------------
// Database connection & server start
// -------------------------------
async function startServer() {
  try {
    await db.query("SELECT 1"); // Test DB connection
    console.log("✅ MySQL promise-based pool created");

    // Bind to all interfaces for Render deployment
    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
