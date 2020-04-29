const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

// Create DB Connection
var db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

//Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("MySQL server connected.");
});

const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});
