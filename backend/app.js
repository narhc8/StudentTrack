const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8000;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "3.234.246.29",
  user: "romanellicj",
  password: "V00884541",
  database: "romanellicj",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected with mysql database...");
});

app.post("/signup", async (req, res) => {
  console.log("User is trying to signup");
  var result;
  const usernameD = connection.escape(req.body.username);
  const passwordD = req.body.password;
  const lastnameD = connection.escape(req.body.first_name);
  const firstnameD = connection.escape(req.body.last_name);
  const emailD = connection.escape(req.body.email);

  const hashedPass = await bcrypt.hash(passwordD, saltRounds);

  const sql_query =
    "INSERT INTO users (first_name, last_name, username, password, email) VALUES (" +
    firstnameD +
    ", " +
    lastnameD +
    ", " +
    usernameD +
    ", '" +
    hashedPass +
    "', " +
    emailD +
    ");";

  connection.query(sql_query, function (err, result) {
    if (err) {
      result = {
        response: "ERROR",
        data: err,
      };
      res.json(result);
    } else {
      result = {
        response: "SUCCESS",
        data: result,
      };
      res.json(result);
    }
  });
});

app.post("/login", async (req, res) => {
  console.log("User is trying to login");
  var resResult;
  const usernameD = connection.escape(req.body.username);
  const passwordD = req.body.password;

  const sql_query =
    "SELECT u.password, u.user_id FROM users AS u WHERE u.username = " +
    usernameD +
    ";";

  connection.query(sql_query, function (err, result) {
    if (err) {
      resResult = {
        response: "ERROR",
        data: err,
      };
      res.json(resResult);
    } else {
      const hashedPassword = result[0]["password"];
      const user_id = result[0]["user_id"];
      console.log(hashedPassword);
      bcrypt.compare(passwordD, hashedPassword).then((response) => {
        if (response) {
          resResult = {
            response: "SUCCESS",
            user_id: user_id,
            code: 1001,
          };
          res.json(resResult);
        } else {
          resResult = {
            response: "ERROR",
            code: 1002,
          };
          res.json(resResult);
        }
      });
    }
  });
});

app.get("/getBoards", function (req, res) {
  console.log("Retrieving board info");
  const uId = connection.escape(req.query.user_id);
  const sql_query =
    "SELECT B.board_name, B.description, B.board_id FROM `boards` AS B JOIN `groups` AS G " +
    "ON (B.board_id = G.board_id AND G.user_id = " +
    uId +
    ")";
  connection.query(sql_query, function (err, result) {
    res.json(result);
  });
});

app.post("/addBoard", function (req, res) {
  console.log("putting board info");
  const board_name = connection.escape(req.body.board_name);
  const description = connection.escape(req.body.description);
  const userId = connection.escape(req.body.user_id);
  const sql_query =
    "INSERT INTO boards (board_name, description) VALUES (" +
    board_name +
    ", " +
    description +
    ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    const boardId = result.insertId;
    const anotherSqlQuery = "CALL addCreator(" + userId + ", " + boardId + ");";
    connection.query(anotherSqlQuery, function (err, result) {
      if (err) {
        result = {
          response: "ERROR",
          data: err,
        };
        res.json(result);
      } else {
        result = {
          response: "SUCCESS",
          data: result,
        };
        res.json(result);
      }
    });
  });
});

app.listen(port, () => console.log(`Example app listening`));
