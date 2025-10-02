const mysql2 = require("mysql2");


const dbConnection = mysql2.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: 'localhost',
  connectionLimit: 10
});

// Connect to the database
// dbConnection.getConnection((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//     return;
//   } else {
//     console.log("Connected to database successfully!");
//   }
// });

module.exports = dbConnection.promise();


