require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Routes
const indexRouter = require('./routes/index');


const app = express();

// database connection
const mongoDB = process.env.MONGODB_URI || process.env.MONGO_DB_LOCAL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Set views directory and views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set directory for static files
app.use(express.static('public'));

//parsing body variables
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => { // my custom middleware for logging
    console.log(req.url);
    next();
})


// Routes
app.get('/', indexRouter);


app.listen(4000, () => {
    console.log('App listening to Port: 300')
})



