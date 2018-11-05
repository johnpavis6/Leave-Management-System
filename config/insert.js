var Department = require('./database').Department;
var Faculty = require('./database').Faculty;
var Hod = require('./database').Hod;
var values = require('./values');
module.exports = {
    insertDepartments: function (req, res, next) {
        values.departments.forEach(function (department) {
            var mydepartment = new Department(department);
            mydepartment.save();
        });
        next();
    },
    insertFaculties: function (req, res, next) {
        new Department().find('all', function (err, departments) {
            departments.forEach(department => {
                values.faculties[department.name].forEach(faculty => {
                    faculty.department_id = department.id;
                    new Faculty(faculty).save();
                });
            });
            next();
        });
    },
    insertHodies: function (req, res) {
        new Department().find('all', function (err, departments) {
            departments.forEach(department => {
                values.hodies[department.name].forEach(hod => {
                    hod.department_id = department.id;
                    new Hod(hod).save();
                });
            });
            res.send('All Set');
        });
    }
}