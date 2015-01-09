var Order = require('../proxy').Order,
	Materials = require('../proxy').Materials,
	orderSequence = require('../utils/orderSequence'),
	async = require('async'),
	EventProxy = require('EventProxy'),
	ep = new EventProxy(),
	crypto = require('../utils/crypto');

//生成订单
exports.generateOrder = function(req, res) {
	var phone = req.body.phone || '', //手机号码
		builtpArea = req.body.builtpArea || 0, //建筑面积
		address = req.body.address || '', //收货地址
		rows = req.body.rows || [];
	var orderid = 0, //订单号码
		materials = [], //材料集合
		totalprice = 0; //总价：(各类材料数量*单价)之和

	if (phone.length < 11) {
		res.json({
			msg: '手机号码不足11位'
		});
		return;
	}
	if (builtpArea.length == 0) {
		res.json({
			msg: '请填写建筑面积'
		});
		return;
	}
	if (address.length < 2) {
		res.json({
			msg: '地址不正确'
		});
		return;
	}
	if (rows.length == 0) {
		res.json({
			msg: '系统错误'
		});
	}
	//获取订单号
	orderSequence.generateOrderid(function(orderid) {
		ep.emit('tpl', orderid);
	});
	//解析form表单
	async.forEach(rows, function(row, cb) {
		materials.push({
			mid: row.mid,
			quantity: row.quantity
		});
		//查询价格
		Materials.findMaterials({
			mid: row.mid
		}, function(err, material) {
			if (material) {
				totalprice += material.unitprice * parseFloat(row.price);
			}
			cb();
		});
	}, function(err, result) {
		ep.emit('tp2', {});
	});

	ep.all('tpl', 'tp2', function(tpl, tp2) {
		if (tpl.length > 11 && materials.length > 0) {
			//订单入库
			Order.saveOrder(tpl, builtpArea, address, phone, materials, totalprice, function(err, order) {
				orderSequence.incrOrderSequence(orderid, function(err, oid) {});
				console.info('******订单入库成功****');
				console.info(order);
				res.redirect('/orderPage?orderid=' + crypto.encodeBase64(tpl));
			});
		}
	});
}

//查询订单
exports.queryOrderById = function(req, res) {
	var orderid = req.query.orderid;
	if (orderid && orderid.length > 10) {
		var orderid = crypto.decodeBase64(orderid);
		Order.findOrder({
			oid: orderid
		}, function(err, order) {
			res.writeHead(200, {
				'Content-Type': 'text/plain; charset=utf-8'
			});
			res.end('订单号: ' + order.oid + '\n地址：' + order.address + '\n手机号码：' + order.phone + '\n建筑面积：' + order.builtpArea + '\n总价：' + order.totalprice + '￥');
		});
	} else {
		res.json({
			'msg': '订单不存在'
		});
	}
}


// var ep = new EventProxy();
// ep.all('tpl', 'data', function(tpl, data) {
// 	// 在所有指定的事件触发后，将会被调用执行
// 	// 参数对应各自的事件名
// });
// fs.readFile('template.tpl', 'utf-8', function(err, content) {
// 	ep.emit('tpl', content);
// });
// db.get('some sql', function(err, result) {
// 	ep.emit('data', result);
// });

// function saveOrder = function(req, callback) {
// 	var orderid = 0;
// 	var materials = []；
// 	var totalprice = 0;

// 	async.parallel([
// 		function(cb) {

// 		},
// 		function(cb) {
// 			async.forEach(rows, function(row, cb) {
// 				materials.push({
// 					mid: row.mid,
// 					quantity: row.quantity
// 				});
// 				//查询价格
// 				Materials.findMaterials(mid, function(err, material) {
// 					if (material) {
// 						totalprice += material.price;
// 					}
// 					cb();
// 				});
// 			}, function(err, result) {
// 				cb();
// 			});
// 		}
// 	], function(err, result) {
// 		callback();
// 	});
// };

exports.findOrder = function(req, res) {

}

exports.updateOrder = function(req, res) {

}