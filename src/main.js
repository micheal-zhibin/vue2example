import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './style.less';
import { router } from './route';

Vue.config.productionTip = false;
Vue.use(VueRouter);

console.log('--router--', router);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');