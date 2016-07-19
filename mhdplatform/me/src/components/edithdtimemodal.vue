<template>
	<div>
		<div class="vue-modal">
			<modal
				:show.sync="show"
        :close="close">

				<!-- header -->
				<div slot="header">
					<h3>修改活动时间</h3>
				</div>

				<!-- body -->
				<div slot="body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-4 control-label">开始时间:</label>
              <div class="col-sm-7">
                <input id="startTime" type="text" class="form-control" v-datepicker="thisItemData.startTime">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-4 control-label">结束时间:</label>
              <div class="col-sm-7">
                <input id="endTime" type="text" class="form-control" v-datepicker="thisItemData.endTime">
              </div>
            </div>

            <ul class="error-message text-center" style="color: #a94442" v-show="showMessage">
              <li v-show="!validation.startTime">请输入活动开始时间；</li>
              <li v-show="!validation.endTime">请输入活动结束时间；</li>
              <li v-show="!validation.compareTime">结束时间要大于开始时间；</li>
            </ul>

          </form>
        </div>

				<!-- footer -->
        <div slot="footer">
          <button class="btn btn-success" @click="update">确定</button>
          <button class="btn btn-default" @click="close">取消</button>
        </div>
			</modal>
		</div>
	</div>
</template>

<script>
import service from '../service'
import modal from './modal.vue'

// directives
require('../directives/datepicker');

export default {
	ready () {
	},
	data () {
		return {
      showMessage: false
		}
	},
	props: ['show', 'thisItemData', 'updateTableListData'],
	components: {
		modal: modal
	},
  watch: {
    show (value) {
      if (value == true) {
        this.thisItemData.startTime = formatDate(this.thisItemData.startTime);
        this.thisItemData.endTime = formatDate(this.thisItemData.endTime);
        $('#startTime').val(this.thisItemData.startTime);
        $('#endTime').val(this.thisItemData.endTime);

        console.log($('#startTime').val());
      }
    }
  },
	methods: {
		update () {
			log(this.thisItemData);

			if (!this.isValid) {
        this.showMessage = true;
        return false;
      }

      var updateData = {
      	hdIndex: this.thisItemData.hdIndex,
      	startTime: this.thisItemData.startTime,
      	endTime: this.thisItemData.endTime
      }

      var _this = this;
      service.updateTime(updateData).then(function (rsp) {
      	var desc = '';

      	if (rsp.data.result) {
        	desc = '修改成功';
      	} else {
      		desc = '出错了';
      	}
      	_this.updateTableListData(desc);
      });

      this.close();
		},
		close () {
			this.show = false;
      // this.thisItemData.startTime = '';
      // this.thisItemData.endTime = '';
		}
	},
  computed: {
    validation () {
      return {
        startTime: !!this.thisItemData.startTime,
        endTime: !!this.thisItemData.endTime,
        compareTime: this.thisItemData.startTime < this.thisItemData.endTime
      }
    },
    isValid () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
    startTimeStr () {
      return formatDate(this.thisItemData.startTime);
    }
  }
}

function formatDate(timesStamp) {
  var date = new Date(timesStamp);

  var Y = date.getFullYear() + '-',
  M = date.getMonth()+1,
  D = date.getDate(),
  h = date.getHours(),
  m = date.getMinutes(),
  s = date.getSeconds();

  M = (M < 10 ? '0' + M : M) + '-';
  D = (D < 10 ? '0' + D : D) + '  ';
  h = (h < 10 ? '0' + h : h) + ':';
  m = (m < 10 ? '0' + m : m) + ':';
  s = s < 10 ? '0' + s : s;

  return Y + M + D + h + m + s;
}
</script>
