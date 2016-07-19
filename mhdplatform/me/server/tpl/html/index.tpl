<template>
	<div>
		<div transition="fade" transition-mode="out-in">
			{{ componentsHtml }}
		</div>

		{{ if pageData.pageStyle.pageCount > 1 }}
			<i v-if="showGuide" class="iconfont guide" style="color: {{ pageData.pageStyle.guideColor }}">&#xe620;</i>
		{{ else }}
			<div>{{ menuButtonHtml }}</div>
		{{ /if }}

    <dialog :show.sync="dialog.showAlert"
            :title.sync="dialog.title"
            :content.sync="dialog.content"
            :list.sync="dialog.list">
    </dialog>

    <dialog type="confirm"
            :show.sync="dialog.showConfirm"
            :title.sync="dialog.title"
            :content.sync="dialog.content">
    </dialog>
	</div>
</template>

<script>
import dialog from './dialog.vue'

// service
import serviceAct from '../../service/act';

var vm;
export default {
  components: {
    dialog
  },

	ready () {
		vm = this;
		initSwipeGestures();

    this.$on('on-alert-confirm', function() {
      vm.dialog.showAlert = false;
    });
    this.$on('on-confirm-cancel', function() {
      vm.dialog.showConfirm = false;
    });
    this.$on('on-confirm-confirm', function() {
      vm.dialog.content = '正在支付，请稍后...';
      console.log('productId:: ' + vm.dialog.options.productId);

      serviceAct.payByMbip(vm.dialog.options.productId).then(function (rsp) {
        console.log('payByMbip:');
        console.log(rsp);

        var json = rsp.data;
        vm.dialog.content = json.desc;
        vm.dialog.list = null;
        vm.dialog.showConfirm = false;
        vm.dialog.showAlert = true;
      });
    })
	},

	data () {
		return {
			showGuide: true,
			currentPage: 1,
			topOut: false,
			topIn: false,
			bottomOut: false,
			bottomIn: false,
			vNext: false,
			vPrev: false,

      dialog: {
        title: '提示',
        content: '',
        showAlert: false,
        showConfirm: false,
        options: {},
        list: null
      }
		}
	},

  methods: {
    openPayConfirm (options) {
      vm.dialog.showConfirm = true;
      vm.dialog.content = '确定支付：' + options.productCompnentDesc + '？';
      vm.dialog.options = options;
      console.log(options);
    },
    openGiftRecord (actId) {
      console.log('actId: ' + actId);
      vm.dialog.showAlert = true;
      vm.dialog.title = '我的奖品';
      vm.dialog.content = '正在加载...';
      serviceAct.getPrizeListp(actId).then(function (rsp) {
        var json = rsp.data;

        // json = {"result":true,"code":1,"desc":null,"data":[{"uid":100453495,"pid":8,"actId":15000057,"name":"礼品","createTime":"2016-06-03 16:00:53","appId":1},{"uid":100453495,"pid":8,"actId":15000057,"name":"测试礼品","createTime":"2016-06-03 16:02:45","appId":1},{"uid":100453495,"pid":8,"actId":15000057,"name":null,"createTime":"2016-06-03 16:03:22","appId":1}]};

        vm.dialog.list = json.data;
        console.log(rsp);
      }, function () {
        vm.dialog.content = '出错了';
      });
      // setTimeout(function () {
      //   var json = {"result":true,"code":1,"desc":null,"data":[{"uid":100453495,"pid":8,"actId":15000057,"name":"礼品","createTime":"2016-06-03 16:00:53","appId":1},{"uid":100453495,"pid":8,"actId":15000057,"name":"测试礼品","createTime":"2016-06-03 16:02:45","appId":1},{"uid":100453495,"pid":8,"actId":15000057,"name":null,"createTime":"2016-06-03 16:03:22","appId":1}]};

      //   vm.dialog.list = json.data;

      //   console.log(json.data);
      // }, 1000);
    }
  }
}

/*
 *******************
 * 页面切换
 *******************
 */
// 向上滑
function swipePageUp() {
  swipePage({
  	direction: 'up',
    outClass: 'topOut',
    inClass: 'topIn',
    nextOrPrevClass: 'vNext'
  });
}

// 向下滑
function swipePageDown() {
  swipePage({
  	direction: 'down',
    outClass: 'bottomOut',
    inClass: 'bottomIn',
    nextOrPrevClass: 'vPrev'
  });
}

// 正在滑动
var pageIsMoving = false;

// 页面滑动
function swipePage(options) {

  // 有没有下一页或者上一页
  if (vm.currentPage == {{ pageData.pageStyle.pageCount }} && options.direction == 'up' ||
  	  vm.currentPage == 1 && options.direction == 'down') return false;

  // 页面是否正在滑动
  if (pageIsMoving) return false;
  pageIsMoving = true;

  // 在页面滑动之前，初始化页面的位置，如果是从下往上，那么垂直方向的初始位移就是100%
  vm[options.nextOrPrevClass] = true;

  setTimeout(function () {
    beforeAnimated();
    setTimeout(function () {
      afterAnimated();
    }, 400);
  }, 100); // 100ms是为了确保已经初始化页面的位置

  // 页面滑动之前，do something
  function beforeAnimated() {
  	vm[options.outClass] = true;
  	vm[options.inClass] = true;
    vm.showGuide = false;
  }

  // 页面滑动之后，do something
  function afterAnimated() {
  	vm[options.outClass] = false;
  	vm[options.inClass] = false;
  	vm[options.nextOrPrevClass] = false;

  	options.direction == 'up' ? vm.currentPage++ : vm.currentPage--;

    pageIsMoving = false; // 页面滑动停止

    if(vm.currentPage < {{ pageData.pageStyle.pageCount }}) {
     vm.showGuide = true; // 显示图标
    }
  }
}

// 滑动手势
function initSwipeGestures() {
  var element = document.getElementById('page-main');
  var isTouchMove, startTx, startTy;

  element.addEventListener( 'touchstart', function( e ){

    var touches = e.touches[0];

    startTx = touches.clientX;
    startTy = touches.clientY;
    isTouchMove = false;
  }, false );

  element.addEventListener( 'touchmove', function( e ){
    isTouchMove = true;
    e.preventDefault();
  }, false );

  element.addEventListener( 'touchend', function( e ){
    if( !isTouchMove ){
      return;
    }

    var touches = e.changedTouches[0],
      endTx = touches.clientX,
      endTy = touches.clientY,
      distanceX = startTx - endTx,
      distanceY = startTy - endTy,
      isSwipe = false;

    if( Math.abs(distanceX) >= Math.abs(distanceY) ){
      if( distanceX > 20 ){
        // left
        isSwipe = true;
      }
      else if( distanceX < -20 ){
        // right
        isSwipe = true;
      }
    }
    else{
      if( distanceY > 20 ){
        // up
        isSwipe = true;
        swipePageUp();
      }
      else if( distanceY < -20 ){
        // down
        isSwipe = true;
        swipePageDown();
      }
    }

    if( isSwipe ){
      // console.log( 'fire swipe event' );
    }
  }, false );
}
</script>

<style scoped>
/*页面切换动画，当前状态*/
.vCurrent, .h-current {
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

/*页面切换动画，从左往右*/
.h-current.topOut{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
}
.h-next{
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
}
.h-next.topIn{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

/*页面切换动画，从下往上*/
.vCurrent.topOut{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}
.vNext{
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
}
.vNext.topIn{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

/*页面切换动画，从上往下*/
.vCurrent.bottomOut{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
}
.vPrev{
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}
.vPrev.bottomIn{
	-webkit-transition: 400ms;
	transition: 400ms;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

</style>
