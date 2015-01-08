var models = require('../models');
var User = models.User;

//查询用户
exports.findUser = function(query, callback) {
	User.findOne(query, callback);
};

//更新用户
exports.updateUser = function(query, callback) {
	User.update(query, callback);
};

//删除用户
exports.removeUser = function(query, callback) {
	User.remove(query, callback);
};

//新增用户
var saveUser = exports.saveUser = function(userid, password, callback) {
	var user = new User();
	user.userid = userid;
	user.password = password;
	user.save(callback);
};

// saveUser('uid1001','1234',function(err,data){
// 	console.info(data);
// });