import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'crypto-js/md5'
import milligram from 'milligram'

window.md5 = md5;
window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '024d25c50f2a46474c4c87f7c6b7496bac43e6c9' }
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
