<template>

  <nav class="navbar navbar-default navbar-static-top" style="margin-bottom: 0">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">专题模板生成页面</a>
    </div>
  </nav>
  <div class="container">
    <div class="row">
          <div class="col-lg-12">
            <h2>活动列表</h2>
          </div>
      </div>
  </div>

  <div class="container">
    <button @click="showNewHdModal = true" class="btn btn-success add-hd-btn">新建活动</button>

    <table class="table table-striped table-bordered table-hover text-center">
      <thead>
        <tr>
          <th>id</th>
          <th>活动名称</th>
          <th>类型</th>
          <th>活动地址</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>创建时间</th>
          <th>创建人</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in hdTableListData">
            <td>{{ item.hdIndex }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.type == 1 ? '默认类型(DEFUALT)' : '' }}</td>
            <td>
              <a class="btn btn-success btn-xs" href="http://page.vip.yy.com/me/hdplatform/{{ item.hdIndex }}" target="_blank">发布地址</a>
              <button type="button" class="btn btn-success btn-xs" @click="preview(item)">预览地址</button>
            </td>
            <td>{{ item.startTime | date }}</td>
            <td>{{ item.endTime | date }}</td>
            <td>{{ item.createTime | date }}</td>
            <td>{{ item.operator }}</td>
            <td>
              <button type="button" class="btn btn-success btn-xs" @click="goToEditPage(item.hdIndex)">编辑页面</button>
              <button type="button" class="btn btn-success btn-xs" @click="showEditHdTimeModalFn(item)">修改时间</button>
            </td>
          </tr>
      </tbody>
    </table>
  </div>

  <pagination :total=totalPages :page=page></pagination>

  <div class="modal-wrap">
    <new-hd-modal
      :show.sync="showNewHdModal"
      :update-table-list-data="updateTableListData">
    </new-hd-modal>

    <edit-hd-time-modal
      :show.sync="showEditHdTimeModal"
      :this-item-data.sync="thisItemData"
      :update-table-list-data="updateTableListData">
    </edit-hd-time-modal>

    <alert-modal
      :show.sync="showAlertModal"
      :message.sync="message">
    </alert-modal>

    <modal
      :show.sync="showQR"
      :close="closeQR">

      <div slot="header">
        <h3>预览页面二维码</h3>
      </div>

      <div slot="body">
        <p class="text-center" v-show="!showQRImg">正在生成二维码...</p>
        <div id="qrcode" class="text-center" v-show="showQRImg"></div>
      </div>

      <div slot="footer">
        <button class="btn btn-default" @click="closeQR">
          关闭
        </button>
      </div>
    </modal>
  </div>

</template>

<script>
import service from '../service'
import pagination from '../components/pagination.vue'
import newHdModal from '../components/newhdmodal.vue'
import editHdTimeModal from '../components/edithdtimemodal.vue'
import alertModal from '../components/alertmodal.vue'
import modal from '../components/modal.vue'

import * as actions from '../vuex/actions'

export default {
  data () {
    return {
      hdTableListData: {},
      page: 1,
      totalPages: 1,
      message: '',
      thisItemData: {},
      showQR: false,
      showQRImg: false,
      showNewHdModal: false,
      showEditHdTimeModal: false,
      showAlertModal: false
    }
  },
  components: {
    pagination,
    newHdModal,
    editHdTimeModal,
    alertModal,
    modal
  },
  route: {
    data ({ to }) {
      const page = +to.params.page
      this.page = page;

      var _this = this;
      service.getListItem(page).then(function (rsp) {
        if (!rsp.data.data) {
          window.location.href = '/';
          return false;
        }
        _this.totalPages = rsp.data.data.totalPages;
        _this.$set('hdTableListData', rsp.data.data.list);
      });
    }
  },
  methods: {
    alertMsg (msg) {
      this.showAlertModal = true;
      this.message = msg;
    },
    updateTableListData (desc) {
      var _this = this;
      service.getListItem(this.page).then(function (rsp) {
        _this.$set('hdTableListData', rsp.data.data.list);

        _this.message = desc;
        _this.showAlertModal = true;
      });
    },
    showEditHdTimeModalFn (thisItemData) {
      this.showEditHdTimeModal = true;
      this.thisItemData = thisItemData;
    },
    goToEditPage (hdIndex) {
      window.open('#!/workspace/' + hdIndex);
    },
    preview (thisItemData) {
      this.showQR = true;
      this.showQRImg = true;
      var qrcode = document.getElementById("qrcode");
      qrcode.innerHTML = '';
      new QRCode(qrcode, 'http://admin.vip.yy.com:8080/buildfiles/' + thisItemData.index + '.html');
    },
    closeQR () {
      this.showQR = false;
    },
  }
}
</script>

<style scoped lang="stylus">
.container {
  position: relative;
  .add-hd-btn {
    position: absolute;
    top: -40px;
    right: 15px;
  }
}
table {
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

</style>
