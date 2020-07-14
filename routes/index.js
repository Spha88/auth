const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');



/* GET home page*/
router.get('/', (req, res, next) => {
    res.render('index', { title: "Welcome to secret club", user: req.user })
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



module.exports = router;

