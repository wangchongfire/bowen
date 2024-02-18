<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <img class="" :src="column.avatar && column.avatar.url" :alt="column.title" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a class="btn btn-outline-primary" href="#">
            <!-- <router-link :to="`column/${column.id}`">进入专栏</router-link> -->
            <router-link :to="{name:'column',params:{id:column._id}}">进入专栏</router-link>

          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType,defineProps } from "vue";
import {ColumnProps} from '../store'

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});

const columnList = computed(() => {
    return props.list;
});

</script>
<style scoped lang="scss">
.raw{
  .card-body{
  img{
    width: 300px;
    height: 300px;
  }
}
}
</style>