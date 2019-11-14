const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
 
module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user 
            User.findOne({ where: {email: email} })
                .then(user => {
                    if(!user){
                        return done(null, false, { message: "Incorrect email" });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, { message: "Incorrect password" });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) { 
        User.findByPk(id).then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log(err);
        });
    });
}