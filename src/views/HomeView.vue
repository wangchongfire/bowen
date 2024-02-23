<template>
  <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"/>
    <div class="load-more" v-if="!isLastPage" @click="loadMorePage">加载更多</div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import ColumnList from '../components/ColumnList.vue';
import { useColumnStore } from '../store/column';
import useLoadMore from '../hooks/useLoadMore';

const columnStore = useColumnStore();
const total = computed(() => columnStore.total)
const currentPage = computed(() => columnStore.currentPage)
onMounted(() => {
  columnStore.fetchColumns({pageSize:3});
})

const list = computed(() => {
  return columnStore.getColumns;
});
const { loadMorePage, isLastPage } = useLoadMore(columnStore, 'fetchColumns', { total, currentPage, pageSize: 3 });
</script>
<style lang="scss" scoped>
.load-more{
  margin: 0 auto;
  width:200px;
  height:50px;
  background: #2c61a7;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
}
</style>
