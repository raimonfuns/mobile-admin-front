<template>
	<div>
		<div class="vue-modal">
			<modal
				:show.sync="show"
        :close.sync="close">

				<!-- header -->
				<div slot="header">
					<h3>提示信息</h3>
				</div>

				<!-- body -->
				<div slot="body">
					<p class="message" v-html="message"></p>
					<div class="loadingWrap" v-if="!message">
						<loading></loading>
					</div>
        </div>

				<!-- footer -->
        <div slot="footer">
          <button class="btn btn-success" @click="show = false">确定</button>
        </div>
			</modal>
		</div>
	</div>
</template>

<script>
import modal from './modal.vue';
import loading from './loading.vue';

export default {
	props: ['show', 'message', 'showLoading'],
	components: {
		modal,
		loading
	},
	methods: {
		close () {
			this.show = false;
		}
	}
}
</script>
