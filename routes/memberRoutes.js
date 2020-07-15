const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const middleware = require('../middleware/middleware');

/** GET list users */
router.get('/', middleware.secret_page, memberController.members_get);

/** GET Join - Displays a form for joining the club */
router.get('/join', middleware.secret_page, memberController.user_join_get);

/** POST join - handles the joining process */
router.post('/join', middleware.secret_page, memberController.user_join_post);

/** GET admin permissions request */
router.get('/:id/admin', middleware.secret_page, memberController.admin_request_get);

/** GET member - shows member profile */
router.get('/:id', middleware.secret_page, memberController.member_get);


module.exports = router;