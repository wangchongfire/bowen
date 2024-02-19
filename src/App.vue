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
import { computed } from 'vue';

const store = useStore();
const user = computed(() => {
  return store.state.user;
})
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>