'use strict'

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    "fullName" : {
        type: String,
        trim: true,
        required: true
    },
    "email": {
        type: String,
        trim: true,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "created": {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
