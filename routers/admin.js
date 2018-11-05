var express = require('express');
var app = express.Router();

var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

var session = require('express-session');

app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}));

var controller = require('../controllers/admin');

app.get('/', controller.dashboard);

app.post('/process', parseForm, controller.process);

module.exports = app;