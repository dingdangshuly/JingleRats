var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户信息
var UserSchema = new Schema({
	userid: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	mobile: {
		type: String
	},
	address: {
		type: String
	}
}, {
	collection: 'users'
});

mongoose.model('User', UserSchema);