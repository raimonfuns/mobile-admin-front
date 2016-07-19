var workspaceDefaultData = {};

/*
 ************************************************************************************************
 * vm初始化数据
 ************************************************************************************************
 */
workspaceDefaultData.initVmData = {

  /*
   ****************
   * hdData
   ****************
   */
  hdData: {},													// 活动数据

  /*
   ****************
   * hdIndex
   ****************
   */
  hdIndex: 0,													// 活动id

  showToggle: {
    showLoading: true,									// loading
    showAlertModal: false,							// alert
    showEditWrap: false, 								// 是否显示编辑区域
    showUploadModal: false,							// 背景图片上传
    showBackgroundColorModal: false,		// 背景颜色
    showQR: false,							 				// 二维码弹窗
    showQRImg: false,										// 显示二维码
    showPayModal: false,								// 支付弹窗
    showRankModal: false,								// 榜单配置弹窗
    showBtnMenu: [],										// 下拉菜单
    showEditWrapItem: {									// 需要显示的样式属性
    	style: {
    		width: false,
    		height: false,
    		top: false,
    		left: false,
    		color: false,
    		background: false,
    		marginLeft: false,
    		borderRadius: false,
    		fontSize: false
    	},
    	text: false,
    	responsibility: false,
    	href: false,
    	script: false,
    	url: false,
    	menuItemList: false,
    	productId: false,
    	actId: false,
    	column_1_percentage: false,
    	column_2_percentage: false,

    	// rank
    	rankImgWidth: false,
    	borderColor: false,
    	rankConfig: {}
    }
  },

  /*
   ****************
   * alert
   ****************
   */
  message: '',												// alertMessage

  /*
   ****************
   * 编辑区域
   ****************
   */

  editWrapItem: {
  	style: {													// 编辑样式
  		width: 200,
  		height: 0,
  		top: 0,
  		left: 0,
  		color: '',
  		background: '',
  		marginLeft: 0,
  		borderRadius: 0,
  		fontSize: 0
  	},
  	text: '',
  	responsibility: [
  		'myGiftRecord',
  		'buyRecord',
  		'sendRecord',
  		'receiveRecord'
  	],
  	href: '',
  	script: '',
  	url: '',
  	menuItemList: '',
  	productId: 0,
  	actId: 0,
  	currentSelectedPayComponent: [],

  	// rank
  	rankImgWidth: 40,
  	rankImgHeight: 40,
  	column_1_percentage: 0,
  	column_2_percentage: 0,
  	borderColor: '#fff',
  },

  /*
   ****************
   * 当前选中的组件
   ****************
   */
  currentSelectComponent: {
  	id: 0,														// 当前选中的组件Id
  	$element: null,										// 当前选中的组件
  	style: {},												// 当前选中的组件样式
  	category: ''											// 当前选中的组件类型
  },

  /*
   ****************
   * 页面样式和属性
   ****************
   */
  pageParams: {
    singleBgUrl: '',                  // 背景图片
    backgroundColor: '',              // 背景颜色
    pageHeight: '100%',               // 页面高度
    guideColor: '#FEDD52',            // 遇到图标颜色
    pageCount: 1											// 页面数量
  },

  /*
   ****************
   * 二维码
   ****************
   */
  hasCreate: false,										// 是否已经生成过

  /*
   ****************
   * 多页面配置
   ****************
   */
  currentPage: 1,											// 当前页面

  /*
   ****************
   * 编辑区域
   ****************
   */
  currentSelectedPayComponent: null,		// 当前选择的支付组件，用于联动select

  /*
   ****************
   * 排行榜参数
   ****************
   */
  currentSelectedRankComponent: {}
}

/*
 ************************************************************************************************
 * 新建组件默认数据
 ************************************************************************************************
 */
workspaceDefaultData.componentDefaultData = {
	customButton: {
		style: {
			width: 100,
			height: 50,
			lineHeight: '50px',
			background: '#0af',
			color: '#fff',
			'text-align': 'center',
			top: 100,
			left: 100,
			marginLeft: 0,
			borderRadius: 0,
			fontSize: 12,
		},
		href: '',
		script: '',
		text: '自定义按钮',
		responsibility: 'default'
	},
	payButton: {
		style: {
			width: 100,
			height: 50,
			lineHeight: '50px',
			background: 'rgba(103, 153, 204, .5)',
			color: '#fff',
			'text-align': 'center',
			top: 100,
			left: 100,
			marginLeft: 0,
		},
		text: '支付按钮',
		productId: '1',
		productCompnentDesc: 'str'
	},
	giftRecord: {
		style: {
			width: 100,
			height: 50,
			lineHeight: '50px',
			background: 'rgba(103, 153, 204, .5)',
			color: '#fff',
			'text-align': 'center',
			top: 100,
			left: 100,
			marginLeft: 0,
		},
		text: '奖品记录',
		actId: ''
	},
	menuButton: {
		style: {
			width: 100,
			height: 50,
			lineHeight: '50px',
			background: '#0af',
			color: '#fff',
			'text-align': 'center',
			top: 100,
			left: 100,
			marginLeft: 0,
			borderRadius: 0,
			fontSize: 12,
		},
		text: '菜单',
		menuItemList: ''
	},
	banner: {
		style: {
			width: 100,
			top: 0,
			left: 0,
			marginLeft: 0
		},
		url: "http://file.do.yy.com/group3/M01/CC/95/tz0GSFcojfeAL_kSAAAGl8yrln4468.png"
	},
	rank_spec_number1: {
		style: {
			width: 50,
			background: 'rgba(0, 0, 0, 0)',
			color: '#4F4621',
			top: 0,
			left: '50%',
			marginLeft: -25
		},
		borderColor: '#FED743',
		selectedRankComponent: {}
	},
	rank_spec_number2: {
		style: {
			width: 50,
			background: 'rgba(0, 0, 0, 0)',
			color: '#4F4621',
			top: 30,
			left: 25,
			marginLeft: 0
		},
		borderColor: '#FED743',
		selectedRankComponent: {}
	},
	rank_spec_number3: {
		style: {
			width: 50,
			background: 'rgba(0, 0, 0, 0)',
			color: '#4F4621',
			top: 30,
			left: 210,
			marginLeft: 0
		},
		borderColor: '#FED743',
		selectedRankComponent: {}
	},
	rank: {
		style: {
			width: 245,
			height: 325,
			background: 'rgba(0, 0, 0, 0)',
			color: '#4F4621',
			top: 134,
			left: '50%',
			marginLeft: '-122.5'
		},
		rankImgWidth: 30,
		column_1_percentage: '18%',
		column_2_percentage: '64%',
		borderColor: '#FED743',
		selectedRankComponent: {}
	}
}

export default workspaceDefaultData
