import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

//配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8081/'

//请求拦截器
axios.interceptors.request.use(config => {
  //console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
