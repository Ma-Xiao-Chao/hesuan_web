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
// import  echarts from 'echarts'

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;


Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.prototype.qs = qs;
Vue.use(Vant)
// Vue.use(echarts)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8088/api'
axios.defaults.withCredentials=true

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  console.log("--------"+localStorage.getItem('token'));
  if (localStorage.getItem('token')) {
    // 在请求头部添加key=token的键，值就是令牌
    config.headers.token = localStorage.getItem('token');
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
