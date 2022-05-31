import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import './style.less';
import { router } from './route';
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');