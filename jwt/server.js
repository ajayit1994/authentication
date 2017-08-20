var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./userController')

var moongooConnection = mongoose.connect('mongodb://localhost/my_database');

console.log('mongooseConnection');



var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())


app.use(function (req, res, next) {
    var token = req.header('x-auth-token')
    console.log(token);
    if(token) {
        var result = jwt.verify(token, 'ajay');
        req.user = result;
    }
    
    next();
})

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.post('/user/register', user.register);

app.post('/user/sign_in', user.sign_in);

app.get('/user/loginReq', user.loginRequired);


app.listen(3000, function () {
    console.log('app listening on port 3000');
})

