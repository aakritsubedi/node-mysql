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
