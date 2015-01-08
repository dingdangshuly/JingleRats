var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户Session
var SessionSchema = new Schema({
	userid: {
		type: String,
		index: true
	},
	session: {
		type: String
	}
}, {
	collection: 'session'
});

mongoose.model('Sesson', SessionSchema);