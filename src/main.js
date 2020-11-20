import Vue from 'vue'
import App from './App.vue'
import { Lazyload } from 'vant'
import '../public/rem'
import 'vant/lib/icon/local.css'
Vue.use(Lazyload)
Vue.config.productionTip = false
import store from '@/store/index'
import router from '@/router'
import http from './utils/api'
//将所有图片统一用一个地址拼接方便以后上线改地址
import img from './utils/img'
Vue.prototype.$img=img
//将接口全部挂载在vue的原型上
Vue.prototype.$http=http
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app') 
