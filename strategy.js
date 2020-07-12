const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const Strategy = new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { msg: "Incorrect username" });

        //Comparing password submitted with the encrypted password in data base
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                //password match
                return done(null, user);
            } else {
                //password do not match!
                return done(null, false, { msg: "Incorrect password" })
            }
        })


    });
});

module.exports = Strategy;