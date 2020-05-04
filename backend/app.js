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

app.get('/getBoards', function (req, res) {
  console.log("Retrieving board info");
  const uId = connection.escape(req.query.user_id);
  const sql_query =
    "SELECT B.board_name, B.board_desc, B.board_id FROM `boards` AS B JOIN `groups` AS G " +
    "ON (B.board_id = G.board_id AND G.user_id = " +
    uId +
    ")";
  connection.query(sql_query, function (err, result) {
    if(err) throw err
    res.json(result);
  });
});

app.get('/getTasks', function (req, res) {
  console.log("Retrieving task info");
  const boardId = req.query.board_id;
  const sql_query = "CALL getTasks(" + boardId + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err
    res.json(result[0]);
  });
});

app.post("/signup", async (req, res) => {
  console.log("User is trying to signup");
  var result;
  const usernameD = connection.escape(req.body.username);
  const passwordD = req.body.password;
  const firstnameD = connection.escape(req.body.first_name);
  const lastnameD = connection.escape(req.body.last_name);
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
    "SELECT u.* FROM users AS u WHERE u.username = " +
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
      const userObj = result[0];
      bcrypt.compare(passwordD, hashedPassword).then((response) => {
        if (response) {
          resResult = {
            response: "SUCCESS",
            user: userObj,
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


app.post('/addBoard', function (req, res) {
  console.log("putting board info");
  const board_name = connection.escape(req.body.board_name);
  const description = connection.escape(req.body.description);
  const userId = connection.escape(req.body.user_id);
  const sql_query =
    "INSERT INTO boards (board_name, board_desc) VALUES (" +
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


app.post('/updateTaskList', function (req, res) {
  console.log("updating task list");
  const task_id = connection.escape(req.body.task_id);
  const list_id = connection.escape(req.body.list_id);

  const sql_query = "CALL updateTaskList(" + task_id + ", " + list_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/updateListName', function (req, res) {
  console.log("updating list name");
  const list_name = connection.escape(req.body.list_name);
  const list_id = connection.escape(req.body.list_id);

  const sql_query = "CALL updateListName(" + list_name + ", " + list_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/addNewTask', function (req, res) {
  console.log("Adding new task");
  const task_name = connection.escape(req.body.name);
  const task_desc = connection.escape(req.body.desc);
  const list_id = connection.escape(req.body.list_id);
  const author_id = connection.escape(req.body.author_id);

  const sql_query = "CALL addTask(" + task_name + ", " + task_desc + ", " + author_id + ", " + list_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/addNewList', function (req, res) {
  console.log("adding new List");
  const list_name = connection.escape(req.body.name);
  const board_id = connection.escape(req.body.board_id);

  const sql_query = "CALL addList(" + list_name + ", " + board_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/deleteList', function (req, res) {
  console.log("deleting task");
  const list_id = connection.escape(req.body.list_id);

  const sql_query = "CALL deleteList(" + list_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/deleteBoard', function (req, res) {
  console.log("deleting board");
  const board_id = connection.escape(req.body.board_id);

  const sql_query = "CALL dropBoard(" + board_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/updateBoard', function (req, res) {
  console.log("updating board");
  const board_id = connection.escape(req.body.board_id);
  const name = connection.escape(req.body.name);
  const desc = connection.escape(req.body.desc);

  const sql_query = "CALL updateBoard(" + board_id + ", " + name + ", " + desc + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/addCollab', function (req, res) {
  console.log("updating board");
  const board_id = connection.escape(req.body.board_id);
  const user_id = connection.escape(req.body.user_id);
  const role_id = connection.escape(req.body.role_id);

  const sql_query = "CALL addCollab(" + user_id + ", " + role_id + ", " + board_id + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});


app.get('/getCollabs', function (req, res) {
  console.log("updating board");
  const board_id = connection.escape(req.query.board_id);

  const sql_query = "SELECT G.user_id, CONCAT(U.first_name, \" \", U.last_name) AS 'name', R.role_name from `groups` AS G INNER JOIN roles AS R using (role_id) INNER JOIN users AS U USING(user_id) where G.board_id = " + board_id + ";";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/getCurrentRole', function (req, res) {
  console.log("updating board");
  const board_id = connection.escape(req.query.board_id);
  const user_id = connection.escape(req.query.user_id);

  const sql_query = "SELECT G.role_id from `groups` as G where G.user_id = " + user_id + "and G.board_id = " + board_id + ";";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/removeCollab', function (req, res) {
  console.log("updating board");
  const board_id = connection.escape(req.body.board_id);
  const user_id = connection.escape(req.body.user_id);

  const sql_query = "CALL deleteCollab(" + user_id + ", " + board_id + ");"
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/deleteTask', function (req, res) {
  console.log("updating board");
  const task_id = connection.escape(req.body.task_id);

  const sql_query = "DELETE FROM tasks AS T WHERE T.task_id = " + task_id + ";"
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/updateTask', function (req, res) {
  console.log("updating board");
  const task_id = connection.escape(req.body.task_id);
  const task_name = connection.escape(req.body.task_name);
  const task_desc = connection.escape(req.body.task_desc);

  const sql_query = "CALL updateTask(" + task_id + ", " + task_name + ", " + task_desc + ");";
  connection.query(sql_query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => console.log(`Example app listening`));
