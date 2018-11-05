var Student = require('../config/database').Student;
var Department = require('../config/database').Department;
var Faculty = require('../config/database').Faculty;
var Form = require('../config/database').Form;
var home = function (req, res) {
    res.render('student/home');
}
var signin = function (req, res) {
    var response = { code: 0 };
    if (req.session.response) {
        response = req.session.response;
        req.session.response = undefined;
    }
    res.render('student/signin', response);
}
var isUser = function (req, res) {
    var student = new Student();
    student.find('first', { where: `roll_no=${req.body.roll_no} and password=${req.body.password}` }, function (err, row) {
        if (row.roll_no == undefined) {
            req.session.response = { code: 1, message: 'Incorrect Username or Password' };
            res.redirect('/student/signin');
            return;
        }
        req.session.user = row;
        req.session.role = 1;
        res.redirect('/student/dashboard');
    });
}
var signup = function (req, res) {
    var department = new Department();
    department.find('all', { fields: ['id', 'name'] }, function (err, departments) {
        var faculty = new Faculty();
        faculty.find('all', { fields: ['roll_no as faculty_id', 'name', 'department_id'] }, function (err, faculties) {
            var response = { code: 0, departments: departments, faculties: faculties };
            if (req.session.response) {
                response.code = req.session.response.code;
                response.message = req.session.response.message;
                req.session.response = undefined;
            }
            res.render('student/signup', response);
        })
    });
}
var createUser = function (req, res) {
    var student = new Student({
        name: req.body.name,
        roll_no: req.body.roll_no,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        department_id: req.body.department_id,
        faculty_id: req.body.faculty_id,
        dob: req.body.dob,
        password: req.body.password,
    });
    student.save(function (err) {
        console.log(err);
        if (err) {
            req.session.response = { code: 1, message: 'User Exist' };
        }
        else {
            req.session.response = { code: 2, message: 'Signup Success' };
        }
        res.redirect('/student/signup');
    });
}
var signout = function (req, res) {
    req.session.user = req.session.role = undefined;
    res.redirect('/student/signin');
}
var dashboard = function (req, res) {
    var form = new Form();
    form.find('all', { where: `student_id=${req.session.user.roll_no}` }, function (err, forms) {
        res.render('student/dashboard', { name: req.session.user.name, forms: forms });
    })
}
var request = function (req, res) {
    var form = new Form({
        student_id: req.session.user.roll_no,
        reason: req.body.reason,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
    });
    form.save();
    res.redirect('/student/dashboard');
}
module.exports = { home, signin, signup, isUser, createUser, signout, dashboard, request };