var Vue = require('vue');
var vue = new Vue();
Vue.use(require('vue-resource'));

var _hdIndex;
var _prefixUrl;
var _drawgiftRrefixUrl;
var _exchangeGiftUrl;

var VueAjax = function(url, data, successfn, errorfn, axoption) {
	data = (typeof data != "object") ? {} : data;
	var option = {
		jsonp: "callback"
  	};
  
  	vue.$http.jsonp(url, data, option).then(function (rsp) {
  		successfn(rsp.data);
  	}, function (rsp) {
  		errorfn(rsp.data);
  	});

  	console.log(data);
};

exports.hdData = {
	setHdIndex: function(idx) {
		_hdIndex = idx;
		_prefixUrl = 'http://hd.vip.yy.com/service/hdplatform/' + _hdIndex;
		_drawgiftRrefixUrl = 'http://hd.vip.yy.com/service/hdplatform/drawgift/' + _hdIndex;
		_exchangeGiftUrl = 'http://hd.vip.yy.com/service/hdplatform/exchangegift/' + _hdIndex;
	},
	//页面入口默认信息
	loadIndex: function(callback) {
		VueAjax(_prefixUrl + '/index', null, callback);
	},
	loadTime: function(callback){
		VueAjax(_prefixUrl + '/hdTime', null, callback);
	},
	//抽奖
	loadDoRoll: function(lotteryId, lotteryType, callBack) {
		var _param = {
			lotteryId: lotteryId
		};

		if (lotteryType == 2) {
			_param = {
				lotteryGroupId: lotteryId
			};
		}
		VueAjax(_prefixUrl + '/doRoll', _param, callBack);
	},
	//查看获奖记录
	loadMyprize: function(lotteryId, lotteryType, callBack) {
		var _param = {
			lotteryId: lotteryId
		};

		if (lotteryType == 2) {
			_param = {
				lotteryGroupId: lotteryId
			};
		}
		VueAjax(_prefixUrl + '/myprize', _param, callBack);
	},
	//查看抽奖剩余次数
	loadRollCount: function(lotteryId, lotteryType, callBack) {
		var _param = {
			lotteryId: lotteryId
		};

		if (lotteryType == 2) {
			_param = {
				lotteryGroupId: lotteryId
			};
		}
		VueAjax(_prefixUrl + '/rollCount', _param, callBack);
	},

	//查看支付历史记录
	loadPayHistroy: function(payId, callBack) {

		VueAjax(_prefixUrl + '/chargeList', {
				payIndex: payId
			},
			callBack
		);
	},

	//礼包兑换
	/*loadGiftExchange: function(exchangeGiftGroupId, callBack) {
		VueAjax(_exchangeGiftUrl + '/exchange', {
				exchangeGiftGroupId: exchangeGiftGroupId
			},
			callBack
		);
	},

	loadGiftExchangList: function(exchangeGiftGroupId, callBack) {
		VueAjax(_exchangeGiftUrl + '/exchangeList', {
			exchangeGiftGroupId: exchangeGiftGroupId
		}, callBack);
	},*/

	//兑换统计
	loadGiftExchangStat: function(exchangeGiftGroupId, pid, type, callBack) {
		VueAjax(_exchangeGiftUrl + '/exchangeGiftCount', {
			exchangeGiftGroupId: exchangeGiftGroupId,
			pid: pid,
			type: type
		}, callBack);
	},
	//赠送领取控件
	loadDonateBList: function(drawGiftGroupId, callBack) {

		VueAjax(_drawgiftRrefixUrl + '/mygiftp', {
			drawGiftGroupId: drawGiftGroupId
		}, callBack);
	},
	//赠送领取控件(获赠)
	loadDonateGList: function(drawGiftGroupId, callBack) {
		VueAjax(_drawgiftRrefixUrl + '/myreceiverp', {
				drawGiftGroupId: drawGiftGroupId
			},
			callBack
		);
	},
	//用户自身领取礼包
	donateReceivegift: function(drawGiftGroupId, actPrizeId, callBack) {

		VueAjax(_drawgiftRrefixUrl + '/receivegiftp', {
			drawGiftGroupId: drawGiftGroupId,
			actPrizeId: actPrizeId
		}, callBack);
	},
	//用户赠送幸运礼包时 返回确认信息

	donateSendconfirm: function(drawGiftGroupId, toimid, callBack) {
		VueAjax(_drawgiftRrefixUrl + '/sendconfirm', {
			drawGiftGroupId: drawGiftGroupId,
			toimid: toimid
		}, callBack);
	},

	//礼包兑换
	loadGiftExchange: function(exchangeGiftGroupId, callBack, option) {
		VueAjax(_exchangeGiftUrl + '/exchange', {
				exchangeGiftGroupId: exchangeGiftGroupId
			},
			callBack, null, option);
	},

	loadGiftExchangList: function(exchangeGiftGroupId, callBack, option) {
		VueAjax(_exchangeGiftUrl + '/exchangeList', {
			exchangeGiftGroupId: exchangeGiftGroupId
		}, callBack, null, option);
	},
	//取得所有兑换数据
	loadGiftExchangALLList: function(actId, callBack, option) {
		VueAjax(_exchangeGiftUrl + '/exchangeListByActId', {
			actId: actId
		}, callBack, null, option);
	},

	//赠送礼包
	donateSendgift: function(drawGiftGroupId, actPrizeId, toimid, callBack) {
		VueAjax(_drawgiftRrefixUrl + '/sendgiftp', {
			drawGiftGroupId: drawGiftGroupId,
			actPrizeId: actPrizeId,
			toimid: toimid
		}, callBack);
	},
	donateAcceptgift: function(drawGiftGroupId, actPrizeId, callBack) {
		VueAjax(_drawgiftRrefixUrl + '/acceptgiftp', {
			drawGiftGroupId: drawGiftGroupId,
			actPrizeId: actPrizeId
		}, callBack);
	},
	donateRefusegift: function(drawGiftGroupId, actPrizeId, callBack) {
		VueAjax(_drawgiftRrefixUrl + '/refusegiftp', {
			drawGiftGroupId: drawGiftGroupId,
			actPrizeId: actPrizeId
		}, callBack);
	}
};