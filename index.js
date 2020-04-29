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

//Create database
app.get("/create/db/:dbName", (req, res) => {
  let sql = "CREATE DATABASE " + req.params.dbName;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//Create table in database
app.get("/create/table/:tblName", (req, res) => {
  let sql = `CREATE TABLE 
    ${req.params.tblName} 
    (id int AUTO_INCREMENT PRIMARY KEY,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255))`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created...");
  });
});
//CRUD App
//Insert into table users
app.get("/insert/table/:LastName/:FirstName/:Address/:City", (req, res) => {
  let user = {
    LastName: req.params.LastName,
    FirstName: req.params.FirstName,
    Address: req.params.Address,
    City: req.params.City,
  };
  let sql = "INSERT INTO users SET ?";

  db.query(sql, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Data Inserted...");
  });
});

//Select data from a table
app.get("/select/:tblName", (req, res) => {
  let sql = `SELECT * FROM  ${req.params.tblName}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//Select particular user
app.get("/select/:tblName/:id", (req, res) => {
  let sql = `SELECT * FROM  ${req.params.tblName} WHERE id=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//Update data of table users  
app.get("/update/data/:id/:LastName/:FirstName/:Address/:City", (req, res) => {
  let user = {
    id: req.params.id,
    LastName: req.params.LastName,
    FirstName: req.params.FirstName,
    Address: req.params.Address,
    City: req.params.City,
  };
  let sql = `UPDATE users SET LastName = '${user.LastName}', FirstName = '${user.FirstName}', Address = '${user.Address}', City = '${user.City}' WHERE id = ${user.id}`;
  console.log(sql);
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Data Updated...");
  });
});

//Delete user from table users
app.get("/delete/users/:id",(req,res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Data Deleted...");
  });
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});
