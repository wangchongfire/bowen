<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <img class="card-img-top rounded-circle border border-light my-3" :src="column.avatar" :alt="column.title" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a class="btn btn-outline-primary" href="#">
            <!-- <router-link :to="`column/${column.id}`">进入专栏</router-link> -->
            <router-link :to="{name:'column',params:{id:column.id}}">进入专栏</router-link>

          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType,defineProps } from "vue";

interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});

const columnList = computed(() => {
    return props.list.map(item => {
        if(!item.avatar){
            item.avatar = require('@/assets/column.jpg');
        }
        return item;
    });
});
</script>
<style scoped>

</style>