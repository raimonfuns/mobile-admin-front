<template>
	<div>
		<div class="page">
			<div class="page-main" id="page-main">

				<router-view></router-view>

			</div>

			<div id="actionSheet_wrap">
		        <div class="weui_mask_transition" v-bind:class="{'weui_fade_toggle': showMenu}" id="mask" v-on:touchend="hideMenu"></div>
		        <div class="weui_actionsheet" v-bind:class="{'weui_actionsheet_toggle': showMenu}" id="weui_actionsheet">
		            <div class="weui_actionsheet_menu">
						{{ each menuList as v }}
							{{ if v == 'myGiftRecord' }}
								<a class="weui_actionsheet_cell" href="#!/myGiftRecord" v-on:click="hideMenu">奖品记录</a>
							{{ /if }}
							{{ if v == 'buyRecord' }}
								<a class="weui_actionsheet_cell" href="#!/buyRecord" v-on:click="hideMenu">购买记录</a>
							{{ /if }}
							{{ if v == 'receiveRecord' }}
								<a class="weui_actionsheet_cell" href="#!/receiveRecord" v-on:click="hideMenu">受赠记录</a>
							{{ /if }}
							{{ if v == 'index' }}
								<a class="weui_actionsheet_cell" href="#!/index" v-on:click="hideMenu">回到首页</a>
							{{ /if }}
						{{ /each }}
		            </div>
		            <div class="weui_actionsheet_action">
		                <div class="weui_actionsheet_cell" id="actionsheet_cancel" v-on:touchend="hideMenu">取消</div>
		            </div>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>

var vm;
export default {
	ready () {
		vm = this;
	},

	data () {
		return {
			showMenu: false,
			pageCount: {{ pageCount }},
			path: ''
		}
	},

	methods: {
		openMenu () {
			vm.showMenu = true;
		},

		hideMenu () {
			vm.showMenu = false;
		}
	}
}
</script>

<style lang="stylus">
.modalWrap {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.7);
	z-index: 9999;
	.modalWrapContent {
		position: absolute;
    width: 5rem;
    height: 5rem;
    background: #fff;
    left: 50%;
    margin-left: -2.5rem;
    top: 50%;
    margin-top: -2.5rem;
    border-radius: .2rem;
    padding: .5rem;
    box-sizing: border-box;
    .closeBtn {
			position: absolute;
			top: -.25rem;
			right: -0.3rem;
			width: .5rem;
			height: .5rem;
			line-height: .5rem;
			text-align: center;
			border-radius: 50%;
			background: #fff;
		}
	}
}


$color = #DFDCF8;

.page {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

/*字体大小*/
.page-main {
	width: 100%;
	height: 100%;
    .fontSize14 {
    	font-size: 14px;
    }
    .fontSize14 {
    	font-size: 16px;
    }
    .fontSize20 {
    	font-size: 20px;
    }
}

[data-dpr="2"] {
	.fontSize14 {
    	font-size: 24px;
    }
    .fontSize16 {
    	font-size: 32px;
    }
    .fontSize20 {
		font-size: 40px;
    }
	.page-main {
		.menu ul li a {
			font-size: 30px;
		}
	}
	.sweet-alert {
		button {
			font-size: 30px;
		}
		h2 {
			font-size: 34px;
		}
	}
	.combo-content .buy-btn {
		font-size: 26px;
		strong {
			font-size: 30px;
		}
	}
	.weui_actionsheet_cell {
		font-size: 36px;
	}
}

[data-dpr="3"] {
	.fontSize14 {
    	font-size: 42px;
    }
    .fontSize16 {
    	font-size: 48px;
    }
    .fontSize20 {
    	font-size: 64px;
    }
	.page-main {
		.menu ul li a {
			font-size: 50px;
		}
	}
	.sweet-alert {
		button {
			font-size: 50px;
		}
		h2 {
			font-size: 52px;
		}
	}
	.combo-content .buy-btn {
		font-size: 36px;
		strong {
			font-size: 42px;
		}
	}
	.weui_actionsheet_cell {
		font-size: 50px;
	}
}

/*用户相关页面*/
.user-content {
	color: #fff;
	.title {
		padding-top: 0.838rem;
		text-align: center;
	}
	.loading {
		position: absolute;
		margin-top: 5.455rem;
		text-align: center;
		width: 100%;
	}
	.record-list {
		height: 10.9375rem;
		margin-top: 0.4688rem;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		overflow-x: hidden;
		.record-list-item {
			margin: 0.2812rem 0.4688rem 0;
			border: 1px solid $color;
			padding: 0.3125rem 0.25rem;

			/*我的购买*/
			.pay-time {
				float: left;
			}
			.detail {
				float: right;
			}

			/*获赠记录，赠送记录，我的套餐*/
			.send-person {
				margin-top: 0.0312rem;
				text-decoration: underline;
			}
			.gift-content {
				margin-top: 0.125rem;
			}
			.status {
				margin-top: 0.2344rem;
			}
			.btn-wrap {
				margin-top: 0.2344rem;
				a {
					float: left;
					display: block;
					width: 3.125rem;
					line-height: 0.7812rem;
					text-align: center;
					color: #fff;
					margin-right: 0.1562rem;
					&.green-btn {
						background: #67DBA3;
					}
					&.blue-btn {
						background: #5BC6D1;
					}
				}
			}
			.send-yy-input {
				margin-top: 0.2344rem;
				padding: 0.3125rem 0.3906rem;
			}
		}
		.noticeMessage {
			margin-top: 5.025rem;
			text-align: center;
		}
	}
	.rule-wrap {
		margin: 0.4688rem 0.4688rem 0;
		border: 1px solid $color;
		padding: 0.3125rem 0.25rem;
	}
	.rule-list {
		list-style: inherit;
		list-style-type: decimal;
		list-style-position: outside;
		padding-left: .5125rem;
		li {
			list-style: inherit;
			margin-bottom: 0.1562rem;
		}
	}
}

/*清除浮动*/
.cl:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
.cl { zoom: 1; }
.clear {clear:both;display:inline;}

/*显示隐藏*/
.show{display:block;}
.hide{display:none;}

/*左右浮动*/
.fl,.z{float:left;}
.fr,.y{float:right;}

/*字体抗锯齿*/
.thin {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}

/*单行文字超出显示省略号*/
.ell {overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}

/*遮罩*/
.pop-mark {
	width:100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	opacity: .4;
	background-color: #000;
}

/*vue*/
[v-cloak] { display: none }

/*页面*/
.swipePage {
	width: 100%;
	height: 100%;
	position: absolute;
	overflow: hidden;
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}

/*页面内容*/
.swipePage-main {
	margin: 0 auto;
	width: 100%;
	height: 100%;
}

/*微信ui修改*/
#actionSheet_wrap {
	z-index: 99999;
}
.weui_actionsheet_cell {
	color: #666666;
	display: block;
}
.weui_actionsheet_action {
	margin-top: 0.0938rem;
}
.weui_actionsheet_cell {
	padding: 0.1562rem 0;
}
.weui_mask_transition {
	z-index: 100000;
}
.weui_fade_toggle {
	display: block !important;
}
.weui_actionsheet {
	z-index: 100001;
	-webkit-transform: translate(0, 105%);
	transform: translate(0, 105%);
}
.weui_actionsheet_toggle {
	-webkit-transform: translate(0, 105%);
	transform: translate(0, 0);
}

/*alert*/
.sweet-alert {
	box-sizing: border-box;
	width: 7rem;
	padding: 0.4125rem;
	left: 50%;
	margin-left: -(7/2)rem;
	button {
		margin-top: .4125rem;
		padding: .1262rem .4688rem;
	}
	h2 {
		font-size: 20px;
		margin: 0.125rem 0;
	}
}
</style>
