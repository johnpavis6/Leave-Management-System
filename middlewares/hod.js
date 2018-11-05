var isUserNotExist = function (req, res, next) {
    if (!req.session.user) {
        next();
        return;
    }
    res.redirect('/hod/dashboard');
}
var isUserExist = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/hod/signin');
        return;
    }
    next();
}
module.exports = { isUserExist, isUserNotExist };