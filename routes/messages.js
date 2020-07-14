const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET - List of all messages.
router.get('/', messageController.messages_get);

// GET - Display form for creating a new message.
router.get('/add', messageController.message_create_get);

// POST - Handle form for creating a new message
router.post('/add', messageController.message_create_post);



module.exports = router;