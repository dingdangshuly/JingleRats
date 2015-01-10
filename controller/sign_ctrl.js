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
		userid: userid,
		password: password
	}, function(err, user) {
		if (err) {
			return next(err);
		}
		if (user) {
			res.json({
				msg: '用户名已被使用。',
				status: 'false'
			});
			return;
		}

		//保存用户
		User.saveUser(userid, password, function(err, user) {
			if (err) {
				return next(err);
			}
			//用户信息写cookie
			cookieUtil.saveCookie(user, req, res);
			console.info(userid + ' 注册成功');
			res.json({
				msg: userid,
				status: 'success'
			});
		});
	});
};

//登陆
exports.login = function(req, res) {
	if (req.session.user && req.session.user.userid && req.session.user.password == req.body.password) {
		cookieUtil.readCookieAndLogin(req, function(user) {
			if (user) {
				res.json({
					msg: user.userid,
					status: 'success'
				});
			} else {
				res.json({
					msg: '请登陆',
					status: 'false'
				});
			}
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
					msg: '用户名或密码不正确',
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

exports.readCookieAndLogin = function(req, res, next) {
	if (req.session.user) {

	}
}

//登出
exports.logout = function(req, res) {
	console.info(req.session.user + ' 已退出');
	cookieUtil.clearCookie(req, res);
	req.session['user'] = null;
	res.redirect('/index');
}