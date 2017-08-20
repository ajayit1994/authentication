var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('./usermodel');

exports.register = function (req, res) {
    var userInfo = new User(req.body);
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


exports.sign_in = function (req, res) {
   User.findOne({"email": req.body.email}, function (err, user) {
       if(err) {
           throw err
       } else {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed, user not found'
                })
            } else {
                if(!user.comparePassword(req.body.password)) {
                    return res.status(401).send({
                        message: 'Authentication failed, user not found'
                    })     
                } else {
                    return res.json({token : jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'ajay')});
                }
            }
       }
   }) 
}

exports.loginRequired = function (req, res) {
    if(req.user) {
        return res.status(200).send({
            message: "login successfully into the system"
        })
    } else {
        return res.status(401).send({
            message: "password is incorrect, Authentication failed"
        })
    }
}
