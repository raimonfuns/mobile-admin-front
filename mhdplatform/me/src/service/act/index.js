Vue.use(require('vue-resource'));

Vue.http.options.emulateJSON = true; //  application/json -> form-data

var service = {};

export default service 

// 支付
service.payByMbip = productId => {
	return Vue.http({url: 'http://test.me.yy.com/service/webhd/hdpf/pay/payByMbip?productId=' + productId, method: 'JSONP'});
}

// 我的奖品列表
service.getPrizeListp = actId => {
	return Vue.http({url: 'http://test.me.yy.com/service/webhd/hdpf/prize/prizeListp?actId=' + actId, method: 'JSONP'});
}
