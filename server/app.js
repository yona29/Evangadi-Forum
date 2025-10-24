const express = require("express");
const app = express();
const port = 5500;

<<<<<<< Updated upstream
const dbConnection = require("./db/dbConfig.js");
=======
// -------------------------------
// Middleware
// -------------------------------
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);
app.use(express.json({ limit: "10mb" })); // Limit request size
>>>>>>> Stashed changes

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
