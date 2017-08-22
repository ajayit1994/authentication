
const User = require('./userModel');
const local = require('./local');

/**
* Expose
*/

module.exports = function (passport) {
 // serialize sessions
 passport.serializeUser(function(user, done) {
   done(null, user.id)
 })

 passport.deserializeUser(function(id, done) {
   User.findOne({ _id: id }, function (err, user) {
     done(err, user)
   })
 })

 // use these strategies
 passport.use(local);
};