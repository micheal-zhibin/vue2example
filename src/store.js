import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state() {
    return {
      count: 0,
      name: 'michael',
    };
  },
  mutations: {
    increment(state) {
      state.count ++;
    },
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
});
