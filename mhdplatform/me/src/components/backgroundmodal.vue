<template>
	<div class="vue-modal">
    <modal
      :show.sync="show"
      :close="close">
      <div slot="header">
        <h3>设置背景图片颜色</h3>
      </div>
      <div slot="body">
        <label>背景颜色:</label><input type="text" v-model="backgroundColor">
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
    "backgroundColor"
  ],
	components: {
		modal
	}
}
</script>
