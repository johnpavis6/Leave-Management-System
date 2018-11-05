var express = require('express');
app = express();

var session = require('express-session');
app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./node_modules/bootstrap/dist'));

var hodRouter = require('./routers/hod'),
    studentRouter = require('./routers/student'),
    facultyRouter = require('./routers/faculty'),
    adminRouter = require('./routers/admin')


app.use('/student', studentRouter);
app.use('/faculty', facultyRouter);
app.use('/hod', hodRouter);
app.use('/admin', adminRouter);

app.get('/', function (req, res) {
    if (req.session.user) {
        if (req.session.role == 1) {
            res.redirect('/student');
        } else if (req.session.role == 2) {
            res.redirect('/faculty');
        } else {
            res.redirect('/hod');
        }
        return;
    }
    res.render('home');
});

// var insert = require('./config/insert');
// app.get('/insert', insert.insertDepartments, insert.insertFaculties, insert.insertHodies);

app.all('*', function (req, res) {
    res.send('Page Not Found');
});
var port = 4444;
app.listen(port, () => {
    console.log(`App listens on ${port}`);
});