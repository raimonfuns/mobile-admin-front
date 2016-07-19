import Vue from 'vue'
import Router from 'vue-router'
import App from './components/app.vue'
<<<<<<< HEAD
import hdTableList from './components/hdtablelist.vue'
import workspace from './components/workspace.vue'
=======
import hdTableList from './views/hdtablelist.vue'
import workspace from './views/workspace.vue'
>>>>>>> change-constructor

// js
require('./library/jquery-ui.js');
require('./library/jquery-ui-timepicker-addon.js');

// filter
require('./filter/date');

// 使用路由
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/page/:page': {
    component: hdTableList
  },
  '/workspace/:id': {
    component: workspace
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0);
})

router.redirect({
  '/': '/page/1'
})

router.start(App, '#app')
