const { body, check, validationResult } = require('express-validator');
const async = require('async');
const User = require('../models/user');
const Message = require('../models/message');

// GET MEMBERS - List of all members in the club
exports.members_get = (req, res) => {

    User.find((err, users) => {
        if (err) return console.log(error);

        if (users.length) {
            res.render('members', { title: 'Members', users: users });
        }
    })
}

// GET MEMBER - Get one member profile
exports.member_get = (req, res) => {
    async.parallel({
        user: callback => User.findById(req.params.id).exec(callback),
        messages: callback => Message.find({ 'postedBy': req.params.id }).populate('postedBy').exec(callback)
    }, (err, results) => {
        if (err) return console.log(err);

        if (results.user == null) { //No author found
            return console.log(err);
        }

        res.render('members/member', { title: results.user.full_name, user: results.user, messages: results.messages });
    })
}

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
];

// GET Display the admin permissions request form
exports.admin_request_get = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        res.render('members/admin-request', { title: 'Admin Permissions Request', user: user, errors: null });
    })
}