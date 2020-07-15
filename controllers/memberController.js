const { body, check, validationResult } = require('express-validator');
const User = require('../models/user');



exports.user_join_get = (req, res) => {
    res.render('join', { title: 'Join the secret club', errors: null });
}

exports.user_join_post = [
    body('secret', 'Enter the SECRET to join the club').trim().isLength({ min: 1 }),
    check('secret', 'You have no clue what the SECRET is right? lol').equals('SECRET'),
    body('secret').escape(),
    (req, res) => {
        const validationResults = validationResult(req);
        console.log(validationResults.errors.length);
        if (validationResults.errors.length) {
            res.render('join', { title: 'Join the club', errors: validationResults.errors })
            return;
        }

        User.findByIdAndUpdate(req.user._id, { status: 'member' }, (err, user) => {
            if (err) return console.log(err);
            res.redirect('/');
        })
    }
]