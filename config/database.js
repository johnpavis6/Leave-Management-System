var mysql = require('mysql-model');
mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms'
});
var Student = mysql.extend({ tableName: "students", });
var Faculty = mysql.extend({ tableName: "faculties", });
var Hod = mysql.extend({ tableName: "hodies", });
var Form = mysql.extend({ tableName: "forms", });
var Department = mysql.extend({ tableName: "departments", });
module.exports = { Student, Faculty, Hod, Form, Department };