

exports.secret_page = (req, res, next) => {
    // No one is logged in
    if (!req.user) {
        console.log('Middleware says, no one is logged in');
        res.render('sign-up', { title: 'Sign up', user: null, errors: [{ msg: 'You need to sign-up before joining' }] });
        return;
    }
    next();
}