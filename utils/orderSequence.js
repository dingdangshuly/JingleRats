var settings = require('../etc/settings.json');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require("mongodb").Server;
var dateformat = require('dateformat');

/**
 * 订单序列号
 */

var mongodb = new Db(settings.db.dbname, new Server(settings.db.host, settings.db.port, {}), {
	safe: true
});

//订单号：年月日时分秒毫秒+5位流水号，例：201501051834037400014 
var generateOrderid = exports.generateOrderid = function(cb) {
	getOrderSequence(function(seqid) {
		seqid = pad(seqid, 5)
		if (seqid > 0) {
			cb(dateformat(new Date(), 'yyyymmddHHMMssL') + seqid);
		} else {
			cb(0);
		}
	});
};

//获取流水号
var getOrderSequence = exports.getOrderSequence = function(cb) {
	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			return cb(err);
		}
		var collection = db.collection('orderseq')
		collection.findOne({
			flag: 1
		}, function(err, docs) {
			mongodb.close();
			if (err) {
				return cb(err);
			}
			if (docs) {
				cb(docs.oid);
			} else {
				cb(0);
			}
		})
	});
};

//流水号自增1
var incrOrderSequence = exports.incrOrderSequence = function(oid, cb) {
	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			return cb(err);
		}
		var collection = db.collection('orderseq')
		collection.update({
			flag: 1
		}, {
			$inc: {
				oid: 1
			}
		}, function(err) {
			mongodb.close();
			if (err) {
				return cb(err);
			}
			cb('success');
		});
	});
};

function pad(num, n) {
	var len = num.toString().length;
	while (len < n) {
		num = "0" + num;
		len++;
	}
	return num;
};


// generateOrderid(function(seqid) {
// 	console.info(seqid);
// });

// getOrderSequence(function(data) {
// 	console.info('------------>', data);
// 	incrOrderSequence(data,function(data){
// 		console.info('========>'+data);
// 	});
// });