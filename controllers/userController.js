const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');


// GET user login
exports.user_login_get = (req, res) => {
    res.render('login', { title: 'Log in' })
}

// GET user signup
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
        })

        const results = validationResult(req);
        // console.log(results.errors);

        if (!results.isEmpty()) {
            res.render('sign-up', { title: 'Sign up', user: user, errors: results.errors });
            return;
        }

        if (req.body.password !== req.body.confirm_password) {
            // console.log(results.errors);
            res.render('sign-up', { title: 'Sign up', user: user, errors: [{ msg: 'Password did not match' }] });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

                if (err) {
                    res.redirect('/sign-up');
                    return;
                }

                user.password = hashedPassword;

                // Save user to database
                user.save(err => {
                    if (err) {
                        res.redirect('/sign-up')
                        return;
                    }
                    res.redirect('/');
                })
            })
        }


    }
]