const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

var obj = require('./task.json');

require('./app/routes')(app, obj);

app.listen(port, function() {
    console.log('we are online');
})