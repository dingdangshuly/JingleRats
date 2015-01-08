var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//订单
var OrderSchema = new Schema({
	//订单编号
	oid: {
		type: String
	},
	//房间面积
	builtpArea: {
		type: Number
	},
	//装修地址
	address: {
		type: String
	},
	//联系人手机号
	phone: {
		type: String
	},
	//材料id，材料数目
	materials: [{
		mid: String,
		quantity: Number
	}],
	//合计
	totalprice: {
		type: Number
	}
}, {
	collection: 'orders' //mongodb数据表
});

mongoose.model('Order', OrderSchema);