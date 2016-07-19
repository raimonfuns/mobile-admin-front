<template>
	<!-- <div class="dialog">
		<div class="weui_dialog_confirm" v-if="showConfirm">
	      <div class="weui_mask"></div>
	      <div class="weui_dialog">
	          <div class="weui_dialog_hd"><strong class="weui_dialog_title fontSize16">{{ title }}</strong></div>
	          <div class="weui_dialog_bd fontSize16">{{ content }}</div>
	          <div class="weui_dialog_ft">
	              <a href="javascript:;" class="weui_btn_dialog default fontSize16" v-on:touchend="closeConfirm()">取消</a>
	              <a href="javascript:;" class="weui_btn_dialog primary fontSize16" v-on:touchend="confirmSure()">确定</a>
	          </div>
	      </div>
	  </div>
	  <div class="weui_dialog_alert" v-if="showAlert">
	      <div class="weui_mask"></div>
	      <div class="weui_dialog">
	          <div class="weui_dialog_hd"><strong class="weui_dialog_title fontSize16">{{ title }}</strong></div>
	          <div class="weui_dialog_bd">
	          	<div v-if="!list" class="fontSize16">
	          		{{ content }}	
	          	</div>
	          	
	          	<div v-if="list">
	          		<table>
	          			<thead>
	          				<th class="fontSize12">奖品</th>
		          			<th class="fontSize12">获取时间</th>
	          			</thead>
		          		<tbody>
		          			<tr v-for="item in list">
		          				<td class="ell fontSize12">{{ item.name }}</td>	
		          				<td class="ell fontSize12">{{ item.createTime }}</td>	
		          			</tr>
		          		</tbody>
	          		</table>
	          	</div>
	          </div>
	          <div class="weui_dialog_ft">
	              <a href="javascript:;" class="weui_btn_dialog primary fontSize16" v-on:touchend="closeAlert()">确定</a>
	          </div>
	      </div>
	  </div>
	</div> -->

	<div :class="'weui_dialog_' + type" v-show="show">
	    <div class="weui_mask"></div>
	    <div class="weui_dialog">
	        <div class="weui_dialog_hd">
	            <strong class="weui_dialog_title fontSize16">{{title}}</strong>
	        </div>
	        <div class="weui_dialog_bd">
	        	<div v-if="!list" class="fontSize16">
          		{{ content }}	
          	</div>

						<div v-if="list.length == 0" class="fontSize16">
          		暂时没有奖品。
          	</div>

          	<div v-if="list.length > 0">
          		<table>
          			<thead>
          				<th class="fontSize12">奖品</th>
	          			<th class="fontSize12">获取时间</th>
          			</thead>
	          		<tbody>
	          			<tr v-for="item in list">
	          				<td class="ell fontSize12">{{ item.name }}</td>	
	          				<td class="ell fontSize12">{{ item.createTime }}</td>	
	          			</tr>
	          		</tbody>
          		</table>
          	</div>
	        </div>
	        <div class="weui_dialog_ft">
	            <a href="javascript:;" class="weui_btn_dialog default fontSize16" v-if="type === 'confirm'" @touchend="dispatch($event,  'on-' + type + '-cancel')">{{cancelBtn}}</a>
	            <a href="javascript:;" class="weui_btn_dialog primary fontSize16" @touchend="dispatch($event, 'on-' + type + '-confirm')">{{confirmBtn}}</a>
	        </div>
	    </div>
	</div>
</template>

<script>
var vm;
export default {
	props: {
		//类型：alert,confirm
	  type: {
	      type: String,
	      required: false,
	      default: 'alert'
	  },
	  //标题
	  title: {
	      type: String,
	      required: false,
	      default: '温馨提示'
	  },
	  content: {
	      type: String,
	      required: false,
	      default: '自定义内容'
	  },
	  show: {
	      type: Boolean,
	      required: true,
	      default: true
	  },
	  cancelBtn: {
	      type: String,
	      required: false,
	      default: '取消'
	  },
	  confirmBtn: {
	      type: String,
	      required: false,
	      default: '确定'
	  },
	  list: {
	    required: false,
	    twoWay: true
	  }
	},

  methods: {
    // openConfirm () {
    //   vm.showConfirm = true;
    // },

    // closeConfirm () {
    // 	vm.title = '提示';
    // 	vm.content = '';
    //   vm.showConfirm = false;
    // },

    // openAlert () {
    //   vm.showAlert = true;
    // },

    // closeAlert () {
    // 	vm.title = '提示';
    // 	vm.content = '';
    // 	vm.list = null;
    //   vm.showAlert = false;
    // },

    // confirmSure () {
    //   vm.confirmSureCallback();
    // },

    dispatch(event, eventStr) {
       this.$dispatch(eventStr);
    }
  }
}
</script>

<style lang="stylus" scoped>
table {
	width: 100%;
	border-top: 1px solid #ddd;
	border-left: 1px solid #ddd;
	tr {
		padding: 4px 20px;
	}
	th, td {
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		padding: 0.1rem 0rem;
	}
}
.weui_dialog {
	width: 8.5rem;
}
.weui_btn_dialog.default, .weui_btn_dialog.primary {
	line-height: 1;
	padding: 0.4rem 0;
}
.weui_dialog_hd {
	line-height: 1;
	padding: .4rem 0 .3rem;
}
.weui_dialog_bd {
	padding: 0.1rem 0.4rem;
}
.weui_dialog_confirm .weui_dialog .weui_dialog_bd {
	text-align: center;
}
.weui_dialog_ft {
	margin-top: .3rem;
}
.weui_dialog_title {
	color: #434343;
}
</style>