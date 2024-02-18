<template>
    <div>home view</div>
    <ColumnList :list="list"/>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import ColumnList, { ColumnProps } from '../components/ColumnList.vue';
import {useStore} from 'vuex';

const store = useStore();
onMounted(() => {
  store.dispatch('fetchColumns');
})

const list = computed(() => {
  return store.state.columns;
});
</script>