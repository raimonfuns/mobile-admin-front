<template>
	<div class="user-content">
    <h2 class="title fontSize20">奖品记录</h2>    
    <div v-if="showLoading" class="loading fontSize12">加载中...</div>
    <ul class="record-list" id="my-combo-record-content" v-cloak>
        <li class="record-list-item fontSize12 cl" v-for="v in items">
            <p>{{ v.time }}</p>
            <p class="gift-content">{{ v.giftName }}</p>
            <input type="text" class="send-yy-input fontSize12" placeholder="请输入领取/赠送的YY号" v-if="showInput[$index]" v-model="inputNumber[$index]">
            <div class="btn-wrap" v-show="v.status == 0">
                <a 
                    href="javascript:;" 
                    class="process-gift-btn receive-btn btn-style-green"
                    v-on:touchstart="receive($index, drawGiftGroupId, v.giftId)"
                    v-show="!showInput[$index]"
                    >领取</a>
                <a 
                    href="javascript:;" 
                    class="process-gift-btn reject-btn btn-style-blue" 
                    v-on:touchstart="send($index)"
                    v-show="!showInput[$index]"
                    >赠送</a>
                <a 
                    href="javascript:;" 
                    class="confirm-btn ok-btn btn-style-green" 
                    v-on:touchstart="ok($index, drawGiftGroupId, v.giftId, inputNumber[$index])"
                    v-show="!!showInput[$index]"
                    >确定</a>
                <a 
                    href="javascript:;" 
                    class="confirm-btn cancel-btn btn-style-blue"
                    v-on:touchstart="cancel($index)"
                    v-show="!!showInput[$index]"
                    >取消</a>
            </div>
            <p v-if="v.status == 2">已领取</p>
            <p v-if="v.status == 6">已消耗</p>
            <p v-if="v.status !== 0 && v.status !== 2 && v.status !== 6">已赠送</p>
        </li>

        <li v-if="!items || items.length == 0" class="noticeMessage fontSize12">您还没有奖品记录</li>
    </ul>
    <div>{{ menuButtonHtml }}</div>
  </div>
</template>

<script>
var dialog = require('../../library/dialog.js');
var hdData = require('../../library/hdplatform.data.js').hdData;

hdData.setHdIndex('201604c2235a');

var rsp = {"result":true,"code":10004,"desc":"活动已结束","data":[{"dbId":7224812,"giftId":7224812,"status":0,"giftName":"金色靓图标30天","fromImid":null,"time":"2015-09-22 15:57:26","desc":"金色靓图标30天","oriTime":1442908646000},{"dbId":7224808,"giftId":7224808,"status":2,"giftName":"100点成长值","fromImid":null,"time":"2015-09-22 15:57:25","desc":"100点成长值","oriTime":1442908645000}]};

var vm;

export default {
	data () {
		return {
			items: rsp.data,
			showLoading: true,
			showInput: [],
      inputNumber: [],
      drawGiftGroupId: '201604c2235a450'
		}
	},

	ready () {
		vm = this;

		vm.showLoading = false;
	},

	methods: {
		receive: function (index, drawGiftGroupId, giftId) {
      console.log(index, drawGiftGroupId, giftId);
      hdData.donateReceivegift.call(this, drawGiftGroupId, giftId, function(rsp) {
        if (rsp.result) {
          vm.items[index].status = 2;
        } else {
          dialog.typeMsg(rsp.desc);
        }
      });
    },
    send: function (index) {
      vm.showInput.$set(index, true);
    },
    ok: function (index, drawGiftGroupId, giftId, sendNumber) {
      var _this = this;
      console.log(index, drawGiftGroupId, giftId, sendNumber);

      // 检查输入yy号格式
      if (!sendNumber || sendNumber.match(/\D/) !== null) {
        dialog.typeMsg('输入的yy号格式不正确');
        return false;
      }

      dialog.confirm('确定送给[' + sendNumber + ']吗?', function () {
        hdData.donateSendgift.call(_this, drawGiftGroupId, giftId, sendNumber, function(rsp) {
          if (rsp.result) {
            _this.inputNumber.$set(index, '');
            _this.items[index].status = 5;
            _this.showInput.$set(index, false);
          } else {
            console.log(rsp.desc);
            dialog.typeMsg(rsp.desc);
          }
        });
      });
    },
    cancel: function (index) {
      vm.showInput.$set(index, false);
      vm.inputNumber.$set(index, '');
    }
	}
}
</script>

<style lang="stylus" scoped>

</style>