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

	if (req.body.remember) {
	console.info('==========>'+req.body.remember);
		cookieUtil.readCookieAndLogin(req,function(user){
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
			cookieUtil.saveCookie(user, req, res);
			res.json({
				msg: userid,
				status: 'success'
			});
		});
	}

}

//登出
exports.loginOut = function(req, res) {
	// 	res.clearCookie('remember');
	res.render('index', {});
}