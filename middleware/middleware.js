const Message = require('../models/message');

// Only allow logged in users through
exports.secret_page = (req, res, next) => {
    // No one is logged in
    if (!req.user) {
        console.log('Middleware says, no one is logged in');
        res.render('sign-up', { title: 'Sign up', user: null, errors: [{ msg: 'You have to Sign up or Login.' }] });
        return;
    }
    next();
}

// Only allow members (status: 'member') through
exports.members_only = (req, res, next) => {
    if (!req.user) {
        //No user logged in
        // console.log('Members only says, no user logged in');
        res.render('login', { title: 'Login in', errors: [{ msg: 'You need to log in to proceed.' }] });
        return;
    }

    // User logged in check membership
    if (req.user.status === 'member') {
        next();
    } else {
        res.render('join', { title: 'Join the secret club', errors: [{ msg: 'You need to join the club before adding messages' }] });
    }

}

// Only allow administrators through
exports.admin_only = (req, res, next) => {
    if (!req.user.admin) {
        res.redirect('/')

    } else {
        next();
    }
}

// Admin and owner
exports.admin_and_owner = (req, res, next) => {
    Message.findById(req.body.id).populate('postedBy').exec((err, message) => {
        if (err) return console.log(err);

        if (String(message.postedBy._id) === String(req.user._id)) {
            return next();

        } else if (req.user.admin === true) {
            return next();
        }

        res.redirect('/');
    })
}