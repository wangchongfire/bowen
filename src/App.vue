<template>
  <div id="app">
    <LoaderComponent v-if="globalStore.loading"></LoaderComponent>
    <GlobalHeader :user="user"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from './components/GlobalHeader.vue';
import {useStore} from 'vuex';
import LoaderComponent from './components/LoaderComponent.vue';
import { computed, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, watch } from 'vue';
import {GlobalDataProps} from './store/index';
import {createMessage,MessageType} from './hooks/UseCreateMessage';
import VNode from './components/VNode';
import {useGlobalStore} from './store/global'

const store = useStore<GlobalDataProps>();
const globalStore = useGlobalStore();

const user = computed(() => store.state.user);
const error = computed(() => globalStore.error);
watch(() => error.value.status,() => {
  const {status,message} = error.value;
  if(status && message){
    createMessage('error',message);
  }
})

// 路由判断的逻辑移到router配置文件中，下面代码废除
////在首页加载时获取token
// const token = computed(() => store.state.token);//
// onMounted(() => {
//   // 如果用户没有登陆，但是浏览器中有token，那么自动登录
//   if(!user.value.isLogin && token.value){
//     // 将获取到的token设置到axios的通用请求头中
//     axios.defaults.headers.common['Authorization'] = `Bearer ` + token.value;
//     store.dispatch('fetchCurUser');
//   }
// });
// onBeforeMount(() => {
//   console.log('App.vue BeforeMount');
// });
// onMounted(() => {
//   console.log('App.vue Mounted');
// });
// onBeforeUpdate(() => {
//   console.log('App.vue onBeforeUpdate');
// });
// onUpdated(() => {
//   console.log('App.vue onUpdated');
// });
// onBeforeUnmount(() => {
//   console.log('App.vue onBeforeUnmount');
// });
// onUnmounted(() => {
//   console.log('App.vue onUnmounted');
// });

</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>