var Vue = require('vue');
Vue.use(require('vue-resource'));

Vue.http.options.emulateJSON = true; //  application/json -> form-data

var service = {};

export default service

// 活动列表
service.getListItem = page => {
	return Vue.http({url: '/service/hd/hdcomp/hdPages?currentPage=' + page, method: 'GET'});
}

// 新建活动
service.addItem = data => {
	return Vue.http({url: '/service/hd/hdcomp/addHd', data: data, method: 'POST'});
}

// 保存活动
service.saveItem = data => {
	console.log(data);
	return Vue.http({url: '/service/hd/common/saveOrUpdateActivityTemplateInfo', data: {hdIndex: data.index, version: 0, templateInfo: JSON.stringify(data)}, method: 'POST'});
}

// 活动信息
service.getItem = id => {
	return Vue.http({url: '/service/hd/common/getActivityTemplateInfo?version=0&hdIndex=' + id, method: 'GET'});
}

// 活动详情
service.getHdDetail = id => {
	return Vue.http({url: '/service/hd/hdcomp/hdDetail?index=' + id, method: 'GET'});
}

// 生成本地文件
service.preview = data => {
	return Vue.http({url: '/mhdplatform/service/grunt/nser/makefile/preview', data: data, method: 'POST'});
}

// 生成本地文件
service.release = data => {
	return Vue.http({url: '/mhdplatform/service/grunt/nser/makefile/buildfiles', data: data, method: 'POST'});
}

// 修改活动时间
service.updateTime = data => {
	return Vue.http({url: '/service/hd/hdcomp/updateTime', data: data, method: 'POST'});
}

// 添加支付组件
service.addPayForHd = data => {
	return Vue.http({url: '/service/hd/hdcomp/addPayForHd', data: data, method: 'POST'});
}

// 删除支付组件
service.deletePayFromHd = data => {
	return Vue.http({url: '/service/hd/hdcomp/deletePayFromHd', data: {hdIndex: data.hdIndex, payIndex: data.payIndex}, method: 'POST'});
}

// 保存支付组件
service.updatePayProductsInfo = data => {
	return Vue.http({url: '/service/hd/hdcomp/updatePayProductsInfo', data: data, method: 'POST'});
}

// appid
service.getAppIdList = data => {
	return Vue.http({url: '/service/hd/hdcomp/appIdList', data: data, method: 'GET'});
}

// vip类型
service.getMeVipTypeList = data => {
	return Vue.http({url: '/service/hd/hdcomp/meVipTypeList', data: data, method: 'GET'});
}

// 支付大类型
service.getPayTypeList = data => {
	return Vue.http({url: '/service/hd/hdcomp/payTypeList', data: data, method: 'GET'});
}

// 活动类型
service.getHdTypeList = data => {
	return Vue.http({url: '/service/hd/hdcomp/hdTypeList', data: data, method: 'GET'});
}

// 发放类型
service.getReleaseTypeList = data => {
	return Vue.http({url: '/service/hd/hdcomp/releaseTypeList', data: data, method: 'GET'});
}
