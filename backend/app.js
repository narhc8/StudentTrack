const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser')

const port = 8000;
const saltRounds = 10;


app.use(cors());
app.use(bodyParser.json())


var connection = mysql.createConnection({
    host: '3.234.246.29',
    user: 'romanellicj',
    password: 'V00884541',
    database: 'romanellicj',
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
});

app.post('/signup', async(req, res) => {
    console.log('User is trying to signup');
    var result;
    const usernameD = connection.escape(req.body.username);
    const passwordD = req.body.password;
    const lastnameD = connection.escape(req.body.first_name);
    const firstnameD = connection.escape(req.body.last_name);
    const emailD = connection.escape(req.body.email);

    const hashedPass = await bcrypt.hash(passwordD, saltRounds);

    const sql_query = "INSERT INTO users (first_name, last_name, username, password, email) VALUES (" + firstnameD + ", " + lastnameD + ", " + usernameD + ", '" + hashedPass + "', " + emailD + ");";

    connection.query(sql_query, function(err, result) {
        if (err) {
            result = {
                response: 'ERROR',
                data: err
            }
            res.json(result);
        } else {
            result = {
                response: 'SUCCESS',
                data: result
            }
            res.json(result);
        }
    });
});


app.listen(port, () => console.log(`Example app listening`));