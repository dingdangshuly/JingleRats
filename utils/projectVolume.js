//工程量公式基准参数
var VOLUME_CACHE = {
	1001: 0.16,
	1002: 0.13,
	1003: 0.33
};

/**
 * 工程量推荐
 * area：面积,mids:材料id数组
 * return {1001:16,1002:13}
 */
var cal = function(area, mids) {
	var pvloume = {};
	if (area && mids && mids.length > 0) {
		//遍历mids
		mids.forEach(function(mid) {
			if (VOLUME_CACHE[mid]) {
				pvloume[mids] = Math.ceil(area * VOLUME_CACHE[mids]); //向上取整,有小数就整数部分加1 
			}
		});
	}
	return pvloume;
}

exports.calu = cal;