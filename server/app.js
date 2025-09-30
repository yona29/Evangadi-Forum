const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig.js")

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
