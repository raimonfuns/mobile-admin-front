<template>
	<div class="user-content" transition="fade" transition-mode="out-in">
      <h2 class="title fontSize20">购买记录</h2>    
      <div v-if="showLoading" class="loading fontSize12">加载中...</div>
      <ul class="record-list" id="pay-record-content" v-cloak>
          <li class="record-list-item fontSize12 cl" v-for="v in items">
              <span class="pay-time">{{ v.updateTime }}</span>    
              <span class="detail">{{ v.payTimes }}次 支付 {{ v.productName }}</span>
          </li>

          <li v-if="!items || items.length == 0" class="noticeMessage fontSize12">您还没有购买记录</li>
      </ul>
      <div>{{ menuButtonHtml }}</div>
  </div>
</template>

<script>
var rsp = {"result":true,"code":0,"desc":null,"data":[
        {"productId":565910,"productName":"年费会员礼包111","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"},
        {"productId":565910,"productName":"年费会员礼包","payTimes":3,"updateTime":"2015-09-22 15:49:33","createTime":"2015-09-22 14:56:45"}
      ]};

var vm;

export default {
	data () {
		return {
			showLoading: true,
			items: rsp.data	
		}
	},

	ready () {
		vm = this;

		vm.showLoading = false;
	}
}
</script>