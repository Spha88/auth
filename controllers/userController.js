const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { nextTick } = require('async');


// GET user login - Display login form
exports.user_login_get = (req, res) => {
    res.render('login', { title: 'Log in', errors: null })
}

// POST handles login by user
exports.user_login_post = passport.authenticate("local", { successRedirect: "/", failureRedirect: "/log-in" });

// GET logout - handles user logout
exports.user_logout_get = (req, res) => {
    req.logout(); // Passport added this method to the request object
    res.redirect("/");
}

// GET user signup - Display signup form
exports.user_signup_get = (req, res) => {
    res.render('sign-up', { title: 'Sign up', user: '', errors: '' })
}

// POST sign up form handler
exports.user_signup_post = [
    // Validate fields
    body('first_name', 'First name must not be empty').trim().isLength({ min: 1 }),
    body('last_name', 'Last name must not be empty').trim().isLength({ min: 1 }),
    body('username', 'Username must not be empty').trim().isLength({ min: 1 }),
    body('password', 'password must not be empty').trim().isLength({ min: 1 }),
    body('confirm_password', 'Enter password again to confirm').trim().isLength({ min: 1 }),

    // Sanitize
    body('*').escape(),

    // Process request
    (req, res) => {
        // create user
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            admin: req.body.admin === 'true' ? true : false,
        })

        const results = validationResult(req);

        if (!results.isEmpty()) {
            res.render('sign-up', { title: 'Sign up', user: user, errors: results.errors });
            return;
        }

        if (req.body.password !== req.body.confirm_password) {
            res.render('sign-up', { title: 'Sign up', user: user, errors: [{ msg: 'Password did not match' }] });

        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

                if (err) return next(err);

                user.password = hashedPassword;

                // Save user to database
                user.save(err => err ? next(err) : res.redirect('/'));
            })
        }
    }
]