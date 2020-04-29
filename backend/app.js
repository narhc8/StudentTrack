const express = require('express');
const app = express();
const port = 8000;
var cors = require('cors');

app.use(cors());

app.get('/test', (req, res) => {
    console.log('Hey someone hit the api');
    res.json({ response: 'hello world!' });
});


app.listen(port, () => console.log(`Example app listening at http://http://3.234.246.29:${port}`));