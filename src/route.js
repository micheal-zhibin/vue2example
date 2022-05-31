import VueRouter from "vue-router";

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "HelloWorld" */ '@/pages/HelloWorld.vue'),
    },
    {
      path: '/goodbye',
      component: () => import(/* webpackChunkName: "GoodBye" */ '@/pages/GoodBye.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "Error" */ '@/pages/Error.vue'),
    },
  ],
});