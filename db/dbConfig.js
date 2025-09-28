import express from "express";
import mysql2 from "mysql2";

const app = express();

const dbConnection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "bd",
});

export default dbConnection.promise();
