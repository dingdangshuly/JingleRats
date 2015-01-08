var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var cookieUtils = require('./utils/cookieUtil');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
	secret: 'somesecrettokenhere'
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

// var routerCookie = express.Router();
// var routerLogin = express.Router();
// app.use('/login', routerLogin);
// app.use('/', routerCookie);

// routerCookie.use(function(req, res, next) {
// 	cookieUtils.readCookieAndLogin(req, res, next);
// });


app.get('/index', function(req, res) {
	res.render('index', {});
	// res.render('form', {msg:{userid:'tom'}});
});

// app.get('/index', function(req, res) {
// 	res.render('form', {msg:{userid:'tom'}});

// 	res.end('ok');
// 	// res.render('form', {msg:{userid:'tom'}});
// });


// app.post('/orderForm', function(req, res) {
// 	console.info(req.body);
// 	// res.render('form', {msg:{userid:'tom'}});

// 	res.end('ok');
// });

//注册
var sign = require('./controller/sign_ctrl');
app.post('/signup', sign.signup);
app.post('/login', sign.login);

app.listen(3000);