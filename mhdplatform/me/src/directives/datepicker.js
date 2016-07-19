import Vue from 'vue'

Vue.directive('datepicker', {
  bind: function () {
    var vm = this.vm;
    var key = this.expression;
    $(this.el).datetimepicker({ 
      dateFormat: "yy-mm-dd",
      timeFormat:  "hh:mm:ss",
      onClose: function (date) {
        vm.$set(key, date);
      }
    });
  },
  update: function (value) {

  }
})
