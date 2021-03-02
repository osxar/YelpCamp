module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // store the url they are requesting, in the session. This url can be founf in the request object
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login')
    }
    next();
}