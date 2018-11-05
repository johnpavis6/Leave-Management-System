var express = require('express');
var app = express.Router();

var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

var session = require('express-session');

app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}));

var controller = require('../controllers/hod');
var middleware = require('../middlewares/hod');

// app.get('/', middleware.isUserNotExist, controller.home);

app.get('/', middleware.isUserNotExist, controller.signin);

app.post('/', parseForm, controller.isUser);

app.get('/signout', controller.signout);

// app.get('/signup', middleware.isUserNotExist, controller.signup);

// app.post('/signup', parseForm, controller.createUser);

app.get('/dashboard', parseForm, middleware.isUserExist, controller.dashboard);

app.post('/submit', parseForm, middleware.isUserExist, controller.submit);

module.exports = app;