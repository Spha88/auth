exports.secret_page = (req, res, next) => {
    // No one is logged in
    if (!req.user) {
        console.log('Middleware says, no one is logged in');
        res.render('sign-up', { title: 'Sign up', user: null, errors: [{ msg: 'You need to sign-up before joining' }] });
        return;
    }
    next();
}

exports.members_only = (req, res, next) => {
    if (!req.user) {
        //No user logged in
        console.log('Members only says, no user logged in');
        res.render('login', { title: 'Login in', errors: [{ msg: 'You need to log in before adding SECRETS' }] });
        return;
    }

    // User logged in check membership
    if (req.user.status === 'member') {
        next();
    } else {
        res.render('join', { title: 'Join the secret club', errors: [{ msg: 'You need to join the club before adding messages' }] });
    }

}