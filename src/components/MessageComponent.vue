<template>
    <Teleport to="#message">
        <div v-if="isVisible" class="message">
            {{ message }}
            <el-icon class="icon" @click="hide" color="red"><CircleCloseFilled /></el-icon>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import { CircleCloseFilled} from "@element-plus/icons-vue";
import { ref,defineProps, onUnmounted, PropType } from "vue";
import {MessageType} from '../hooks/UseCreateMessage';

const isVisible = ref(true);
const props = defineProps({
    message:{
        type:String,
        required:true,
    },
    type:{
        type:String as PropType<MessageType>,
    }
})

const hide = () => {
    isVisible.value = false;
}
// 创建message元素
const div = document.createElement('div');
div.id = 'message';
document.body.appendChild(div);

onUnmounted(() => {
    document.body.removeChild(div);
})
</script>
<style lang="scss" scoped>
.message{
    position:absolute;
    width: 300px;
    height: 50px;
    background:pink;
    top: 0;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 50px;

    .el-icon{
        width: 5px;
        height: 5px;
    }
}
</style>