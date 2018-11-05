var db = require('../config/database').Student;
db = new db();
module.exports.dashboard = function (req, res) {
    db.query('show tables', function (err, rows) {
        if (err) throw err;
        res.render('admin/admin', { tables: rows })
    })
}
module.exports.process = function (req, res) {
    db.query(req.body.query, (err, rows) => {
        var data = { err: null }
        if (err) {
            data.err = err;
        }
        data.results = rows;
        res.send(data)
    })
}