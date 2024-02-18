<template>
  <div id="app">
    <LoaderComponent v-if="store.state.loading"></LoaderComponent>
    <GlobalHeader :user="userData" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader, { IUser } from './components/GlobalHeader.vue';
import {useStore} from 'vuex';
import LoaderComponent from './components/LoaderComponent.vue';

const store = useStore();
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