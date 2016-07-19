<template>
    <div class="page-bar">
        <ul>
            <li v-if="showFirst">
              <a :href="'#/page/' + (page - 1)">上一页</a>
            </li>
            <li v-for="index in indexs"  v-bind:class="{'active': page == index}">
                <a :href="'#/page/' + index" v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="showLast">
              <a :href="'#/page/' + (page + 1)">下一页</a>
            </li>
            <li>
              <a>共<i>{{total}}</i>页</a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
  props: {
    total: Number,
    page: Number
  },
  computed: {
    indexs: function(){
      var left = 1
      var right = this.total
      var ar = [] 
      if(this.total>= 11){
        if(this.page > 5 && this.page < this.total-4){
          left = this.page - 5
          right = this.page + 4
        }else{
          if(this.page<=5){
            left = 1
            right = 10
          }else{
            right = this.total
            left = this.total - 9
          }
        }
     }
      while (left <= right){
          ar.push(left)
          left ++
      }   
      return ar
     },
     showLast: function(){
          if(this.page == this.total){
              return false
          }
          return true
     },
     showFirst: function(){
          if(this.page == 1){
              return false
          }
         return true
     }
  },
  methods: {
    btnClick: function(data){
      if(data != this.page){
        this.page = data
      }
    }
  }
    
};
</script>

<style scoped>
    ul{
      text-align: center;
    }
    .page-bar li{
        list-style: none;
        display: inline-block;
    }
    .page-bar li:first-child>a {
       margin-left: 0px
    }
    .page-bar a{
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #7C7C7C;
        cursor: pointer
    }
    .page-bar a:hover{
        background-color: #eee;
    }
    .page-bar .active a{
        color: #fff;
        cursor: default;
        background-color: #58B957;
        border-color: #fff;
        border: 1px solid #58B957;
    }
    .page-bar i{
        font-style:normal;
        color: #58B957;
        margin: 0px 4px;
        font-size: 12px;
    }
</style>