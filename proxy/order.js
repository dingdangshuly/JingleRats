var models = require('../models');
var Order = models.Order;

//订单查询
exports.findOrder = function(query, callback) {
	Order.find(query, callback);
};

//订单修改
exports.updateOrder = function(query, callback) {
	Order.update(query, callback);
};

//订单查询
exports.removeOrder = function(query, callback) {
	Order.remove(query, callback);
};

//生成订单
var saveOrder = exports.saveOrder = function(oid, builtpArea, address, mobile, materials, totalprice, callback) {
	var order = new Order();
	order.oid = oid;
	order.builtpArea = builtpArea;
	order.mobile = mobile;
	order.materials = materials;
	order.totalprice = totalprice;
	order.address = address;
	order.save(callback);
};

exports.getOrderID = function(){
	
}

//Test
// saveOrder('OID1001', 100, '长安街1号', '70001', [{
// 	mid: 1001,
// 	mnum: 2
// }, {
// 	mid: 1002,
// 	mnum: 4
// }, {
// 	mid: 1003,
// 	mnum: 5
// }], 1234.2, function(err, data) {
// 	console.info(data);
// });