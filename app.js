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

var sign = require('./controller/sign_ctrl');
var materials = require('./controller/materials_ctrl');
var order = require('./controller/order_ctrl');

app.get('/*',);
app.get('/index', materials.getDefaultMaterials);
app.post('/order', order.generateOrder);
app.get('/orderPage', order.queryOrderById);

//注册
app.post('/signup', sign.signup);
app.post('/login', sign.login);
app.post('/logout', );

app.listen(3000);