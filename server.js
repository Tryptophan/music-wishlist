const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

connection.connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/wanted", (request, response) => {
  connection.query(`select * from ${process.env.SQL_WANT_TABLE}`, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

// TODO:
// app.delete("/remove", (res, req) => {
//   res.send("Hello world!");
// });

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}.`);
});
