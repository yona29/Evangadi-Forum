import express from "express";
import mysql2 from "mysql2";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(express.json());

// ✅ MySQL connection
// const dbConnection = mysql2.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bd",
// });

// ✅ Wrap with promise for async/await
 const db = dbConnection.promise();

// ✅ Test MySQL connection

async function start() {
  try {
    const [rows] = await db.execute("SELECT 'test' AS message");
    console.log("MySQL test query result:", rows);
  } catch (error) {
    console.error("❌ MySQL query error:", error.message);
  }
}

start();

// ✅ User routes
app.use("/api/users", userRoute);

// ✅ Start the server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
