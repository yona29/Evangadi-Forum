const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig.js")



app.get("/", (req, res) => {
  res.send("Hello from Evangadi Forum!");
});

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
