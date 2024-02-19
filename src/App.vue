<template>
  <div id="app">
    <LoaderComponent v-if="store.state.loading"></LoaderComponent>
    <GlobalHeader :user="user"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from './components/GlobalHeader.vue';
import {useStore} from 'vuex';
import LoaderComponent from './components/LoaderComponent.vue';
import { computed, onMounted, watch } from 'vue';
import {GlobalDataProps} from './store';
import axios from 'axios';
import {createMessage,MessageType} from './hooks/UseCreateMessage';
import VNode from './components/VNode';

const store = useStore<GlobalDataProps>();
const user = computed(() => store.state.user);
////在首页加载时获取token
const token = computed(() => store.state.token);//
onMounted(() => {
  // 如果用户没有登陆，但是浏览器中有token，那么自动登录
  if(!user.value.isLogin && token.value){
    // 将获取到的token设置到axios的通用请求头中
    axios.defaults.headers.common['Authorization'] = `Bearer ` + token.value;
    store.dispatch('fetchCurUser');
  }
});

const error = computed(() => store.state.error);
watch(() => error.value.status,() => {
  const {status,message} = error.value;
  if(status && message){
    createMessage('error',message);
  }
})
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>