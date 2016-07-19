<template>
	<div>
		<div class="vue-modal">
      <modal
    		:show.sync="showUploadModal"
        :close="closeUploadModal">
    		<div slot="header">
    			<h3>背景图片上传</h3>
    		</div>
    		<div slot="body">
          <upload :callback="uploadCallback"></upload>
        </div>
        <div slot="footer">
          <button class="btn btn-default" @click="closeUploadModal">
            关闭
          </button>
        </div>
    	</modal>
		</div>
	</div>
</template>

<script>
import modal from './modal.vue';
import upload from '../components/upload.vue';

export default {
	props: [
    "showUploadModal",
    "closeUploadModal",
    "uploadCallback"
  ],
	components: {
		modal,
    upload
	}
}
</script>
