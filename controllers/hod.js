var Student = require('../config/database').Student;
var Department = require('../config/database').Department;
var Hod = require('../config/database').Hod;
var Form = require('../config/database').Form;
var home = function (req, res) {
    res.render('hod/home');
}
var signin = function (req, res) {
    var response = { code: 0 };
    if (req.session.response) {
        response = req.session.response;
        req.session.response = undefined;
    }
    res.render('hod/signin', response);
}
var isUser = function (req, res) {
    new Hod().find('first', { where: `roll_no=${req.body.roll_no} and password=${req.body.password}` }, function (err, row) {
        if (row.roll_no == undefined) {
            req.session.response = { code: 1, message: 'Incorrect Username or Password' };
            res.redirect('/hod/');
            return;
        }
        req.session.user = row;
        req.session.role = 3;
        res.redirect('/hod/dashboard');
    });
}
var signup = function (req, res) {
    new Department().find('all', { fields: ['id', 'name'] }, function (err, departments) {
        var response = { code: 0, departments: departments };
        if (req.session.response) {
            response.code = req.session.response.code;
            response.message = req.session.response.message;
            req.session.response = undefined;
        }
        res.render('hod/signup', response);
    });
}
var createUser = function (req, res) {
    new Hod({
        name: req.body.name,
        roll_no: req.body.roll_no,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        department_id: req.body.department_id,
        from_year: req.body.from_year,
        dob: req.body.dob,
        password: req.body.password,
    }).save(function (err) {
        if (err) {
            req.session.response = { code: 1, message: 'User Exist' };
        }
        else {
            req.session.response = { code: 2, message: 'Signup Success' };
        }
        res.redirect('/hod/signup');
    });
}
var signout = function (req, res) {
    req.session.user = req.session.role = undefined;
    res.redirect('/hod/');
}
var dashboard = function (req, res) {
    var subquery = `select roll_no from students where department_id=${req.session.user.department_id}`;
    new Form().find('all', { where: `student_id in (${subquery}) and status=1` }, function (err, forms) {
        res.render('hod/dashboard', { name: req.session.user.name, forms: forms });
    })
}
var submit = function (req, res) {
    var form = new Form();
    form.query(`update forms set status=${req.body.status} where id=${req.body.id}`, function (err) {
        console.log(err);
        res.redirect('/hod/dashboard');
    });
}
module.exports = { home, signin, signup, isUser, createUser, signout, dashboard, submit };