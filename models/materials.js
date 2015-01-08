


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//材料信息
var MaterialsSchema = new Schema({
	//材料编号
	mid: {
		type: String,
		index: true
	},
	//材料名称
	name:{
		type: String,
		index: true
	},
	//材料单价
	unitprice: {
		type: Number
	},
	//品牌编号
	brandid:{
		type:String
	},
	//品牌名称
	brandname:{
		type:String
	},
	//材料规格
	standard:{
		type:String
	}
}, {
	collection: 'materials' //mongodb数据表
});

mongoose.model('Materials', MaterialsSchema);