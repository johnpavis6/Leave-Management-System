var Student = require('../config/database').Student;
var Department = require('../config/database').Department;
var Faculty = require('../config/database').Faculty;
var Form = require('../config/database').Form;
var home = function (req, res) {
    res.render('faculty/home');
}
var signin = function (req, res) {
    var response = { code: 0 };
    if (req.session.response) {
        response = req.session.response;
        req.session.response = undefined;
    }
    res.render('faculty/signin', response);
}
var isUser = function (req, res) {
    new Faculty().find('first', { where: `roll_no=${req.body.roll_no} and password=${req.body.password}` }, function (err, row) {
        if (row.roll_no == undefined) {
            req.session.response = { code: 1, message: 'Incorrect Username or Password' };
            res.redirect('/faculty/signin');
            return;
        }
        req.session.user = row;
        req.session.role = 2;
        res.redirect('/faculty/dashboard');
    });
}
var signup = function (req, res) {
    new Department().find('all', { fields: ['id', 'name'] }, function (err, departments) {
        var response = { code: 0, departments: departments };
        if (req.session.response) {
            console.log('here');
            response.code = req.session.response.code;
            response.message = req.session.response.message;
            req.session.response = undefined;
        }
        res.render('faculty/signup', response);
    });
}
var createUser = function (req, res) {
    new Faculty({
        name: req.body.name,
        roll_no: req.body.roll_no,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        department_id: req.body.department_id,
        dob: req.body.dob,
        password: req.body.password,
    }).save(function (err) {
        console.log(err);
        if (err) {
            req.session.response = { code: 1, message: 'User Exist' };
        }
        else {
            req.session.response = { code: 2, message: 'Signup Success' };
        }
        res.redirect('/faculty/signup');
    });
}
var signout = function (req, res) {
    req.session.user = req.session.role = undefined;
    res.redirect('/faculty/signin');
}
var dashboard = function (req, res) {
    var subquery = `select roll_no from students where faculty_id=${req.session.user.roll_no}`;
    new Form().find('all', { where: `student_id in (${subquery}) and status=0` }, function (err, forms) {
        res.render('faculty/dashboard', { name: req.session.user.name, forms: forms });
    })
}
var submit = function (req, res) {
    var form = new Form();
    form.query(`update forms set status=${req.body.status} where id=${req.body.id}`, function (err) {
        res.redirect('/faculty/dashboard');
    });
}
module.exports = { home, signin, signup, isUser, createUser, signout, dashboard, submit };