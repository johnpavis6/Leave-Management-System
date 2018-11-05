var isUserNotExist = function (req, res, next) {
    if (!req.session.user) {
        next();
        return;
    }
    res.redirect('/faculty/dashboard');
}
var isUserExist = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/faculty/signin');
        return;
    }
    next();
}
module.exports = { isUserExist, isUserNotExist };