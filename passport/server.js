var express = require('express');
var middleware = require('./middleware');
var route = require('./route');
var passport = require('passport');

var app = express();

app.get('/alive', (req, res) => {
    res.json({ message: 'server is alive'})
})

middleware(app, passport);

route(app, passport)

app.listen(3001, function () {
    console.log('app listening on port 3001');
})