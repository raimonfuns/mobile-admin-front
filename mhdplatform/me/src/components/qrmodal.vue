<template>
	<div class="vue-modal">
    <modal
  		:show.sync="show"
      :close="close">
  		<div slot="header">
  			<h3>预览页面二维码</h3>
  		</div>
  		<div slot="body">
  			<p class="text-center" v-show="!showImg">正在生成二维码...</p>
  			<div id="qrcode" class="text-center" v-show="showImg"></div>
  			<a href="#" id="previewLocation" target="_blank" v-show="showImg">预览地址</a>
      </div>
      <div slot="footer">
        <button class="btn btn-default" @click="close">
          关闭
        </button>
      </div>
  	</modal>
  </div>
</template>

<script>
import modal from './modal.vue';

export default {
	props: [
    "show",
    "close",
    "showImg"
  ],
	components: {
		modal
	}
}
</script>
