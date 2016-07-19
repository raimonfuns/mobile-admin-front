<template lang="jade">
vue-file-upload(url='/service/hd/file/upload',
  v-bind:files.sync = 'files',
  v-bind:filters = "filters",
  v-bind:events = 'cbEvents',
  v-bind:request-options = "reqopts")
table.table.table-striped.table-bordered.table-hover.text-center
  thead
    tr
      th 名称
      th 进度
      th 状态
      th 操作
  tbody
    tr(v-for='file in files')
      td
        p.ell.fileName(v-text='file.name')
      td(v-text='file.progress')
      td(v-text='onStatus(file)')
      td
        button(type='button',@click="uploadItem(file)",class="btn btn-success") 上传
button(type='button',@click="uploadAll",class="btn btn-success all-upload") 上传所有文件
</template>
<script>
import VueFileUpload from 'vue-file-upload';

var vm; // v-model

export default{
  data(){
    return{
      files:[],
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          vm.callback(response.data.fileUrl);
        }
      },
      //xhr请求附带参数
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  ready () {
    vm = this;
  },
  props: {
    callback: Function
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$broadcast('DO_POST_FILE');
    }
  },
  components:{
    VueFileUpload
  }
}
</script>

<style lang="stylus" scoped>
.table-bordered {
  margin-top: 20px;
  th {
    text-align: center;
  }
}
.table-bordered>tbody>tr>td, .table>tbody>tr>td{
  vertical-align: middle;
}  
.fileName {
  max-width: 140px;
}
</style>
