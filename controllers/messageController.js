const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Message = require('../models/message');

// GET - Display a list of messages
exports.messages_get = (req, res) => {
    req.send('NOT YET IMPLEMENTED: list all messages');
}

// GET - Display create message form
exports.message_create_get = (req, res) => {
    res.render('add-message', { title: 'Add a secret message', errors: null });
}

// POST - Handle create message form
exports.message_create_post = [
    body('title', 'Title should not be empty').trim().isLength({ min: 1 }),
    body('message', 'Message should not be empty').trim().isLength({ min: 1 }),
    body('*').escape(),

    (req, res) => {
        const validationResults = validationResult(req);

        if (validationResults.errors.length) {
            res.render('add-message', { title: 'Add message', errors: validationResults.errors })
            return;
        }

        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            postedBy: req.user._id
        })

        message.save((err, message) => {
            if (err) return next(new Error('Error saving message: ', err));
            console.log("Message saved: ", message);
            res.redirect(req.user.url);
        })
    }
];

// GET Display one message.
exports.message_get = (req, res) => {
    Message.findById(req.params.id).populate('postedBy').exec((err, message) => {
        if (err) return console.log(err);

        res.render('message', { title: `Secret Message | ${message.title}`, message: message });
    });
}


// GET Delete Message Confirmation
exports.message_delete_get = (req, res) => {
    Message.findById(req.params.id, (err, message) => {
        if (err) return console.log(err);
        res.render('delete-message', { title: 'Delete message', message: message })
    })
}

// POST Delete form handler
exports.message_delete = (req, res) => {
    Message.findByIdAndDelete(req.body.id, (err, document) => {
        if (err) return console.log(err);
        console.log(document);
        res.redirect('/');
    })
}