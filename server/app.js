require('dotenv').config()

const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig.js")
// // user routes middleware file
const userRoutes = require("./routes/userRoute")

// // Questions routes middleware file
// // json middleware to extract data
app.use(express.json())

// // user routes middleware
app.use("/api/user", userRoutes)

// // questions routes middleware

app.get("/", (req, res) => {
  res.send("Hello from Evangadi Forum!");
});

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





// const express = require("express");
// const app = express();
// const port = 5500;


// // db Connection
// const dbConnection = require("./db/dbConfig")

// // user routes middleware file
// const userRoutes = require("./routes/userRoute")

// // Questions routes middleware file
// const questionsRoutes = require("./routes/questionRoute")

// // json middleware to extract data
// app.use(express.json())

// // user routes middleware
// app.use("/api/users", userRoutes)

// // questions routes middleware
// app.use("/api/questions", questionRoute)

// //  routes middleware


// // answers routes middleware

// async function start() {
//   try {
//     const result = await dbConnection.execute('select "test" ')
//     app.listen(port)
//     console.log("Database Connection established");
//     console.log(`listening on ${port}`);
//   } catch (error) {
//     console.log(error.message);
//   }
  
// }

// start()


// const mysql2 = require("mysql2");


// const dbConnection = mysql2.createPool({
//   user: "evangadi-admin",
//   password: '123456',
//   database: "evangadi-forum",
//   host: 'localhost',
//   connectionLimit: 10
// });

// dbConnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// })

