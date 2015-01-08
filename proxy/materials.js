var models = require('../models');
var Materials = models.Materials;


//材料查询
exports.findMaterials = function(query, callback) {
	Materials.findOne(query, callback);
};

//材料修改
exports.updateMaterials = function(query, callback) {
	Materials.update(query, callback);
};

//材料查询
exports.removeMaterials = function(query, callback) {
	Materials.remove(query, callback);
};

//新增材料信息
var saveMaterials = exports.saveMaterials = function(mid, name, unitprice, brandid, brandname, standard, callback) {
	var materials = new Materials();
	materials.mid = mid;
	materials.name = name;
	materials.unitprice = unitprice;
	materials.brandid = brandid;
	materials.brandname = brandname;
	materials.standard = standard;
	materials.save(callback);
};


// saveMaterials(1002, '3mm澳松', 45, 'mgs', '莫干山', '2420*1220*3mm', function(err, data) {
// 	console.info(err + '   ' + data);
// });

// saveMaterials(1003, '9mm澳松', 85, 'mgs', '莫干山', '2420*1220*9mm', function(err, data) {
// 	console.info(err + '   ' + data);
// });
// saveMaterials(1004, '18mm澳松', 125, 'mgs', '莫干山', '2420*1220*18mm', function(err, data) {
// 	console.info(err + '   ' + data);
// });
// saveMaterials(1005, '马六甲', 185, 'mlj', '莫干山', '2420*1220*18mm', function(err, data) {
// 	console.info(err + '   ' + data);
// });
// saveMaterials(1006, '石膏板', 17.5, 'ts', '太散', '2420*1220*9mm', function(err, data) {
// 	console.info(err + '   ' + data);
// });