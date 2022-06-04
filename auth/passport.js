const bcrypt = require('bcryptjs');
LocalStrategy = require("passport-local").Strategy;

//Load Model

const User = require("../models/User");

const loginCheck = passport => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email,password, done) => {
            //Check customer

            User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    console.log("Wrong email");
                    return done();
                }

                //Match Password
                
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) throw error;
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        console.log("Wrong Password");
                        return done();
                    }
                });
            })
            .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
          done(error, user);
        });
      });
};
module.exports = {loginCheck};