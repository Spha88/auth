const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const middleware = require('../middleware/middleware');

// GET - List of all messages.
router.get('/', messageController.messages_get);

// GET - Display form for creating a new message.
router.get('/add', middleware.members_only, messageController.message_create_get);

// POST - Handle form for creating a new message
router.post('/add', middleware.members_only, messageController.message_create_post);

// DELETE messages - Delete message confirmation page
router.get('/:id/delete', [middleware.members_only, middleware.admin_only], messageController.message_delete_get);

// DELETE message - Delete message form handler
router.delete('/:id/delete', [middleware.members_only, middleware.admin_and_owner], messageController.message_delete);

// GET View Message - Display a single message
router.get('/:id', middleware.members_only, messageController.message_get);



module.exports = router;