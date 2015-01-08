exports.encodeBase64 = function(str) {
	return new Buffer(str).toString('base64');
}

exports.decodeBase64 = function(str) {
	return new Buffer(str, 'base64').toString();
}