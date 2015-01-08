var Materials = require('../proxy').Materials;
var projectVolume = require('../utils/projectVolume');
var async = require('async');

//拉取推荐材料列表
exports.getDefaultMaterials = function(req, res) {
	var materialsData = {
		materials: []
	};
	var builtpArea = parseInt(req.body.builtpArea || 100); //默认100平米
	var mids = [1001, 1002, 1003, 1004, 1005, 1006];
	async.forEach(mids, function(mid, cb) {
		Materials.findMaterials({
			mid: mid
		}, function(err, materials) {
			materials.quantity = projectVolume.calculateByArea(builtpArea, mid);
			materialsData.materials.push(materials);
			cb();
		});
	}, function(err, result) {
		console.info('******拉取推荐材料列表*****\n',materialsData);
		res.render('index', materialsData);
	});
};

//材料查询
exports.findMaterials = function(req, res) {

};

//材料修改
exports.updateMaterials = function(req, res) {

};

//材料查询
exports.removeMaterials = function(req, res) {

};

//新增材料信息
var saveMaterials = exports.saveMaterials = function(req, res) {

};