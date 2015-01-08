var Order = require('../proxy').Order;
var Materials = require('../proxy').Materials;
var orderSequence = require('../util/orderSequence');
var async = require('async');

exports.saveOrder = function(req, res) {


	var midInfo = {};
	var totalprice = 0;

	//订单号
	orderSequence.generateOrderid(function(orderid) {

	});

	//订单保存
	Order.saveOrder(oid, builtpArea, address, mobile, materials, totalprice, function() {


	});

	//查询价格
	Materials.findMaterials(mid, function(err, price) {
		// totalprice +=
	});

	// async.forEach(mids, function(mid, cb) {
	// 	//查询材料id
	// 	Materials.findMaterials(mid, function(err, price) {
	// 		totalprice +=
	// 	});
	// }, function(err, result) {
	// 	orderSequence.getOrderSequence(function(id) {

	// 	});
	// });
	// Materials.findMaterials();


}

exports.findOrder = function(req, res) {

}

exports.updateOrder = function(req, res) {

}