const express = require('express');
const app = express();
const port = 8098;
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    console.log('Hey someone hit the api');
    res.json({ response: 'hello world!' });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))