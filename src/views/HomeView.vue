<template>
    <div>home view</div>
    <ColumnList :list="list"/>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import ColumnList, { ColumnProps } from '../components/ColumnList.vue';
import {useStore} from 'vuex';

const store = useStore();
const list = computed(() => {
  return store.state.columns;
});

</script>