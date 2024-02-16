<template>
    <el-dropdown-item :disabled="disabled">
        <slot></slot>
    </el-dropdown-item>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    }
})
</script>
