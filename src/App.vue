<template>
  <div id="app">
    <LoaderComponent v-if="globalStore.loading"></LoaderComponent>
    <GlobalHeader />
    
    <router-view></router-view>
  </div> 
</template>

<script lang="ts" setup>
import GlobalHeader from './components/GlobalHeader.vue';
import LoaderComponent from './components/LoaderComponent.vue';
import { computed, watch } from 'vue';
import {createMessage,MessageType} from './hooks/UseCreateMessage';
import VNode from './components/VNode';
import {useGlobalStore} from './store/global'

const globalStore = useGlobalStore();

const error = computed(() => globalStore.error);
watch(() => error.value.status,() => {
  const {status,message} = error.value;
  if(status && message){
    createMessage('error',message);
  }
});
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>