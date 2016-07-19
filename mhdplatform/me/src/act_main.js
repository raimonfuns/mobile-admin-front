import Router from 'vue-router'
import App from './components/act/app.vue'
import Index from './components/act/index.vue'



// weui
require('./static/act/weui.css');

// 使用路由
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/index': {
  	component: Index
  }
  
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '/': '/index'
})

router.start(App, '#app')
