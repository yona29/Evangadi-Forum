const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const dbconnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
(async () => {
  try {
    const connection = await dbConnection.promise().getConnection();
    console.log("✅ Connected to database successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();


module.exports = dbconnection.promise();
