<template>
	<div class="main-mask" @click="hiddenAllBtnMenu()">
		<!-- 头部 -->
		<div class="header">
			<div class="btn-wrap">
				<div class="create-wrap text-center">
					<div @click.stop="toggleBtnMenu(0)" class="btnMenu btn btn-success btn-sm">榜单组件
						<div class="menuList" v-if="showBtnMenu[0]">
							<p>
								<button @click="createRank" class="btn btn-success btn-sm">新建榜单</button>
							</p>
						</div>
					</div>

					<div @click.stop="toggleBtnMenu(1)" class="btnMenu btn btn-success btn-sm">支付组件
						<div class="menuList" v-if="showBtnMenu[1]">
							<p>
								<button @click="openPayModal" class="btn btn-success btn-sm">支付配置</button>
							</p>
							<p>
								<button @click="createPayButton" class="btn btn-success btn-sm">支付按钮</button>
							</p>
							<p>
								<button @click="createGiftRecord" class="btn btn-success btn-sm">礼品列表</button>
							</p>
						</div>
					</div>
					<div @click.stop="toggleBtnMenu(2)" class="btnMenu btn btn-success btn-sm">背景
						<div class="menuList" v-if="showBtnMenu[2]">
							<p>
								<button @click="openUploadModal" class="btn btn-success btn-sm">上传背景</button>
							</p>
							<p>
								<button @click="showBackgroundColorModal = true" class="btn btn-success btn-sm">背景颜色</button>
							</p>
							<p>
								<button @click="createBanner" class="btn btn-success btn-sm">banner</button>
							</p>
						</div>
					</div>
				</div>
				<div class="file-edit-wrap">
					<button @click.stop="preview" class="btn btn-success btn-sm">预览</button>
					<button @click.stop="save('showStatus')" class="btn btn-success btn-sm">保存</button>
					<button @click.stop="release" class="btn btn-success btn-sm">发布</button>
					<button class="btn btn-danger btn-sm">退出</button>
				</div>
			</div>
		</div>

		<!-- 操作区 -->
		<div class="modal-container">
			<div class="h5-title">
				编辑区域高度是286px，高度是<input class="heightInput" type="text" v-model="pageHeight">
			</div>
			<div class="h5-container">

				<img class="phone-header" src="http://file.do.yy.com/group3/M00/CC/55/tz0GSFcHgBmADg4KAAAUmSWgmSE098.png" alt="">
				<div class="h5-content">
					<div class="content-wrap" v-bind:style="{backgroundColor: backgroundColor, height: pageHeight.indexOf('%') == -1 ? pageHeight + 'px' : pageHeight}">
						<img class="bg" v-if="singleBgUrl" v-bind:src="singleBgUrl">

						<div v-if="showLoading">
							<div class="loadingWrap">
								<loading></loading>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 侧边栏 -->
		<div class="edit-component-wrap edit-wrap" v-show="showEditWrap">
			<h2>属性</h2>
			<div class="edit-wrap-content">
				<p v-if="showEditWrapItem.productId">
					<label>支付组件:</label>
					<select v-model="editWrapItem.currentSelectedPayComponent">
						<option value="myGiftRecord"
										v-for="payComponent in hdData.payComponents"
										v-bind:value="payComponent">
							{{ payComponent.payMainConfig.title }}
						</option>
						<!-- <option v-if="hdData.payComponents.length == 0" selected disabled>还没有组件</option> -->
					</select>
				</p>

				<p v-if="showEditWrapItem.productId && editWrapItem.currentSelectedPayComponent">
					<label>支付项</label>
					<select v-model="editWrapItem.productId">
						<option value="myGiftRecord"
										v-for="productCompnent in editWrapItem.currentSelectedPayComponent.productCompnents"
										v-bind:value="productCompnent.productId">
							{{ productCompnent.name }}
						</option>
					</select>
				</p>
				<p v-if="showEditWrapItem.actId">
					<label>actId:</label><input type="text" v-model="editWrapItem.actId">
				</p>
				<p v-if="showEditWrapItem.href">
					<label>链接:</label><input type="text" v-model="editWrapItem.href">
				</p>
				<!-- <p v-if="showEditWrapItem.script">
					<label>脚本:</label><input type="text" v-model="editWrapItem.script">
				</p> -->
				<p v-if="showEditWrapItem.url">
					<label>图片链接:</label><input type="text" v-model="editWrapItem.url">
				</p>
				<p v-if="showEditWrapItem.text">
					<label>文本:</label><input type="text" v-model="editWrapItem.text">
				</p>
				<p v-if="showEditWrapItem.style.width">
					<label>宽度:</label><input type="text" v-model="editWrapItem.style.width">
				</p>
				<p v-if="showEditWrapItem.style.height">
					<label>高度:</label><input type="text" v-model="editWrapItem.style.height">
				</p>
				<p v-if="showEditWrapItem.style.top">
					<label>top:</label><input type="text" v-model="editWrapItem.style.top">
				</p>
				<p v-if="showEditWrapItem.style.left">
					<label>left:</label><input type="text" v-model="editWrapItem.style.left">
				</p>
				<p v-if="showEditWrapItem.rankImgWidth">
					<label>头像宽度:</label><input type="text" v-model="editWrapItem.rankImgWidth">
				</p>
				<p v-if="showEditWrapItem.borderColor">
					<label>边框颜色:</label><input type="text" v-model="editWrapItem.borderColor">
				</p>
				<p v-if="showEditWrapItem.style.color">
					<label>字体颜色:</label><input type="text" v-model="editWrapItem.style.color">
				</p>
				<p v-if="showEditWrapItem.style.background">
					<label>背景颜色:</label><input type="text" v-model="editWrapItem.style.background">
				</p>
				<p v-if="showEditWrapItem.style.borderRadius">
					<label>圆角:</label><input type="text" v-model="editWrapItem.style.borderRadius">
				</p>
				<p v-if="showEditWrapItem.style.fontSize">
					<label>字体大小:</label><input type="text" v-model="editWrapItem.style.fontSize">
				</p>
				<p v-if="showEditWrapItem.column_1_percentage">
					<label>第一列:</label><input type="text" v-model="editWrapItem.column_1_percentage">
				</p>
				<p v-if="showEditWrapItem.column_2_percentage">
					<label>第二列:</label><input type="text" v-model="editWrapItem.column_2_percentage">
				</p>
				<p class="text-center">
					<button class="btn btn-default" v-on:click="centerBtn">居中</button>
					<button class="btn btn-default" v-on:click="copyComponent">复制</button>
					<button class="btn btn-danger" v-on:click="deleteComponent">删除</button>
				</p>
			</div>
		</div>

		<!-- 编辑区域 -->
		<div class="edit-multiPage-wrap edit-wrap">
			<h2>页面</h2>
			<div class="edit-wrap-content">
				<p v-for="item in pageArray" track-by="$index">
					<a href="javascript:;" class="btn btn-success" v-bind:class="{selected: ($index + 1) == currentPage}" @click="selectPage($index + 1)">页面{{ $index + 1 }}</a>
				</p>
				<p v-if="pageCount > 1">
					引导图标颜色：<input class="guide-color-input" type="text" v-model="guideColor">
				</p>
				<p class="add-or-sub-btn-wrap">
					<a href="javascript:;" class="btn btn-success" @click="addPage">+</a>
					<a href="javascript:;" class="btn btn-success" @click="subPage">-</a>
				</p>
			</div>
		</div>
	</div>

	<upload-modal
		:show.sync="showUploadModal"
		:close.sync="closeUploadModal"
		:upload-callback.sync="uploadCallback">
	</upload-modal>

	<!-- 背景颜色浮层 -->
	<background-modal
		:show.sync="showBackgroundColorModal"
		:close.sync="closeBackgroundColorModal"
		:background-color.sync="backgroundColor">
	</background-modal>

	<!-- 二维码浮层 -->
	<qr-modal
    :show.sync="showQR"
    :close.sync="closeQR",
    :show-img.sync="showQRImg">
  </qr-modal>

	<!-- 支付组件浮层 -->
	<pay-modal
    :show.sync="showPayModal"
    :hd-index.sync="hdIndex",
    :hd-data.sync="hdData">
  </pay-modal>

	<!-- 弹窗浮层 -->
  <alert-modal
    :show.sync="showAlertModal"
    :message.sync="message">
  </alert-modal>
</template>

<script>
var _ = require('underscore');
var VueFileUpload = require('vue-file-upload');

import service from '../service';
import workspaceDefaultData from '../defaultData/workspace';
import modal from '../components/modal.vue';
import loading from '../components/loading.vue';
import payModal from '../components/paymodal.vue';
import alertModal from '../components/alertmodal.vue';
import rankModal from '../components/rankmodal.vue';
import uploadModal from '../components/uploadmodal.vue';
import backgroundModal from '../components/backgroundmodal.vue';
import qrModal from '../components/qrmodal.vue';

var vm; // v-model
var $contentWrap;

export default {
	components: {
  	modal,
  	loading,
  	payModal,
  	alertModal,
		uploadModal,
		backgroundModal,
		qrModal
  },

	data () {
		return workspaceDefaultData.initVmData;
	},

	computed: {
		clearHdData () {
			return $.extend(true, {}, vm.hdData);
		},

		pageArray () {
			return new Array(Number(this.pageCount));
		}
	},

	ready () {
		vm = this;
		$contentWrap = $('.content-wrap');
	},

	// 监听编辑区属性的改变，然后更新dom样式并将数据储存到vm中
	watch: {
		'editWrapItem.style.width': function (val, old) {
			getCurrentComponentJQueryElement().css('width', val);
			saveComponentDataToVm('style.width', val);
		},

		'editWrapItem.style.height': function (val) {
			getCurrentComponentJQueryElement().css('height', val);
			saveComponentDataToVm('style.height', val);
			if (getCurrentSelectComponent().style.lineHeight) {
				getCurrentComponentJQueryElement().css('lineHeight', val + 'px');
				saveComponentDataToVm('style.lineHeight', val + 'px');
			}
		},

		'editWrapItem.style.top': function (val) {
			getCurrentComponentJQueryElement().css('top', val + 'px');
			saveComponentDataToVm('style.top', val);
		},

		'editWrapItem.style.left': function (val) {
			if (('' + val).indexOf('%') == -1) {
				val = Math.round(val);
				getCurrentComponentJQueryElement().css('left', val + 'px');
			} else {
				getCurrentComponentJQueryElement().css('left', val);
			}
			saveComponentDataToVm('style.left', val);
		},

		'editWrapItem.style.color': function (val) {
			getCurrentComponentJQueryElement().css('color', val);
			saveComponentDataToVm('style.color', val);
		},

		'editWrapItem.style.background': function (val) {
			getCurrentComponentJQueryElement().css('background', val);
			saveComponentDataToVm('style.background', val);
		},

		'editWrapItem.style.marginLeft': function (val) {
			getCurrentComponentJQueryElement().css('margin-left', val + 'px');
			saveComponentDataToVm('style.marginLeft', val);
		},

		'editWrapItem.style.borderRadius': function (val) {
			getCurrentComponentJQueryElement().css('border-radius', val + 'px');
			saveComponentDataToVm('style.borderRadius', val);
		},

		'editWrapItem.style.fontSize': function (val) {
			getCurrentComponentJQueryElement().css('font-size', val + 'px');
			saveComponentDataToVm('style.fontSize', val);
		},

		'editWrapItem.text': function (val) {
			getCurrentComponentJQueryElement().find('.text').text(val);
			saveComponentDataToVm('text', val);
		},

		'editWrapItem.responsibility': function (val) {
			saveComponentDataToVm('responsibility', val);
		},

		'editWrapItem.href': function (val) {
			saveComponentDataToVm('href', val);
		},

		'editWrapItem.script': function (val) {
			saveComponentDataToVm('script', val);
		},

		'editWrapItem.url': function (val) {
			getCurrentComponentJQueryElement().attr('src', val);
			saveComponentDataToVm('url', val);
		},

		'editWrapItem.menuItemList': function (val) {
			saveComponentDataToVm('menuItemList', _.uniq(getEditWrapItem().menuItemList));
		},

		'editWrapItem.rankImgWidth': function (val) {
			getCurrentComponentJQueryElement().find('img').css('width', val);
			saveComponentDataToVm('rankImgWidth', val);
		},

		'editWrapItem.borderColor': function (val) {
			getCurrentComponentJQueryElement().find('img').css('border-color', val);
			saveComponentDataToVm('borderColor', val);
		},

		'editWrapItem.column_1_percentage': function (val) {
			getCurrentComponentJQueryElement().find('td').eq(0).attr('width', val);
			saveComponentDataToVm('column_1_percentage', val);
		},

		'editWrapItem.column_2_percentage': function (val) {
			getCurrentComponentJQueryElement().find('td').eq(1).attr('width', val);
			saveComponentDataToVm('column_2_percentage', val);
		},

		'editWrapItem.currentSelectedPayComponent': function (val) {
			if (val) {
				console.log(val.payIndex);
				console.log($.extend(true, {}, _.where(vm.hdData.payComponents, {payIndex: val.payIndex})[0]));
				saveComponentDataToVm('selectedPayComponent', _.where(vm.hdData.payComponents, {payIndex: val.payIndex})[0]);
			}
		},

		// 'editWrapItem.currentSelectedRankComponent': function (val) {
		// 	if (val) {
		// 		console.log(val.payIndex);
		// 		console.log($.extend(true, {}, _.where(vm.hdData.rankComponents, {payIndex: val.payIndex})[0]));
		// 		saveComponentDataToVm('selectedRankComponent', _.where(vm.hdData.rankComponents, {payIndex: val.payIndex})[0]);
		// 	}
		// },

		'editWrapItem.productId': function (val) {
			if (getCurrentSelectComponent().category != 'payButton') return false;

			if (getEditWrapItem().currentSelectedPayComponent) {
				_.each(getEditWrapItem().currentSelectedPayComponent.productCompnents, function (productCompnent) {
					if (productCompnent.productId == val) {
						getEditWrapItem().text = productCompnent.name;
						// console.log('productCompnent.name: ' + productCompnent.name);
					}
				});
			}

			saveComponentDataToVm('productId', val);

			if (getEditWrapItem().currentSelectedPayComponent) {
				_.each(getEditWrapItem().currentSelectedPayComponent.productCompnents, function (productCompnent) {
					if (productCompnent.productId == val) {
						saveComponentDataToVm('productCompnentDesc', productCompnent.name);
					}
				});
			}
		},

		'editWrapItem.actId': function (val) {
			saveComponentDataToVm('actId', val);
		}
	},

	methods: {
		/*
     ***************************************************************************************************
     * 创建组件
     ***************************************************************************************************
     */
		createCustomButton () {
			createComponent('customButton', getComponentDefaultData('customButton'));
		},

		createPayButton () {
			createComponent('payButton', getComponentDefaultData('payButton'));
		},

		createGiftRecord () {
			createComponent('giftRecord', getComponentDefaultData('giftRecord'));
		},

		createMenuButton () {
			createComponent('menuButton', getComponentDefaultData('menuButton'));
		},

		createBanner () {
			createComponent('banner', getComponentDefaultData('banner'));
		},

		createRank () {
			var rankGroup = {
				rank: getComponentDefaultData('rank'),
				rank_spec_number1: getComponentDefaultData('rank_spec_number1'),
				rank_spec_number2: getComponentDefaultData('rank_spec_number2'),
				rank_spec_number3: getComponentDefaultData('rank_spec_number3')
			}

			var rankGroupName = 'rankGroup_' + Math.round(Math.random() * 10000);
			rankGroup.rank.rankGroupName = rankGroupName;
			rankGroup.rank_spec_number1.rankGroupName = rankGroupName;
			rankGroup.rank_spec_number2.rankGroupName = rankGroupName;
			rankGroup.rank_spec_number3.rankGroupName = rankGroupName;

			// currentSelectedRankComponent = $.extend(true, {}, );

			createComponent('rank', rankGroup.rank);
			createComponent('rank_spec_number1', rankGroup.rank_spec_number1);
			createComponent('rank_spec_number2', rankGroup.rank_spec_number2);
			createComponent('rank_spec_number3', rankGroup.rank_spec_number3);
		},

		/*
     ***************************************************************************************************
     * 保存、预览、发布
     ***************************************************************************************************
     */

		// 保存
		save (showStatus) {
			// 保存背景图片
			if (!vm.hdData.pageStyle) vm.hdData.pageStyle = {};
			vm.hdData.pageStyle.singleBgUrl = vm.singleBgUrl;
			vm.hdData.pageStyle.backgroundColor = vm.backgroundColor;
			vm.hdData.pageStyle.pageHeight = vm.pageHeight;
			vm.hdData.pageStyle.pageCount = vm.pageCount;
			vm.hdData.pageStyle.guideColor = vm.guideColor;
			vm.hdData.index = vm.hdIndex;

			// log(vm.clearHdData);

			if (showStatus) vm.alertModal();
			service.saveItem(vm.hdData).then(function (rsp) {
				if (showStatus) {
					if (rsp.data.result) {
					  vm.setAlertMsg('保存成功！');
					} else {
						vm.setAlertMsg('保存失败！');
					}
				}
	    });

		},

		// 预览
		preview () {
			vm.save();

			vm.showQR = true;
			service.preview(vm.hdData).then(function (rsp) {
				if (!vm.hasCreate) {
					vm.hasCreate = true;
					var _previewUrl = 'http://' + window.location.host + '/mhdplatform/me/preview/' + vm.hdIndex + '/';
					new QRCode(document.getElementById("qrcode"), _previewUrl);
					$('#previewLocation').attr('href', _previewUrl);
					vm.showQRImg = true;
				}
			});

		},

		// 发布
		release () {
			vm.save();

			vm.alertModal();
			service.release(vm.hdData).then(function (rsp) {
				if (rsp.data.result) {
					vm.setAlertMsg('发布成功！<a href="http://page.vip.yy.com/me/hdplatform/' + vm.hdData.index + '" target="_blank">打开页面链接</a><p></p>');
				} else {
					vm.setAlertMsg(rsp.data.desc);
				}
			});
		},

		/*
     ***************************************************************************************************
     * 上传图片
     ***************************************************************************************************
     */

		// 图片上传回调函数
		uploadCallback (fileUrl) {
			vm.singleBgUrl = fileUrl;
		},

		/*
     ***************************************************************************************************
     * 打开、关闭各种浮层
     ***************************************************************************************************
     */

		// 打开支付组件浮层
		openPayModal () {
			vm.showPayModal = true;
		},

		// 打开上传图片浮层
		openUploadModal () {
			vm.showUploadModal = true;
		},

		// 关闭上传图片浮层
		closeUploadModal () {
			vm.showUploadModal = false;
		},

		// 打开排行榜配置浮层
 		openRankModal () {
 			vm.showRankModal = true;
 		},

		// 关闭设置背景颜色浮层
		closeBackgroundColorModal () {
			vm.showBackgroundColorModal = false;
		},

		// 关闭二维码浮层
		closeQR () {
			vm.showQR = false;
		},

		// alert浮层
		alertModal () {
			vm.showAlertModal = true;
			vm.message = '';
		},

		// 设置alert内容
		setAlertMsg (msg) {
      vm.message = msg;
    },

		/*
     ***************************************************************************************************
     * 左侧编辑区域功能
     ***************************************************************************************************
     */

		// 居中按钮
		centerBtn () {
			getEditWrapItem().style.left = '50%';
			getEditWrapItem().style.marginLeft = -getEditWrapItem().style.width / 2;
		},

		// 复制组件
		copyComponent () {
			var copyData = $.extend(true, {}, _.omit(vm.currentSelectComponent, '$element'));
			copyData.id = getUniqueRandomId(copyData.category);
			createComponent(copyData.category, copyData);
		},

		// 删除组件
		deleteComponent () {
			var thisComponentId = getCurrentSelectComponent().id;
			var thisComponentCategory = getCurrentSelectComponent().category;

			// 以group的形式删除组件
			var groupName = getCurrentComponentJQueryElement().data('group');
			console.log(groupName);
			if (groupName) {
				$('[data-group]').each(function (key, element) {
					var $element = $(element);
					if ($element.data('group') == groupName) {
						log(element.id)
						vm.hdData.component[$element.data('category')] = _.omit(vm.hdData.component[$element.data('category')], element.id);
						$(element).remove();
					}
				});

			// 以id的形式删除一个组件
			} else {
				vm.hdData.component[thisComponentCategory] = _.omit(vm.hdData.component[thisComponentCategory], thisComponentId);
				$('.component').each(function (index, element) {
					if (element.id == thisComponentId) {
						$(element).remove();
					}
				});
			}

			closeEditWrap();
		},

		/*
     ***************************************************************************************************
     * 菜单
     ***************************************************************************************************
     */

		// 显示当前菜单下拉框
		toggleBtnMenu (index) {
			if (!vm.showBtnMenu[index]) {
				vm.showBtnMenu = [];
			}

			vm.showBtnMenu.$set(index, !vm.showBtnMenu[index]);
		},

		// 隐藏所有菜单下拉框
		hiddenAllBtnMenu () {
			vm.showBtnMenu = [];
		},

		/*
     ***************************************************************************************************
     * 多页面编辑区
     ***************************************************************************************************
     */

		// 添加页面
		addPage () {
			vm.pageCount++;
		},

		// 删除页面
		subPage () {
			if (vm.pageCount == 1) return false;

			vm.pageCount--;
		},

		// 选择当前页面
		selectPage (index) {
			if (vm.currentPage == index) return false;

			vm.currentPage = index;
			$contentWrap.find('.component').remove();

			initComponent(vm.hdData);
		}
	},
	// 拿到根据路由后面的参数，去加载活动数据
	route: {
    data ({ to }) {
			service.getItem(to.params.id).then(function (rsp) {
				if (typeof rsp.data == 'string') {
          window.location.href = '/';
          return false;
        }
				vm.hdIndex = to.params.id;

				if (!rsp.data.component) rsp.data.component = {};
				rsp.data.payComponents = [];

	      vm.hdData = rsp.data;

				service.getHdDetail(to.params.id).then(function (_rsp) {
					// log('hdDetail: ');
					// log(_rsp.data);
					initVmPayComponents(_rsp.data.data.payComponents);
					initComponent(rsp.data);
		      initPage(rsp.data);
					bindUI();

					vm.showLoading = false;

					autoSave(5 * 60);
		    });
	    });
    }
  }
}

// 获取唯一ID
function getUniqueRandomId(category) {
	var ret = 0;
	if (vm.hdData.component[category]) {
		while (ret == 0 || vm.hdData.component[category][ret] ) {
			ret = Math.round(Math.random()*100000);
		}
	} else {
		ret = Math.round(Math.random()*100000);
	}
	return ret;
}

// 创建组件
function createComponent(tplName, data) {
	var $components = $(require('../../server/tpl/component/' + tplName + '.tpl')(data));
	// 绑定拖动事件并插到页面
	$components.draggable({
		start: function (event) {
			$(event.target).trigger('click');
		},
		stop: function( event, ui ) {
			getEditWrapItem().style.top = getCurrentComponentVmData().style.top = ui.position.top;
			getEditWrapItem().style.left = getCurrentComponentVmData().style.left = ui.position.left;
			fixMarginLeft();
		}
	}).appendTo($contentWrap);

	// 绑定拉伸事件
	$components.resizable({
		start: function (event) {
			$(event.target).trigger('click');
		},
		stop: function( event, ui ) {
			// console.log(ui);
			getEditWrapItem().style.width = getCurrentComponentVmData().style.width = ui.size.width;
			getEditWrapItem().style.height = getCurrentComponentVmData().style.height = ui.size.height;
		}
	});

	initCurrentComponentStyle();
	setCurrentSelectComponent(data, data.id, data.category);
	addComponentsDataToVm(data.category, data);
}

// 添加组件数据到vm的hdData.component中
function addComponentsDataToVm(category, dataObj) {
	if (!vm.hdData.component[category]) vm.hdData.component[category] = {};

	vm.hdData.component[category][dataObj.id] = dataObj;
}

// 保存某个属性到vm的hdData.component中
function saveComponentDataToVm(property, value) {
	var thisComponentVmData = getCurrentComponentVmData();

	if (!thisComponentVmData) return false;

	if (property == 'menuItemList') {
		thisComponentVmData['menuItemList'] = value.join();
	} else {
		if (property.includes('.')) {
			var propertyArr = property.split('.'); // 'style.width' -> ['style', 'width']
			thisComponentVmData[propertyArr[0]][propertyArr[1]] = value;
		} else {
			thisComponentVmData[property] = value;
		}
	}
}

// 获得组件初始值
function getComponentDefaultData(category) {
	var componentDefaultData = $.extend(true, {}, workspaceDefaultData.componentDefaultData);

	componentDefaultData[category]['category'] = category;
	componentDefaultData[category]['id'] = getUniqueRandomId(category);
	componentDefaultData[category]['page'] = vm.currentPage;

	return componentDefaultData[category];
}

// 初始化页面
function initComponent(data) {
	// 组件
	_.each(data.component, function (specificCategoryComponents, category) {
		_.each(specificCategoryComponents, function (component) {
			if (category == 'menuButton' || component.page == vm.currentPage) {
				createComponent(category, component);
			}
		});
	});
}

function initPage(data) {
	if (data.pageStyle) {
		vm.singleBgUrl = data.pageStyle.singleBgUrl;					// 背景图片
		vm.backgroundColor = data.pageStyle.backgroundColor;	// 背景颜色
		vm.pageHeight = data.pageStyle.pageHeight;						// 页面高度
		vm.pageCount = data.pageStyle.pageCount;							// 页数
		vm.guideColor = data.pageStyle.guideColor;						// 引导图标颜色
	}
}

// 绑定事件
function bindUI() {
	// 选中需要操作的组件
	$(document).on('click', function (event) {
		event.preventDefault(); // 阻止a锚点的跳转链接

		var $target = $(event.target);

		if ($target.hasClass('edit-wrap') || $target.closest('.edit-wrap').length > 0) return false;

		if (!$target.hasClass('component')) {
			$target = $target.closest('.component');
		}

		var id = $target.attr('id');
		var category = $target.data('category');

		if ($target && $target.hasClass('component')) {
			openEditWrap();
			setCurrentSelectComponent(vm.hdData.component[category][id], id, category);
			initEditWrap();
		} else {
			closeEditWrap();
		}
	});
}

// 初始化编辑区域
function initEditWrap() {
	// style
	var currentSelectComponentStyle = getCurrentSelectComponent().style;

	// 全部属性设置为隐藏
	_.each(vm.showEditWrapItem, function (value, property) {
		if (property == 'style') {
			_.each(value, function (styleValue, styleProperty) {
				vm.showEditWrapItem['style'][styleProperty] = false;
			});
		} else {
			vm.showEditWrapItem[property] = false;
		}
	});

	// 显示style
	_.each(currentSelectComponentStyle, function (value, styleProperty) {
		getEditWrapItem().style[styleProperty] = value;
		vm.showEditWrapItem.style[styleProperty] = true;
	});

	// 显示其他属性
	_.each(vm.currentSelectComponent, function (value, property) {
		if (property != 'style') {
			vm.editWrapItem[property] = value;
			vm.showEditWrapItem[property] = true;
		}
	});
}

/*
 ***************************************************************************************************
 * 操作组件
 ***************************************************************************************************
 */

// 初始化当前选中组件的样式
function initCurrentComponentStyle() {
	_.each(getCurrentSelectComponent().style, function (value, styleProperty) {
		getCurrentComponentJQueryElement().css(styleProperty, value);
	});
}

// 设置当前选中的组件
function setCurrentSelectComponent(data, elmentId, category) {

	vm.currentSelectComponent = {};

	getCurrentSelectComponent().$element = $('#' + elmentId);
	getCurrentSelectComponent().id = elmentId;
	getCurrentSelectComponent().category = category;

	// other
	_.each(data, function (value, property) {
		if (property == 'menuItemList') {
			getCurrentSelectComponent()['menuItemList'] = value.split(',');
			getCurrentSelectComponent()['menuItemList'];
		} else {
			getCurrentSelectComponent()[property] = value;
		}
	});

	if (category == 'payButton') {
		if (data.selectedPayComponent) {
			getEditWrapItem().currentSelectedPayComponent = $.extend(true, {}, _.where(vm.hdData.payComponents, {payIndex: data.selectedPayComponent.payIndex})[0]);
			getEditWrapItem().productId = data.productId;
		}	else {
		  getEditWrapItem().currentSelectedPayComponent = null;
			getEditWrapItem().productId = '';
		}
	}
}

// 设置当前选中的组件的vm数据
function getCurrentComponentVmData() {
	return vm.hdData.component[getCurrentSelectComponent().category][getCurrentSelectComponent().id];
}

// 获取当前选中的组件
function getCurrentSelectComponent() {
	return vm.currentSelectComponent;
}

// 获取当前选中组件的jQuery对象
function getCurrentComponentJQueryElement() {
	return getCurrentSelectComponent().$element;
}

// 将hdDetail中的支付组件数据格式化一下，存放到vm.hdData.payComponents
function initVmPayComponents(payComponents) {
	vm.hdData.payComponents = [];

	_.each(payComponents, function (payComponent) {
		// log('保存支付组件: ' + payComponent.payIndex);
		// log(payComponent);

		// payIndex
		var payIndex = payComponent.payIndex;

		// payMainConfig
		var payMainConfig = {
			actId: payComponent.actId,
			chargeLimit: payComponent.chargeLimit,
			chargeType: payComponent.chargeType,
			lotteryTotalCountLimit: payComponent.lotteryTotalCountLimit,
			payDesc: payComponent.payDesc,
			subTitle: payComponent.subTitle,
			title: payComponent.title,
			totalGiftLimitTimes: payComponent.totalGiftLimitTimes,
			type: payComponent.type,
			productId: payComponent.productId,
		}

		var productCompnents = payComponent.productCompnents;

		vm.hdData.payComponents.push({
			payIndex: payIndex,
			payMainConfig: payMainConfig,
			productCompnents: productCompnents
		});
	});
}

/*
 ***************************************************************************************************
 * 编辑区
 ***************************************************************************************************
 */

function getEditWrapItem() {
	return vm.editWrapItem;
}

// 显示编辑器
function openEditWrap() {
	vm.showEditWrap = true;
}

// 隐藏编辑器
function closeEditWrap() {
	vm.showEditWrap = false;
}

// 重置编辑器
function resetEditWrap() {

}

// fix居中
function fixMarginLeft() {
	var marginLeft = getCurrentComponentJQueryElement().css('margin-left');

	if (marginLeft != '' && marginLeft != 0) {
		getEditWrapItem().style.left += parseInt(marginLeft);
		getEditWrapItem().style.marginLeft = 0;
	}
}

// 自动保存
function autoSave(ms) {
	setInterval(function () {
		vm.save();
	}, ms * 1000);
}
</script>

<style lang="stylus">
.main-mask {
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 9998;
	background-color: rgba(0,0,0,.7);
	transition: opacity .3s ease;
	overflow-y: scroll;
	.header {
		height: 60px;
		background: #313649;
		color: #fff;
		.btn-wrap {
			position: relative;
			padding-top: 15px;
			z-index: 9999;
			.create-wrap {
				margin: 0 auto;
				.btnMenu {
					position: relative;
					.menuList {
						position: absolute;
						top: 44px;
						left: 50%;
						margin-left: -50px;
						width: 100px;
						background: #313649;
					}
				}
			}
			.file-edit-wrap {
				position: absolute;
				top: 15px;
				right: 15px;
			}
		}
	}
	.modal-container {
		position: relative;
		width: 322px;
		min-height: 577px;
		margin: 20px auto 0;
		.h5-title {
			position: absolute;
			top: -10px;
			text-align: center;
			width: 100%;
			color: #fff;
			.heightInput {
				width: 55px;
				margin-left: 2px;
				color: #000;
				padding: 2px;
				text-align: center;
			}
		}
		.h5-container {
			position: relative;
			top: 17px;
			left: 0;
			width: 100%;
			height: 660px;
			background: url(http://file.do.yy.com/group3/M00/CC/52/tz0MYFcHfOeAMNdJAAAjurY5-0E374.png) no-repeat;
			.phone-header {
				width: 284.5px;
				margin: 78px 0 0 19px;
				border-bottom: 4px solid #F6F8F7;
			}
			.h5-content {
				position: absolute;
				overflow-y: scroll;
				top: 126px;
			  left: 50%;
				width: 285.5px;
				height: 455px;
				background: #fff;
				border: 4px;
				margin-left: -142.5px;
				.content-wrap {
					position: relative;
					height: 454px;
					overflow: hidden;
			    .bg {
						width: 100%;
						position: absolute;
			    }
			    .banner {
			    	position: absolute;
			    	z-index: 2;
			    }

					// rank
					.spec-table-list-item {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 2;
					}
				}
				.workspace_content {
					width: 100%;
					height: 100%;
				}
				.loadingWrap {
					margin: 175px auto;
				}
			}
		}
	}
	.edit-wrap {
		position: absolute;
		top: 60px;
		height: 100%;
		background: #fff;
		h2 {
			margin: 0;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #fff;
			background: #5BC6D1;
			font-size: 16px;
		}
		.edit-wrap-content {
			padding: 15px 20px;
			p {
				margin-bottom: 10px;
			}
		}
		label {
			width: 70px;
			margin-right: 10px;
		}
		input {

		}
		.menuItem {
			margin-left: 80px;
		}
	}
	.edit-component-wrap {
		right: 0;
	}
	.edit-multiPage-wrap {
		left: 0;
		a {
			width: 230px;
			&.selected {
				background-color: #449d44;
    		border-color: #398439;
			}
		}
		.add-or-sub-btn-wrap {
			a {
				width: 113px;
			}
		}
		.guide-color-input {
			width: 130px;
		}
	}
}

#previewLocation {
	display: block;
	margin-top: 10px;
	text-align: center;
}
</style>
