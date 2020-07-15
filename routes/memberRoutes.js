const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const middleware = require('../middleware/middleware');

//Authenticate all member routes
router.all('*', middleware.secret_page);

/** GET list users */
router.get('/', memberController.members_get);

/** GET Join - Displays a form for joining the club */
router.get('/join', memberController.user_join_get);

/** POST join - handles the joining process */
router.post('/join', memberController.user_join_post);

/** GET admin permissions request */
router.get('/:id/admin', memberController.admin_request_get);

/** GET member - shows member profile */
router.get('/:id', memberController.member_get);


module.exports = router;