// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css';
import qs from 'qs';
import md5 from 'js-md5';
import  echarts from 'echarts'



Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.prototype.qs = qs;
Vue.use(Vant)
Vue.use(echarts)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8088/api'
axios.defaults.withCredentials=true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
