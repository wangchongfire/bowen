<template>
  <el-dropdown split-button type="primary">
    欢迎你 {{ name }}
    <template #dropdown>
      <el-dropdown-menu>
        <slot></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps(['name']);
</script>
