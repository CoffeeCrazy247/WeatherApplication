import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
window.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
