import express from "express";
import mysql2 from "mysql2";

const app = express();


const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stack_qa",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Evangadi Forum!");
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
