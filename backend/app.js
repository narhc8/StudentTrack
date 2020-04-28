const express = require('express');
const app = express();
const port = 8098;
const host = '127.0.0.1';
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    console.log('Hey someone hit the api');
    res.json({ response: 'hello world!' });
});

console.log(`Example app listening at ${host}:${port}`);
app.listen(port, host);