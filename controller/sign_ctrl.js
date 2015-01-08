var User = require('../proxy').User;
var cookieUtil = require('../utils/cookieUtil');

//用户注册
exports.signup = function(req, res) {
	var userid = req.body.userid.trim();
	var password = req.body.password.trim();

	if (userid == '' || password == '') {
		res.json({
			msg: '用户名或者密码为空',
			status: 'false'
		});
		return;
	}
	User.findUser({
		'$or': [{
			'userid': userid
		}, {
			'password': password
		}]
	}, function(err, user) {
		console.info('select from users ：', user);
		if (err) {
			return next(err);
		}
		if (user.length > 0) {
			res.json({
				msg: '用户名已被使用。',
				status: 'false'
			});
			return;
		}
		//保存用户
		User.saveUser(userid, password, function(err) {
			if (err) {
				return next(err);
			}
			console.info(userid + ' 插入成功');
			res.json({
				msg: userid,
				status: 'success'
			});
		});
	});
};

//登陆
exports.login = function(req, res) {
	console.info('===>', req.session.user);
	if (req.body.remember || req.session.user) {
		cookieUtil.readCookieAndLogin(req, function(user) {
			res.json({
				msg: user.userid,
				status: 'success'
			});
		});
	} else {
		var userid = req.body.userid.trim();
		var password = req.body.password.trim();
		if (userid == '' || password == '') {
			res.json({
				msg: '用户名或者密码为空',
				status: 'false'
			});
			return;
		}
		//查找用户
		User.findUser({
			'userid': userid,
			'password': password
		}, function(err, user) {
			console.info('登陆成功', user);
			if (err) {
				return next(err);
			}
			if (!user) {
				res.json({
					msg: '用户名密码不正确。',
					status: 'false'
				});
				return;
			}
			//用户信息写cookie
			cookieUtil.saveCookie(user, req, res);
			res.json({
				msg: userid,
				status: 'success'
			});
		});
	}

}

exports.readCookieAndLogin = function(req, res) {

}

//登出
exports.loginOut = function(req, res) {
	cookieUtil.clearCookie(req, res);
	res.render('index', {
		msg: '用户已退出'
	});
}