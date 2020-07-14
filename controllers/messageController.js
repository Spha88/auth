const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Message = require('../models/message');

// GET - Display create message form
exports.message_create_get = (req, res) => {
    req.send('NOT YET IMPLEMENTED: create message');
}

// POST - Handle create message form
exports.message_create_post = (req, res) => {
    req.send('NOT YET IMPLEMENTED: Handle create message form');
}

