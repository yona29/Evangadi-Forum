const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const dbconnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// console.log(process.env.DB_PASSWORD);

// dbconnection.execute("SELECT 'test'", (err, result) => {
//   if (err) {
//     console.log("Connection/Query error:", err.message);
//   } else {
//     console.log("Query result:", result);
//   }
// });

module.exports = dbconnection.promise();
