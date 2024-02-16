<template>
  <el-dropdown split-button type="primary">
    欢迎你 {{ name }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>新建文章</el-dropdown-item>
        <el-dropdown-item>管理账户</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps(['name']);
</script>
