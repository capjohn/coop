import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'crypto-js/md5'
import milligram from 'milligram'

window.md5 = md5;
window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: { Authorization: '87ddcb752dd331287bd70a82d03ce1be3a789bf7' }
});

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    api.interceptors.request.use(config => {
      if(this.$store.state.token) {
        config.url+='?token='+this.$store.state.token
      }
      return config;
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
