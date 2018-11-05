var isUserNotExist = function (req, res, next) {
    if (!req.session.user || !req.session.user.roll_no) {
        next();
        return;
    }
    res.redirect('/student/dashboard');
}
var isUserExist = function (req, res, next) {
    if (!req.session.user || !req.session.user.roll_no) {
        res.redirect('/student/signin');
        return;
    }
    next();
}
module.exports = { isUserExist, isUserNotExist };