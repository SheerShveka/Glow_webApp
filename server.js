const express = require('express');
const app = express();

app.listen(3000);

app.get('/', (req, res) => { // set the first page to be index
    res.render('index.html');
})

