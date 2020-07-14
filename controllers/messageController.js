const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Message = require('../models/message');

// GET - Display a list of messages
exports.messages_get = (req, res) => {
    req.send('NOT YET IMPLEMENTED: list all messages');
}

// GET - Display create message form
exports.message_create_get = (req, res) => {
    res.render('add-message', { title: 'Add a secret message' });
}

// POST - Handle create message form
exports.message_create_post = (req, res) => {
    req.send('NOT YET IMPLEMENTED: Handle create message form');
}