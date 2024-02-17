<template>
  <div id="app">
    <GlobalHeader :user="userData" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader, { IUser } from './components/GlobalHeader.vue'

// 传给首页header的数据
const userData: IUser = {
  isLogin: false,
  name: 'jack',
  id: 101
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>