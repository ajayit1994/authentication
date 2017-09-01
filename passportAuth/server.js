var express = require('express');
var middleware = require('./middleware');
var routes = require('./routes');

var app = express();


app.get('/alive', (req, res) => {
    res.json({ message: 'server is alive'})
})

middleware(app);

routes()


app.listen(3001);