# Using MySQL with nodeJS

## Getting Started

- Install node js
  - Download node js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- npm init `initilize the package.json file`
- yarn add express `for backend`
- yarn add mysql `MySQL db`

### index.js

- import necessary packages
  ```javascript
  const express = require("express");
  const mysql = require("mysql");
  require("dotenv").config();
  ```
- Create a database connection and connect to the MySQL Server

  ```javascript
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  });
  ```

  ```javascript
  db.connect((err) => {
    if (err) {
      throw err;
    }

    console.log("MySQL server connected.");
  });
  ```

  - Start the server

  ```javascript
  const app = express();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
  ```

  - Routes in index.js

    - Create database: Eg: `/create/db/node-mysql`

      ```javascript
      app.get("/create/db/:dbName", (req, res) => {
        let sql = "CREATE DATABASE " + req.params.dbName;

        db.query(sql, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.send("Database created...");
        });
      });
      ```

    - Create table: Eg: `/create/table/users`

      ```javascript
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
      ```

    - `CRUD` Operation 
      - Create new record `INSERT`  
        **SQL Query:**
        ```javascript 
        INSERT INTO table_name(col1, col2, ... ) VALUES(val1, val2, ...)
        ```
          
        ```javascript
        app.get("/insert/table/:LastName/:FirstName/:Address/:City", (req, res) => {
        let user = {
          LastName: req.params.LastName,
          FirstName: req.params.FirstName,
          Address: req.params.Address,
          City: req.params.City
        };
        let sql = "INSERT INTO users SET ?";

        db.query(sql, user, (err, result) => {
          if (err) throw err;
            console.log(result);
            res.send("Data Inserted...");
          });
        });
        ```

      - SELECT record/s `SELECT`  
        **SQL Query:**
        ```javascript
            SELECT * FROM table_name WHERE conditions
        ```
        **All Records**  
          ```javascript
          app.get("/select/:tblName", (req, res) => {
          let sql = `SELECT * FROM  ${req.params.tblName}`;

          db.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
            });
          });
          ```
        
        **Particular Record**
          ```javascript
          app.get("/select/:tblName/:id", (req, res) => {
          let sql = `SELECT * FROM  ${req.params.tblName} WHERE id=${req.params.id}`;

          db.query(sql, (err, result) => {
            if (err) throw err;
              res.json(result);
            });
          });
          ```

      - Update record `UPDATE`  
        **SQL Query:**
        ```javascript 
          UPDATE table_name SET col1 = val1, col2 = val2 .. WHERE conditions
        ```

        ```javascript
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
        ```

    - Delete data `DELETE`  
      **SQL Query:**
      ```javascript 
        DELETE FROM table_name WHERE conditions
      ```

      ```javascript
        app.get("/delete/users/:id",(req,res) => {
        let sql = `DELETE FROM users WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
          if (err) throw err;
            console.log(result);
            res.send("Data Deleted...");
          });
        })
      ```

## Clone the project 
 - git clone git@github.com:aakritsubedi/node-mysql.git
 - Create the database in MySQL Server
 - Create the `.env` file and populate the value following the `.env.examples`
 - `$ yarn` to install the necessary modules 
 - `$ yarn start`
    - your App running at:  
      Local: http://localhost:3000/
 - list of avaiable routes
    - **Create database:**  `/create/db/:dbName`      
      Eg: 'http://localhost:3000/create/db/node_mysql'
    - **Create table:**  `/create/table/:tblName`  
      Eg: 'http://localhost:3000/create/table/users'
    - **INSERT data:**  `/insert/table/:LastName/:FirstName/:Address/:City`  
      Eg: 'http://localhost:3000/insert/table/Subedi/Aakrit/Basundhara/Kathmandu'
    - **SELECT data:** 
        - **ALL Records:** `/select/:tblName`
          Eg: 'http://localhost:3000/select/users'
        - **Particular Record:** `/select/:tblName/:id`
          Eg: 'http://localhost:3000/select/users/1'
    - **Update data:**  `/update/data/:id/:LastName/:FirstName/:Address/:City`
      Eg: 'http://localhost:3000/update/data/1/Subedi/Aakrit/Bahundangi/Jhapa'
    - **Delete data:**   `/delete/users/:id`
      Eg: 'http://localhost:3000/delete/users/1'