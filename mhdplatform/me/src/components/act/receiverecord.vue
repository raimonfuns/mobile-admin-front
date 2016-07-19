<template>
	<div class="user-content" transition="fade" transition-mode="out-in">
    <h2 class="title fontSize20">获赠记录</h2>    
    <div v-if="showLoading" class="loading fontSize12">加载中...</div>
    <ul class="record-list" id="receive-record-content" v-cloak>

      <li class="record-list-item fontSize12 cl" v-for="v in items">
          <p>{{ v.time }}</p>
          <p class="send-person">{{ v.fromImid }}赠送</p>
          <p class="gift-content">{{ v.giftName }}</p>
          <div class="btn-wrap" v-if="v.status == 1">
              <a 
                  href="javascript:;" 
                  class="process-gift-btn receive-btn btn-style-green"
                  v-on:touchstart="receiveOtherPrize($index, drawGiftGroupId, v.giftId)"
                  >领取</a>
              <a 
                  href="javascript:;" 
                  class="process-gift-btn reject-btn btn-style-blue" 
                  v-on:touchstart="refuseOtherPrize($index, drawGiftGroupId, v.giftId)"
                  >拒绝</a>
          </div>
          <p v-if="v.status == 3">已领取</p>
          <p v-if="v.status == 4">已拒绝</p>
      </li>

      <li v-if="!items || items.length == 0" class="noticeMessage fontSize12">您还没有获赠记录</li>
    </ul>	
    <div>{{ menuButtonHtml }}</div>
	</div>
</template>

<script>
var dialog = require('../../library/dialog.js');
var hdData = require('../../library/hdplatform.data.js').hdData;

hdData.setHdIndex('201604c2235a');

var rsp = {"result":true,"code":0,"desc":null,"data":[
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000},
        {"dbId":0,"giftId":27884018,"status":1,"giftName":"四月乐享至尊:380天年费会员+7天至尊VIP+10天全频紫名","fromImid":"909074176","time":"2016-04-08 18:16:56","desc":null,"oriTime":1460110616000}
      ]};

var vm;

export default {
	data () {
		return {
			showLoading: true,
			items: rsp.data,
			drawGiftGroupId: '201604c2235a450'
		}
	},

	ready () {
		vm = this;

		vm.showLoading = false;
	},

	methods: {
    receiveOtherPrize: function (index, drawGiftGroupId, giftId) {
      console.log(index, drawGiftGroupId, giftId);
      hdData.donateAcceptgift.call(this, drawGiftGroupId, giftId, function(rsp) {
        if (rsp.result) {
          vm.items[index].status = 3;
        } else {
          dialog.typeMsg(rsp.desc);
        }
      });
    },
    
    refuseOtherPrize: function (index, drawGiftGroupId, giftId) {
      console.log(index, drawGiftGroupId, giftId);
      hdData.donateRefusegift.call(this, drawGiftGroupId, giftId, function(rsp) {
        if (rsp.result) {
          vm.items[index].status = 4;
        } else {
          dialog.typeMsg(rsp.desc);
        }
      });
    }
  }	
}
</script>

<style lang="stylus" scoped>

</style>