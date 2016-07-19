<template>
  <div>
    <div class="vue-modal">
      <modal
        :show.sync="show"
        :close="close">

        <!-- header -->
        <div slot="header">
          <h3>新建活动</h3>
        </div>

        <!-- body -->
        <div slot="body">
          <form class="form-horizontal" v-if="!showLoading && !message">
            <div class="form-group">
              <label class="col-sm-4 control-label">活动名称:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-model="newActivity.name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-4 control-label">活动类型:</label>
              <div class="col-sm-7">
                <select class="form-control" v-model="newActivity.type">
                  <option v-for="(key, value) in hdTypeList" v-bind:value="value">{{ key }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-4 control-label">appId:</label>
              <div class="col-sm-7">
                <select class="form-control" v-model="newActivity.appId">
                  <option value="1">me(ME)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-4 control-label">开始时间:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-datepicker="newActivity.startTime" id="newStartTime">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-4 control-label">结束时间:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-datepicker="newActivity.endTime" id="newEndTime">
              </div>
            </div>

            <ul class="error-message text-center" style="color: #a94442" v-show="showMessage">
              <li v-show="!validation.name">请输入活动名称；</li>
              <li v-show="!validation.startTime">请输入活动开始时间；</li>
              <li v-show="!validation.endTime">请输入活动结束时间；</li>
              <li v-show="!validation.compareTime">结束时间要大于开始时间；</li>
            </ul>
          </form>

        </div>

        <!-- footer -->
        <div slot="footer">
          <button class="btn btn-success" @click="create">
            确定
          </button>
          <button class="btn btn-default" @click="close">
            取消
          </button>
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
  data () {
    return {
      newActivity: {
        name: '',
        type: 1,
        appId: 1,
        startTime: '',
        endTime: ''
      },
      showMessage: false,
      hdTypeList: {}
    }
  },
  ready () {
    var _this = this;
    service.getHdTypeList().then(function (rsp) {
      _this.hdTypeList = rsp.data.data;
    });
  },
  props: ['show', 'updateTableListData'],
  components: {
      modal
  },
  methods: {
    create () {
      if (!this.isValid) {
        this.showMessage = true;
        return false;
      }

      var _this = this;
      service.addItem(this.newActivity).then(function (rsp) {
        rsp.data.data.index = rsp.data.data.hdIndex;
        service.saveItem(rsp.data.data).then(function (rsp) {

          var desc = '';

          _this.showLoading = false;
          if (rsp.data.result) {
            desc = '新建成功';
          } else {
            desc = '出错了';
          }
          _this.updateTableListData(desc);
        });
      });

      this.close();
    },
    close () {
      this.show = false;
      this.showMessage = false;
      this.newActivity.name = '';
      this.newActivity.type = 1;
      this.newActivity.appId = 1;
      this.newActivity.startTime = '';
      this.newActivity.endTime = '';
    }
  },
  computed: {
    validation () {
      return {
        name: !!this.newActivity.name.trim(),
        startTime: !!this.newActivity.startTime,
        endTime: !!this.newActivity.endTime,
        compareTime: this.newActivity.startTime < this.newActivity.endTime
      }
    },
    isValid () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  watch: {
    show (value) {
      if (value == true) {
        $('#newStartTime').val('');
        $('#newEndTime').val('');
      }
    }
  },
}
</script>
