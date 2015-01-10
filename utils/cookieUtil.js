var User = require('../proxy').User;
var crypto = require('crypto');

/**
 * 通过cookie保存session
 */

//保存cookie时的名称
var cookieDomainName = 'renov';
//cookie有效期，默认2周
var cookieMaxAge = 60 * 60 * 24 * 7 * 2;
var webkey = '123456';

//保存cookie 格式：base64（ 用户id+':'+过期时间+':'+MD5（用户id+':'+过期时间+':'+用户密码+key））
exports.saveCookie = function(user, req, res) {
	//cookie有效期
	var validTime = cookieMaxAge;
	//MD5加密cookie
	var cookieValueWithMd5 = crypto.createHash('md5').update(user.userid + ':' + user.password + ':' + validTime + ':' + webkey).digest('hex');
	//将要被保存的完整cookie值
	var cookieValue = user.userid + ':' + validTime + ':' + cookieValueWithMd5;
	//再一次对cookie进行base64编码
	var cookieValueWithBase64 = new Buffer(cookieValue).toString('base64');
	req.session['user'] = user.userid;
	res.cookie(cookieDomainName, cookieValueWithBase64);
}

exports.readCookieAndLogin = function(req, res, next) {
	if (req.cookies[cookieDomainName]) {
		var cookieValue = new Buffer(req.cookies[cookieDomainName], 'base64').toString();
		var values = cookieValue.split(':');
		// if (values.length != 3) {
		// 	return;
		// }
		var userid = values[0];
		var validTime = values[1];
		var cookieValueWithMd5 = values[2];
		User.findUser({
			userid: userid
		}, function(err, user) {
			// if (err) {
			// 	return;
			// }
			if (user) {
				console.info(user.userid + ':' + user.password + ':' + validTime + ':' + webkey);
				var userInfoWithMd5 = crypto.createHash('md5').update(user.userid + ':' + user.password + ':' + validTime + ':' + webkey).digest('hex');
				if (userInfoWithMd5 == userInfoWithMd5) {
					req.session['user'] = user;
				}
				req.session['user'] = user.userid;
				console.info('===========================================');
			} else {

			}
		});
	} else {

	}
	next();
}


//用户注销时，清除cookie
exports.clearCookie = function(req, res) {
	req.session['user'] = null;
	// res.clearCookie(cookieDomainName);
}