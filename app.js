require('dotenv').config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require('./models/user');

// Routes
const indexRouter = require('./routes/index');
const Strategy = require('./strategy');


const app = express();

// SETUP PASSPORT
passport.use(Strategy);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
//=========================================================

// database connection
const mongoDB = process.env.MONGODB_URI || process.env.MONGO_DB_LOCAL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Set views directory and views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('public')); // Set directory for static files
app.use(express.urlencoded({ extended: false })); //parsing body variables
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));// passport uses this as a dependency.
app.use(passport.initialize());
app.use(passport.session())

app.use((req, res, next) => { // my custom middleware for logging
    console.log(req.method + ' ' + req.url + ' ' + req.user);
    next();
})

// once passport is setup, it will add a user property to the req object when the user is logged in
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


// Routes
app.use('/', indexRouter);


app.listen(4000, () => {
    console.log('App listening to Port: 4000')
})



