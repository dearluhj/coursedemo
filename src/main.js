import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import './common/bootstrap/js/bootstrap.js'
import './plugins/element.js'
import { MessageBox,Message } from 'element-ui'

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
