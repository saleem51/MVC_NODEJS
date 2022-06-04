const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");



//Register
const registerView = (req, res) => {
    res.render("register", {});
}

//Post Request for Register
//Post Request that handles Register
const registerUser = (req, res) => {
    const {name, email, location, password, confirm } = req.body;

    if( !name || !email || !password || !confirm) {
        console.log("File empty Fields");
    }

    //Confirm Passwords

if(password !== confirm){
    console.log("password must match");
} else {
    //Validation
    User.findOne({ email: email}).then(user => {
        if (user) {
            console.log("email does already exists");
            res.render("register", {
                name,
                email,
                password,
                confirm
            });
        } else {
            //Validation
            const newUser = new User({
                name,
                email,
                location,
                password
            });
            //Password Hashing
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser
                        .save()
                        .then(res.redirect("/login"))
                        .catch(err => console.log(err));
                })
             })
        }
    })
}

}

//For View
const loginView = (req, res) => {
    res.render("login", {

    });
}

//Login User
const loginUser = (req, res) => {
    const { email, password} = req.body;
    
    //Required
    if(!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
}


module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};