const express = require("express");
const router = express.Router();
const middleware = require('../middleware/middleware');
const userController = require('../controllers/userController');
const Message = require('../models/message');

/* GET home page*/
router.get('/', (req, res, next) => {
    Message.find().populate("postedBy").exec((err, messagesFound) => {
        if (err) return console.log(err);
        res.render('index', { title: 'Welcome to the secret club', user: req.user, messages: messagesFound });
    })
})

/** GET Login - Displays login in form*/
router.get('/log-in', userController.user_login_get);

/** POST loin handler */
router.post('/log-in', userController.user_login_post);

/** GET Sign up - Displays signup form */
router.get('/sign-up', userController.user_signup_get);

/** POST Sign up */
router.post('/sign-up', userController.user_signup_post);

/** GET Log out */
router.get('/log-out', userController.user_logout_get);

/** GET Join - Displays a form for joining the club */
router.get('/join', middleware.secret_page, userController.user_join_get);

/** POST join - handles the joining process */
router.post('/join', middleware.secret_page, userController.user_join_post);

module.exports = router;