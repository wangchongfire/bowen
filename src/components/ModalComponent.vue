<template>
  <el-button class="btn" plain @click="dialogVisible = true">
    <slot></slot>
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="删除文章"
    width="500"
  >
    <slot name="message"><span>This is a message</span></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClick">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref,defineEmits } from 'vue'

const dialogVisible = ref(false);
const emit = defineEmits(['confirmDelete']);

const handleClick = () => {
  dialogVisible.value = false;
  emit('confirmDelete',true);
}
</script>
<style lang="scss" scoped>
.btn{
    background: none;
    border: none;
}
</style>
