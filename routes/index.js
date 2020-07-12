const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require("passport");



/* GET home page*/
router.get('/', (req, res, next) => {
    res.render('index', { title: "Welcome to secret club", user: req.user })
})

/** GET Login */
router.get('/log-in', userController.user_login_get);

/** POST loin handler */
router.post('/log-in', passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }));

/** GET Sign up */
router.get('/sign-up', userController.user_signup_get);

/** POST Sign up */
router.post('/sign-up', userController.user_signup_post);

/** GET Log out */
router.get('/log-out', (req, res) => {
    req.logout(); // Passport added this method to the request object
    res.redirect("/");
})



module.exports = router;

