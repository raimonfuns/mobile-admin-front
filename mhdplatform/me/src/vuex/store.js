import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import workspace from './modules/workspace'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    workspace
  }
})

export default store
