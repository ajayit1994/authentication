var bcrypt = require('bcrypt');
var User = require('./userModel');

module.exports = (app, passport) => {
    app.post('/login', passport.authenticate('local', {}), login);
    app.post('/register', register)
}


var login = (req, res) => {
    res.send('login successfully');
}

var register = (req, res) => {
    var userInfo =  new User(req.body);
    userInfo.password = bcrypt.hashSync(req.body.password, 10);
    userInfo.save(function (err, user) {
        if (err) {
            console.error(err);
            return res.status(400).send({
                message : err
            })
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
}


