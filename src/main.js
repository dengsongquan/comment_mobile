import Vue from 'vue'
import App from './App.vue'

import './assets/common.css'
import './assets/base.css'
import './assets/result.css'
import api from './util/api'
import sessionStorage from "./store/sessionStorage";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp'
import echarts from 'echarts'
import 'babel-polyfill'
import { Toast } from 'vant';
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(VueJsonp)
Vue.use(ElementUI)
Vue.use(VueAxios, axios, sessionStorage)
Vue.use(Toast);
Vue.prototype.$echarts = echarts
Vue.prototype.sessionStorage = sessionStorage
Vue.prototype.$axios = axios
axios.defaults.baseURL = api.baseURL

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.config.productionTip = false
export default {
  mounted() {
    this.$toast('提示文案');
  },
};
import router from "./router/index"
import { store } from "./store/store";


// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el:'#app',
  router,
  store,
  components : { App },
  template : '<App/>'
})
