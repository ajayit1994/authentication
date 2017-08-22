const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser'); 
const db = require('./db').db;


module.exports = (app, passport) => {

        app.use(cookieParser());

        app.use(expressSession({secret: 'ajay'}));

        app.use(bodyParser.urlencoded({ limit: '52428800', extended: true }))
        app.use(bodyParser.json({limit: '52428800'}));  

        require('./passport') (passport);

        app.use(passport.initialize());
        app.use(passport.session());

}