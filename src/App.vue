<template>
  <div id="app">
    <router-link to="/">欢迎页</router-link>
    <router-link to="/goodbye">再见页</router-link>
    <router-link to="/error">错误页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
