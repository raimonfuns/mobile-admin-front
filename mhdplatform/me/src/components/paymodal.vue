<template>
	<div>
		<modal :show.sync="show"
		:close.sync="close"
			:width="1200"
			:show.sync="show"
			:close.sync="close"
	    	:width="1200">

			<div slot="header">
				<h3>支付组件</h3>
			</div>

			<div slot="body">
				<div class="payContent">
					<div class="payComponentList clearfix">
						<h2 class="payTitle">支付组件列表：</h2>
						<ul v-if="hdData.payComponents != 'null' && showPayComponentList">
							<li class="payComponent clearfix" v-for="payComponent in hdData.payComponents">
								<div class="info" v-bind:class="{active: currentSelectedComponentIndex == $index}">
									<div class="desc ell">{{ payComponent.payMainConfig.title }}</div>
									<div class="index">{{ payComponent.payIndex }}</div>
								</div>
								<div class="btn-wrap clearfix">
									<a href="javascript:;" class="btn btn-success btn-sm fl" v-on:click="edit(payComponent.payIndex, $index)">编辑</a>
									<a href="javascript:;" class="btn btn-danger btn-sm fr" v-on:click="remove(payComponent.payIndex)">删除</a>
								</div>
							</li>
							<li class="payComponent">
								<div class="addBtnWrap clearfix">
									<a href="javascript:;" class="addBtn fl" v-on:click="add">添加支付组件</a>
								</div>
							</li>
						</ul>
						<!-- <div class="toggleBtn" v-on:click="toggleShowPayComponentList">{{ toggleBtnText }}</div> -->
					</div>
				</div>
	    </div>

	    <div slot="footer">
				<a href="javascript:;" class="btn btn-default btn-right" v-on:click="show = false;">关闭</a>
	    </div>
		</modal>

		<modal
			:show.sync="showEditPayComponentModal"
			:close.sync="closeEditPayComponentModal"
			:width="1200">
			<div slot="header">
				<h3>配置支付组件</h3>
			</div>
			<div slot="body">
				<div class="payContent">
					<div class="editWrap" v-if="showEditWrap">
						<div v-bind:style="{'max-height': contentHeight + 'px'}" style="overflow: auto;">
							<!-- <div class="tabWrap clearfix">
								<ul class="tab clearfix">
									<li>
										<a  href="javascript:;" class="active">
											支付组件配置
										</a>
									</li>
								</ul>
								<br>
							</div> -->

							<h2 class="payTitle">支付组件配置：</h2>
							<div class="tabContentList">
								<div class="tabConentItemWrap">
									<div class="tabConentItem">
										<div class="section">
											<!-- <h3>支付组件配置</h3> -->
											<div class="item">
												<div class="inputWrap clearfix">
													<div class="col left">
														<p><label class="required">支付组件名称</label><input type="text" v-model="payMainConfig.title"></p>
														<p>
															<label class="required">商品大类型</label>
															<select v-model="payMainConfig.type" v-bind:disabled="addOrUpdatePayComponentFlag != 'add'">
																<option v-for="(key, value) in payTypeList" v-bind:value="value">{{ key }}</option>
															</select>
														</p>
														<p>
															<label class="required">支付类型</label>
															<select v-model="payMainConfig.chargeType" v-bind:disabled="addOrUpdatePayComponentFlag != 'add'">
																<option value="1">自己买(PAY_BY_SELF)</option>
																<option value="2">代付(PAY_BY_OHTER)</option>
															</select>
														</p>
														<p><label class="required">副标题</label><input type="text"  v-model="payMainConfig.subTitle"></p>
														<p><label class="required">活动内容</label><input type="text" v-model="payMainConfig.payDesc"></p>
														<p><label>限制条件表达式</label><input type="text" v-model="payMainConfig.chargeLimit"></p>
													</div>
													<div class="col right">
														<!-- <p><label>支付类型</label><input type="text" v-model="payMainConfig.chargeType"></p> -->
														<p><label>总的抽奖次数限制</label><input type="text" v-model="payMainConfig.lotteryTotalCountLimit"></p>
														<p><label>总的发放次数限制</label><input type="text" v-model="payMainConfig.totalGiftLimitTimes"></p>
														<p><label>actid</label><input type="text" v-model="payMainConfig.actId"></p>
														<p>
															<a  href="javascript:;"
																class="addBtn"
																v-on:click="addProductCompnent">
																添加支付项
															</a>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- <div class="tabWrap clearfix">
								<ul class="tab clearfix subTab">
									<li  v-for="productCompnent in productCompnents" v-if="hdData.payComponents && hdData.payComponents.length > 0">
											<a  href="javascript:;"
												v-if="productCompnent.gifts.length > 0"
												v-on:click="selectTab($index + 2)"
												v-bind:class="{'active': currentTabIndex == ($index + 2)}">
												{{ productCompnent.name || '支付项' + ($index + 1) }}<span v-if="productCompnent.productId">({{ productCompnent.productId }})</span>

												<i class="deleteProductCompnentBtn"
														v-on:click="deleteProductCompnent(productCompnents, productCompnent, $index + 2)">x</i>
											</a>
									</li>
									<li>
										<a  href="javascript:;"
											class="addBtn"
											v-on:click="addProductCompnent">
											添加支付项
										</a>
									</li>
								</ul>
							</div> -->

							<h2 class="payTitle" v-if="productCompnents && productCompnents.length > 0">支付项列表：</h2>
							<div class="tabContentList" v-if="productCompnents && productCompnents.length > 0">
								<div class="tabConentItemWrap" v-for="productCompnent in productCompnents">
									<div class="tabConentItem">
										<div class="section cl" v-if="(productCompnent.gifts && productCompnent.gifts.length > 0) || (productCompnent.lotteryInfos && productCompnent.lotteryInfos.length > 0)">
											<!-- <h3>{{ productCompnent.name || '支付项' + ($index + 1) }}配置</h3> -->
											<div class="cl">
												<table class="table table-striped table-bordered table-hover text-center table-list">
													<tbody>
														<tr>
															<th>商品名称</th>
															<th>价格</th>
															<!-- <th>抽奖表达式</th> -->
															<th>抽奖次数限制</th>
															<th>productId</th>
														</tr>
														<tr>
															<td>{{ productCompnent.name }}</td>
															<td>{{ productCompnent.price }}</td>
															<!-- <td>{{ productCompnent.lotteryEl ? '' : '无' }}</td> -->
															<td>{{ productCompnent.lotteryCountLimit ? productCompnent.lotteryCountLimit : '无限制' }}</td>
															<td>{{ productCompnent.productId }}</td>
														</tr>
													</tbody>
												</table>
											</div>

											<div class="cl">
												<table class="table table-striped table-bordered table-hover text-center sub-table table-list" v-if="productCompnent.gifts && productCompnent.gifts.length > 0">
													<tbody>
														<tr>
															<th>礼品pid</th>
															<th>发放形式</th>
															<th>用户发放限制</th>
														</tr>
														<tr v-for="gift in productCompnent.gifts" track-by="$index">
															<td>{{ gift.pid }}</td>
															<td>{{ gift.giftType }}</td>
															<td>{{ gift.uidLimitTimes ? gift.uidLimitTimes : '无限制' }}</td>
														</tr>
													</tbody>
												</table>
											</div>

											<div class="cl">
												<table class="table table-striped table-bordered table-hover text-center sub-table table-list lottery-table" v-if="productCompnent.lotteryInfos && productCompnent.lotteryInfos.length > 0">
													<tbody>
														<tr>
															<th>奖池id</th>
															<th>发放形式</th>
															<th>actid</th>
															<th>充值第n次才送</th>
															<th>本奖池被抽中的次数</th>
															<th>每次抽中的奖品数</th>
															<th>购买赠送礼物次数</th>
														</tr>
														<tr v-for="($lotteryInfoIndex, lotteryInfo) in productCompnent.lotteryInfos">
															<td>{{ lotteryInfo.webLotteryId }}</td>
															<td>{{ lotteryInfo.releaseType == 1 ? '实时发放' : '赠送领取' }}</td>
															<td>{{ lotteryInfo.releaseActId }}</td>
															<td>{{ lotteryInfo.timeToSntGift }}</td>
															<td>{{ lotteryInfo.recvGiftLimit }}</td>
															<td>{{ lotteryInfo.prizeNumEachTime }}</td>
															<td>{{ lotteryInfo.uidLimitTimes }}</td>
														</tr>
													</tbody>
												</table>
											</div>

											<div class="btn-wrap cl">
												<button class="btn-add btn btn-success fl" v-on:click="openEditProductComponent(productCompnent)">编辑</button>
												<button class="btn-add btn btn-danger fl" v-on:click="deleteProductComponent(productCompnent)">删除</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		  </div>
			<div slot="footer">
				<div class="btnWrap">
					<a href="javascript:;" class="btn btn-default btn-right" v-on:click="showEditPayComponentModal = false;">关闭</a>
					<a href="javascript:;" class="btn btn-success btn-right" v-on:click="save" v-if="addOrUpdatePayComponentFlag == 'add'">创建新组件</a>
					<a href="javascript:;" class="btn btn-success btn-right" v-on:click="update" v-if="addOrUpdatePayComponentFlag == 'update'">保存修改</a>
				</div>
			</div>
		</modal>

		<modal
				:show.sync="showEditProductCompnentModal"
				:close.sync="closeEditProductCompnentModal"
				:width="1200">
				<div slot="header">
					<h3>编辑商品信息</h3>
				</div>
				<div slot="body">
					<div class="payContent">
						<div class="editWrap" v-if="currentEditProductCompnent">

							<div v-bind:style="{'max-height': contentHeight + 100 + 'px'}" style="overflow: auto;">
								<div class="tabContentList">
									<div class="tabConentItemWrap">
										<div class="tabConentItem">
											<div class="section">
												<h2 class="payTitle">{{ currentEditProductCompnent.name || '支付项' }}配置</h2>
												<div class="item">
													<div class="inputWrap clearfix">
														<div class="col left">
															<!-- <p>
																<label class="required">活动类型</label>
																<select v-model="currentEditProductCompnent.keyEx">
																	<option v-for="(key, value) in meVipTypeList" v-bind:value="value">{{ key }}</option>
																</select>
															</p> -->
															<!-- <p><label class="required">开通天数</label><input type="text" v-model="currentEditProductCompnent.key"></p> -->
															<p><label class="required">价格</label><input type="text" v-model="currentEditProductCompnent.price"></p>
															<p><label class="required">商品名称</label><input type="text" v-model="currentEditProductCompnent.name"></p>
														</div>
														<div class="col right">
															<p><label>抽奖表达式</label><input type="text" v-model="currentEditProductCompnent.lotteryEl"></p>
															<p><label>抽奖次数限制</label><input type="text" v-model="currentEditProductCompnent.lotteryCountLimit"></p>
															<p v-if="currentEditProductCompnent.productId"><label>productId</label><input type="text" disabled v-model="currentEditProductCompnent.productId"></p>
														</div>
													</div>
												</div>
											</div>

											<div class="section section-send">
												<h2 class="payTitle">赠品</h2>
												<table class="table table-striped table-bordered table-hover text-center sub-table" v-if="currentEditProductCompnent.gifts && currentEditProductCompnent.gifts.length > 0">
													<tbody>
														<tr>
															<th>礼品pid</th>
															<th>发放形式</th>
															<th>用户发放限制</th>
															<th>操作</th>
														</tr>
														<tr v-for="gift in currentEditProductCompnent.gifts" track-by="$index">
															<td>{{ gift.pid }}</td>
															<td>{{ gift.giftType }}</td>
															<td>{{ gift.uidLimitTimes ? gift.uidLimitTimes : '无限制' }}</td>
															<td><button class="btn btn-danger btn-xs" v-on:click="deleteGift(gift)">删除</button></td>
														</tr>
													</tbody>
												</table>
												<div class="itemList">
													<div class="item item-send">
														<div class="inputWrap clearfix">
															<div class="col left">
																<p><label class="required">礼品pid</label><input type="text" v-model="editGiftInfo.pid"></p>
																<p>
																	<label>发放形式</label>
																	<select v-model="editGiftInfo.giftType">
																		<option value="1">实时发放</option>
																		<option value="2">赠送领取</option>
																	</select>
																</p>
															</div>
															<div class="col right">
																<p><label>用户发放限制</label><input type="text" v-model="editGiftInfo.uidLimitTimes"></p>
															</div>
														</div>
													</div>
												</div>
												<button class="btn-add btn btn-success" v-on:click="addGift()">添加赠品</button>
											</div>

											<div class="section">
												<h2 class="payTitle">抽奖奖品</h2>
												<table class="table table-striped table-bordered table-hover text-center sub-table lottery-table" v-if="currentEditProductCompnent.lotteryInfos && currentEditProductCompnent.lotteryInfos.length > 0">
													<tbody>
														<tr>
															<th>奖池id</th>
															<th>发放形式</th>
															<th>actid</th>
															<th>充值第n次才送</th>
															<th>本奖池被抽中的次数</th>
															<th>每次抽中的奖品数</th>
															<th>购买赠送礼物次数</th>
															<th>操作</th>
														</tr>
														<tr v-for="($lotteryInfoIndex, lotteryInfo) in currentEditProductCompnent.lotteryInfos" track-by="$index">
															<td>{{ lotteryInfo.webLotteryId }}</td>
															<td>{{ lotteryInfo.releaseType == 1 ? '实时发放' : '赠送领取' }}</td>
															<td>{{ lotteryInfo.releaseActId }}</td>
															<td>{{ lotteryInfo.timeToSntGift }}</td>
															<td>{{ lotteryInfo.recvGiftLimit }}</td>
															<td>{{ lotteryInfo.prizeNumEachTime }}</td>
															<td>{{ lotteryInfo.uidLimitTimes }}</td>
															<td><button class="btn btn-danger btn-xs" v-on:click="deleteLotteryInfo(lotteryInfo)">删除</button></td>
														</tr>
													</tbody>
												</table>
												<div class="itemList">
													<div class="item item-send">
														<div class="inputWrap clearfix">
															<div class="col left">
																<!-- <p>
																	<label>领取用户身份</label>
																	<select v-model="lotteryInfo.isVip">
																		<option value="">请选择</option>
																		<option value="1">新用户</option>
																		<option value="2">老用户</option>
																	</select>
																</p>
																<p><label>会员级别</label><input type="text" v-model="lotteryInfo.vipGrade"></p> -->
																<p><label>奖池id</label><input type="text" v-model="editLotteryInfo.webLotteryId"></p>
																<p>
																	<label>发放形式</label>
																	<select v-model="editLotteryInfo.releaseType">
																		<option value="1">实时发放</option>
																		<option value="2">赠送领取</option>
																	</select>
																</p>
																<p><label>赠送领取的actid</label><input type="text" v-model="editLotteryInfo.releaseActId"></p>
															</div>
															<div class="col right">
																<!-- <p>
																	<label>领取用户紫钻身份</label>
																	<select v-model="editLotteryInfo.isDiamond">
																		<option value="">请选择</option>
																		<option value="1">紫钻会员</option>
																		<option value="2">非紫钻会员</option>
																	</select>
																</p>
																<p><label>紫钻级别</label><input type="text" v-model="editLotteryInfo.diamondGrade"></p> -->
																<p><label>充值第n次才送</label><input type="text" v-model="editLotteryInfo.timeToSntGift"></p>
																<p><label>本奖池被抽中的次数</label><input type="text" v-model="editLotteryInfo.recvGiftLimit"></p>
																<p><label>每次抽中的奖品数</label><input type="text" v-model="editLotteryInfo.prizeNumEachTime"></p>
																<p><label>购买赠送礼物次数</label><input type="text" v-model="editLotteryInfo.uidLimitTimes"></p>
															</div>
														</div>
													</div>
												</div>
												<button class="btn-add btn btn-success" v-on:click="addLotteryInfo()">添加奖品</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button class="btn-add btn btn-default btn-right" v-on:click="showEditProductCompnentModal = false;">关闭</button>
					<button class="btn-add btn btn-success btn-right" v-on:click="saveProductCompnent()">保存</button>
				</div>
		</modal>

		<alert-modal
	      :show.sync="showAlertModal"
	      :message.sync="message">
	    </alert-modal>
	</div>
</template>

<script>
var _ = require('underscore');

import modal from './modal.vue';
import service from '../service';
import alertModal from './alertmodal.vue';

var vm;
export default {
	components: {
		modal,
		alertModal
	},

	ready () {
		vm = this;

		// 事件绑定
		window.addEventListener('resize', function () {
			vm.contentHeight = window.innerHeight - 380;
		});

    service.getPayTypeList().then(function (rsp) {
      vm.payTypeList = rsp.data.data;
    });

    service.getMeVipTypeList().then(function (rsp) {
      vm.meVipTypeList = rsp.data.data;
    });
	},

	data () {
		return {
			showAlertModal: false,
			showEditProductCompnentModal: false,
			showEditPayComponentModal: false,
			currentEditProductCompnent: null,
			addOrUpdatePayComponentFlag: 'add',
			addOrUpdateProductComponentFlag: 'add',
			message: '',
			currentTabIndex: 2,
			currentSelectedComponentIndex: 0,
			showEditWrap: false,
			contentHeight: window.innerHeight - 380,
			payIndex: -1,
			payMainConfig: {},
			productCompnents: [],

			showPayComponentList: true,
			toggleBtnText: '-',

			payTypeList: {},
			meVipTypeList: {},

			editGiftInfo: {			// 当前编辑的礼物信息
			  pid: '',
			  giftType: '1',
			  uidLimitTimes: ''
			},

			editLotteryInfo: {		// 当前编辑的奖品信息
				releaseActId: '',
				releaseType: 1,
				webLotteryId: '',
				diamondGrade: '',
				isDiamond: '',
				uidLimitTimes: '',
				prizeNumEachTime: '',
				recvGiftLimit: '',
				timeToSntGift: '',
				vipGrade: '',
				isVip: ''
			}
		}
	},

	props: ['show', 'hdIndex', 'hdData'],

	methods: {
		close () {
			vm.show = false;
		},

		closeEditProductCompnentModal () {
			vm.showEditProductCompnentModal = false;
		},

		closeEditPayComponentModal () {
			vm.showEditPayComponentModal = false;
		},

		selectTab (index) {
			vm.currentTabIndex = index;
		},

		alertModal (message) {
			vm.showAlertModal = true;
			vm.message = message;
		},

		setAlertMsg (msg) {
      	vm.message = msg;
    },

    closeMsg () {
    	vm.showAlertModal = false;
      	vm.message = '';
    },

    edit (payIndex, index) {
    	_.each(vm.hdData.payComponents, function (component) {
    		if (component.payIndex == payIndex) {
    			vm.payIndex = component.payIndex;
    			vm.payMainConfig = component.payMainConfig;
    			vm.productCompnents = component.productCompnents;
    		}
    	});

    	vm.currentSelectedComponentIndex = index;
    	vm.currentTabIndex = 2;

			vm.showEditPayComponentModal = true;
			vm.addOrUpdatePayComponentFlag = 'update';
			vm.showEditWrap = true;
    },

    remove (payIndex) {
    	vm.hdData.payComponents = _.filter(vm.hdData.payComponents, function (component) {
    		return component.payIndex != payIndex;
    	});
    	// vm.saveHdData();
			service.deletePayFromHd({hdIndex: vm.hdIndex, payIndex: payIndex});
    },

    add () {
    	resetEditPayComponentData();
    	// vm.currentSelectedComponentIndex = -1;
    	vm.showEditWrap = true;
    	// vm.currentTabIndex = 2;
			vm.addOrUpdatePayComponentFlag = 'add';
			vm.showEditPayComponentModal = true;
    },

		save () {
			if (!checkValid()) return false;

			var sendData = getFormatPayConfig();

			// id标志，区分新建和保存
			// vm.payIndex.modId = sendData.modId = Math.round(Math.random() * 10000);
			sendData.payIndex = -1;

			vm.alertModal();
			service.addPayForHd(sendData).then(function (rsp) {
				var json = rsp.data;

				if (json.result) {
					vm.payIndex = json.data.payIndex;

					// 保存后台生成的actid和productId
					service.getHdDetail(vm.hdIndex).then(function (rsp) {
						var hdDetailJson = rsp.data;
						var targetPayComponents = _.where(hdDetailJson.data.payComponents, {payIndex: json.data.payIndex});

						// actId
						vm.payMainConfig.actId = targetPayComponents[0].actId;
						vm.payMainConfig.productId = targetPayComponents[0].productId;

						// productId，可能有多个支付项，所以要循环
						// var $tabItems = $('.tab a');
						_.each(targetPayComponents[0].productCompnents, function (productCompnent, index) {
							// vm.productCompnents[index].productId = productCompnent.productId;
							vm.productCompnents.$set(index, productCompnent);
							log('vm.productCompnents[index].productId: ' + vm.productCompnents[index].productId);

							// if ($tabItems.eq(index + 1).find('span').length) {
 						// 		$tabItems.eq(index + 1).find('span').html('(' + productCompnent.productId + ')');
 						// 	} else {
 						// 		$tabItems.eq(index + 1).append('<span>(' + productCompnent.productId + ')</span>');
 						// 	}
						});

						vm.hdData.payComponents.push($.extend(true, {}, {
							payIndex: vm.payIndex,
							payMainConfig: vm.payMainConfig,
							productCompnents: vm.productCompnents
						}));
						vm.currentSelectedComponentIndex = vm.hdData.payComponents.length - 1;

						vm.saveHdData();
						vm.setAlertMsg('创建成功！');
						vm.addOrUpdatePayComponentFlag = 'update';
					});

				} else {
					vm.setAlertMsg(JSON.stringify(json.data))
				}
			});

			log(sendData);
		},

		update () {
			if (!checkValid()) return false;

			var sendData = getFormatPayConfig();

			// id标志，区分新建和保存
			// sendData.modId = vm.payIndex.modId;
			sendData.payIndex = vm.payIndex;

			vm.alertModal();
			service.updatePayProductsInfo(sendData).then(function (rsp) {
				var json = rsp.data;

				if (json.result) {
					vm.payIndex = json.data.payIndex;
					// 保存后台生成的actid和productId
					service.getHdDetail(vm.hdIndex).then(function (rsp) {
						var hdDetailJson = rsp.data;
						var targetPayComponents = _.where(hdDetailJson.data.payComponents, {payIndex: json.data.payIndex});

						// actId
						vm.payMainConfig.actId = targetPayComponents[0].actId;

						// productId，可能有多个支付项，所以要循环
						_.each(targetPayComponents[0].productCompnents, function (productCompnent, index) {
							vm.productCompnents.$set(index, productCompnent);
						});

						console.log($('.tab .active').html());

						vm.setAlertMsg('更新成功！');
					});
				} else {
					vm.setAlertMsg(JSON.stringify(json.data))
				}
			}, function () {
				vm.setAlertMsg('接口出错了');
      });

			log(sendData);
		},

		saveHdData () {
			vm.hdData.index = vm.hdIndex;

			service.saveItem(vm.hdData).then(function (rsp) {
	      console.log(rsp);
	    });
		},

		addProductCompnent () {
			vm.addOrUpdateProductComponentFlag = 'add';
			vm.currentEditProductCompnent = getDefaultData().productCompnents[0];
			vm.showEditProductCompnentModal = true;
		},

		addGift () {
			if (!vm.currentEditProductCompnent.gifts) vm.currentEditProductCompnent.gifts = [];
			vm.currentEditProductCompnent.gifts.push($.extend(true, {}, vm.editGiftInfo));
			vm.editGiftInfo.pid = '';
		},

		deleteGift (gift) {
			vm.currentEditProductCompnent.gifts.$remove(gift);
		},

		addLotteryInfo () {
			if (!vm.currentEditProductCompnent.lotteryInfos) vm.currentEditProductCompnent.lotteryInfos = [];
			vm.currentEditProductCompnent.lotteryInfos.push($.extend(true, {}, vm.editLotteryInfo));
		},

		deleteLotteryInfo (lotteryInfo) {
			vm.currentEditProductCompnent.lotteryInfos.$remove(lotteryInfo);
		},

		toggleShowPayComponentList () {
			vm.showPayComponentList = !vm.showPayComponentList;

			if (vm.toggleBtnText == '-') {
				vm.toggleBtnText = '+';
				vm.contentHeight += 100;
			} else {
				vm.toggleBtnText = '-';
				vm.contentHeight -= 100;
			}
		},

		deleteProductCompnent (productCompnents, productCompnent, tabIndex) {
			productCompnents.$remove(productCompnent);
			vm.selectTab(tabIndex - 1);
		},

		openEditProductComponent (productCompnent) {
			vm.addOrUpdateProductComponentFlag = 'update';
			vm.showEditProductCompnentModal = true;
			vm.currentEditProductCompnent = productCompnent;
		},

		deleteProductComponent (productCompnent) {
			vm.productCompnents.$remove(productCompnent);
		},

		saveProductCompnent () {
			if (vm.addOrUpdateProductComponentFlag == 'add') {
				if (!checkCurrentEditProductComponentValid()) {
					return false;
				}
				if (!vm.productCompnents) vm.productCompnents = [];
				vm.productCompnents.push($.extend(true, {}, vm.currentEditProductCompnent));
				vm.addOrUpdateProductComponentFlag == 'update';
			}

			vm.closeEditProductCompnentModal();
		}
	}
}

function getFormatPayConfig() {
	var result = {};

	// 支付组件配置
	_.each(vm.payMainConfig, function (value, key) {
		if (getDefaultData().payMainConfig.hasOwnProperty(key)) {
				result[key] = vm.payMainConfig[key];
		}
	});

	// 支付项
	_.each(vm.productCompnents, function (productCompnent, compnentIndex) {
		_.each(productCompnent, function (compnentValue, compnentKey) {
			var productCompnentsPosition = 'productCompnents[' + compnentIndex + ']';

			if (compnentKey == 'innerDesc') {
					// 改动支付数据时
					if (vm.hdData.component.payButton) {
						_.each(vm.hdData.component.payButton, function (payButtonItem, id) {
							if (productCompnent.productId == payButtonItem.productId) {
								_.each(vm.hdData.payComponents, function (payComponent, key) {
									if (payComponent.payIndex == payButtonItem.selectedPayComponent.payIndex) {
										 payButtonItem.selectedPayComponent = payComponent;
										 payButtonItem.text = payButtonItem.productCompnentDesc = productCompnent.innerDesc;
										 $('#' + payButtonItem.id).find('.text').text(payButtonItem.text);
									}
								});
							}
						});
					}
			}

			if (compnentKey == 'gifts') {
				_.each(compnentValue, function (giftItem, giftIndex) {
					_.each(giftItem, function (giftValue, giftKey) {
						if (giftItem.pid) {
							// result[productCompnentsPosition + '.gifts[' + giftIndex + '].' + giftKey] = giftValue || 0;
							if (vm.editGiftInfo.hasOwnProperty(giftKey)) {
									result[productCompnentsPosition + '.gifts[' + giftIndex + '].' + giftKey] = giftValue;
							}
						}
					});
				});
			} else if (compnentKey == 'lotteryInfos') {
				_.each(compnentValue, function (lotteryInfosItem, lotteryInfosIndex) {
					_.each(lotteryInfosItem, function (lotteryInfosValue, lotteryInfosKey) {
						if (lotteryInfosItem.webLotteryId) {
							// result[productCompnentsPosition + '.lotteryInfos[' + lotteryInfosIndex + '].' + lotteryInfosKey] = lotteryInfosValue || 0;
							if (vm.editLotteryInfo.hasOwnProperty(lotteryInfosKey)) {
									result[productCompnentsPosition + '.lotteryInfos[' + lotteryInfosIndex + '].' + lotteryInfosKey] = lotteryInfosValue;
							}
						}
					});
				});
			} else {
				// result[productCompnentsPosition + '.' + compnentKey] = compnentValue || 0;
				console.log(productCompnentsPosition + '.' + compnentKey);
				result[productCompnentsPosition + '.' + compnentKey] = compnentValue;
			}
		});
	});

	// 其他数据
	result.hdIndex = vm.hdIndex;
	result.actVersion = 0;

	return result;
}

function getDefaultData() {
	// return {
	//  payIndex: ''
	// 	payMainConfig: {
	// 		title: '支付组件2',
	// 		type: '1',
	// 		subTitle: '1',
	// 		payDesc: '1',
	// 		chargeLimit: 'true',
	// 		chargeType: '',
	// 		lotteryTotalCountLimit: '',
	// 		totalGiftLimitTimes: '',
	// 		actId: '',
	// 		chargeType: 1
	// 	},
	// 	productCompnents: [{
	// 		keyEx: '-1',
	// 		key: '1',
	// 		price: '1',
	// 		name: '1',
	// 		innerDesc: '99元套餐',
	// 		lotteryEl: '',
	// 		lotteryCountLimit: '',
	// 		gifts: [{
	// 			uidLimitTimes: '',
	// 			giftType: '1',
	// 			pid: ''
	// 		}],
	// 		lotteryInfos: [{
	// 			releaseActId: '',
	// 			releaseType: 1,
	// 			webLotteryId: '',
	// 			diamondGrade: '',
	// 			isDiamond: '',
	// 			uidLimitTimes: '',
	// 			prizeNumEachTime: '',
	// 			recvGiftLimit: '',
	// 			timeToSntGift: '',
	// 			vipGrade: '',
	// 			isVip: ''
	// 		}]
	// 	}]
	// };
	return {
		payIndex: '',
		payMainConfig: {
			title: '',
			type: '1',
			subTitle: '',
			payDesc: '',
			chargeLimit: 'true',
			lotteryTotalCountLimit: '',
			totalGiftLimitTimes: '',
			actId: '',
			chargeType: '1'
		},
		productCompnents: [{
			keyEx: '-1',
			key: '1', // 页面不显示
			price: '',
			name: '',
			innerDesc: '',
			lotteryEl: '',
			lotteryCountLimit: '',
			gifts: [],
			lotteryInfos: []
		}]
	};
}

function resetEditPayComponentData() {
	vm.payIndex = getDefaultData().payIndex;
	vm.payMainConfig = getDefaultData().payMainConfig;
	vm.productCompnents = [];
}

function isValid() {
	var payMainConfig_valid = true;
	var productCompnentsConfig_valid = true;

	payMainConfig_valid = _.every(vm.payMainConfig, function (value, key) {
		if (['title', 'type', 'subTitle', 'payDesc'].indexOf(key) != -1) {
			return !!value;
		}
		return true;
	});


	_.each(vm.productCompnents, function (productCompnent, compnentIndex) {
		productCompnentsConfig_valid = productCompnentsConfig_valid && _.every(productCompnent, function (value, key) {
			if (['price', 'name'].indexOf(key) != -1) {
				return !!value;
			}
			return true;
		});
	});

	return productCompnentsConfig_valid && payMainConfig_valid;
}

function checkValid() {
	if (isValid()) {
		return true;
	} else {
		vm.alertModal();
		vm.setAlertMsg('请输入所有必填项（支付组件配置和支付项）');
	}
}

function checkCurrentEditProductComponentValid() {
	var checkJson = vm.currentEditProductCompnent;
	var desc = '';

	if (checkJson.price && checkJson.name && checkJson.gifts.length > 0) {
		return true;
	}

	if (!checkJson.price) {
		desc = '价格';
	} else if (!checkJson.name) {
		desc = '商品名称';
	} else if (!checkJson.gifts.length > 0) {
		desc = '赠品';
	}

	vm.alertModal(desc + '不能为空');
}

</script>

<style scoped lang="stylus">
.payContent {
	text-align: center;
	.payTitle {
		font-size: 14px;
		text-align: left;
		color: #838383;
		background: #E9EAED;
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
		font-weight: bold;
		height: 26px;
		line-height: 26px;
		text-indent: 10px;
		border-radius: 4px;
		margin: 4px 0 8px;
	}
	.addBtnWrap {
		min-height: 84px;
		.addBtn {
			overflow: hidden;
			background: #F1B62A;
			border: 1px solid #F1B62A;
			color: #fff;
			border-radius: 3px;
			margin-top: 20px;
			font-size: 14px;
			padding: 0 10px;
			height: 40px;
			line-height: 40px;
			font-weight: normal;
			text-decoration: none;
		}
	}
	.addBtn {
		display: block;
		overflow: hidden;
		background: #F1B62A;
		border: 1px solid #F1B62A;
		color: #fff;
		border-radius: 3px;
		margin-top: 20px;
		font-size: 14px;
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		font-weight: normal;
		text-decoration: none;
	}
	.editWrap {
		/*padding-top: 20px;*/
		overflow: auto;
	}
	.payComponentList {
		margin: 10px 0 4px;
		ul {
			float: left;
			min-height: 84px;
			margin-bottom: 0;
		}
		.payComponent {
			margin-right: 20px;
			margin-bottom: 10px;
			float: left;
		}
		.info {
			min-width: 150px;
			height: 48px;
			padding: 6px 24px;
			border: 1px solid #DDDDDD;
			font-size: 12px;
			overflow: hidden;
			&.active {
				border-color: #5CB85C;
				background: #5CB85C;
				color: #fff;
			}
		}
		.btn-wrap {
			margin-top: 3px;
		}
		.toggleBtn {
			padding: 1px 11px;
			background: #F1B62A;
			position: absolute;
			top: 3px;
    	right: 0px;
    	border-radius: 5px;
    	color: #fff;
    	font-size: 18px;
		}
	}
	.tabWrap {
		.subTab {
			margin-top: 10px;
		}
		.tab {
			float: left;
			border: 1px solid #ddd;
			li {
				float: left;
				a {
					display: block;
					padding: 10px 20px;
					color: #676A6C;
					cursor: pointer;
					text-decoration: none;
					position: relative;
					&.active {
						background: #5CB85C;
						color: #fff;
					}
					.deleteProductCompnentBtn {
						display: none;
						position: absolute;
						top: 0;
						right: 2px;
				    color: red;
				    line-height: 1;
				    font-size: 14px;
				    padding: 2px 4px;
					}
					&:hover {
						.deleteProductCompnentBtn {
							display: block;
						}
					}
				}
				.addBtn {
					height: 40px;
					padding: 0 10px;
					background: #F1B62A;
					color: #fff;
					font-size: 14px;
					line-height: 40px;
				}
			}
		}
	}
	.tabContentList {
		/*max-height: 550px;*/
	}
	.tabConentItem {
		color: #676a6c;
		.col {
			width: 50%;
			p {
				float: right;
				margin: 0 0;
			}
			&.left {
				float: left;
				border-right: 1px solid #ddd;
				p {
					margin-right: 50px;
				}
			}
			&.right {
				float: right;
				p {
					margin-right: 105px;
				}
			}
		}
		label {
			padding: 5px 10px;
			margin-bottom: 2px;
			text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
			border-top-left-radius: 3px;
    		border-bottom-left-radius: 3px;
    		&.required::before {
    			content: '*';
    			color: red;
    		}
		}
		input {
			width: 136px;
			padding: 0 5px;
		}
		select {
			width: 136px;
		}
		.section {
			margin-bottom: 20px;
			background: #fff;
			border-radius: 5px;
			/*border: 1px solid #ddd;*/
			h3 {
				background: #FAFAFA;
				color: #838383;
				margin: 0;
				font-size: 16px;
				padding: 10px 0;
				border-bottom: 1px solid #EEEEEE;
				text-align: left;
				text-indent: 12px;
			}
			.item {
				border: 1px solid #EEEEEE;
				margin: 20px 146px;
				padding: 20px 10px;
				&.item-send {
					margin-top: 20px;
					margin-bottom: 20px;
					position: relative;
					.title {
						position: absolute;
						top: -29px;
						left: -1px;
						padding: 4px 10px;
						background: #5CB85C;
						color: #fff;
					}
					.deleteBtn {
						position: absolute;
						top: -20px;
						right: -1px;
						padding: 0px 6px;
						background: #D9534F;
						color: #fff;
						cursor: pointer;
					}
				}
			}
			.btn-add {
				/*margin-top: 20px;*/
				/*margin-bottom: 20px;*/
			}
			table {
				margin-top: 5px;
			}
		}
		.btn-wrap {
			margin-top: 5px;
			padding-bottom: 10px;
			border-bottom: 1px solid #e5e5e5;
			button {
				margin-right: 10px;
			}
		}
	}
	.btnWrap {
		margin-top: 20px;
	}
}
table {
	width: 38%;
	margin: 0 auto 8px;
	&.sub-table {
			width: 38%;
	}
	&.table-list {
		float: left;
		width: 28%;
		margin-right: 5px;
		&.sub-table {
				width: 22%;
		}
		&.lottery-table {
			width: 70%;
		}
	}
	&.lottery-table {
		width: 70%;
	}
	th {
    text-align: center;
  }
  td {
    font-size: 12px;
    white-space: nowrap;
  }
  .btn-xs {
    padding: 1px 2px;
  }
}
.btn-right {
	float: right;
	margin-left: 10px;
}
</style>
