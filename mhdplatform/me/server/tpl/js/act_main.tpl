import Router from 'vue-router'
import App from './components/act/app.vue'
import Index from './components/act/index.vue'

{{ each routerComponents as v }}
  {{ if v == 'buyRecord' }}
    import BuyRecord from './components/act/buyrecord.vue'
  {{ else if v == 'receiveRecord' }}
    import ReceiveRecord from './components/act/receiverecord.vue'
  {{ else if v == 'myGiftRecord' }}
    import MyGiftRecord from './components/act/mygiftrecord.vue'
  {{ /if }}
{{ /each }}

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
  {{ each routerComponents as v }}
    {{ if v == 'buyRecord' }}
      ,
      '/buyRecord': {
        component: BuyRecord
      }
    {{ else if v == 'receiveRecord' }}
      ,
      '/receiveRecord': {
        component: ReceiveRecord
      }
    {{ else if v == 'myGiftRecord' }}
      ,
      '/myGiftRecord': {
        component: MyGiftRecord
      }
    {{ /if }}
  {{ /each }}
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '/': '/index'
})

router.start(App, '#app')
