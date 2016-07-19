<template>
	<div class="vue-modal">
    <modal
  		:show.sync="show"
      :close="close">
  		<div slot="header">
  			<h3>背景图片上传</h3>
  		</div>
  		<div slot="body">
        <upload :callback="uploadCallback"></upload>
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
import upload from '../components/upload.vue';

export default {
	props: [
    "show",
    "close",
    "uploadCallback"
  ],
	components: {
		modal,
    upload
	}
}
</script>
