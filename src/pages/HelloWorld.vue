<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>count: {{count}}</div>
    <button v-on:click="add">add</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    this.$nextTick(function () {
      console.log('--now--', new moment());
    })
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
