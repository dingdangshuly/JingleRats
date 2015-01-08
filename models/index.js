var mongoose = require('mongoose');
var settings = require('../etc/settings.json');
var Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://' + settings.db.host + ':' + settings.db.port + '/' + settings.db.dbname, function(err) {
	if (err) {
		console.error('connect to %s error: ', settings.db, err.message);
		process.exit(1);
	}
});

// models
require('./user');
require('./materials');
require('./order');

exports.User = mongoose.model('User');
exports.Materials = mongoose.model('Materials');
exports.Order = mongoose.model('Order');
