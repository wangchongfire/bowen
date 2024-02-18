<template>
    <div class="form">
        <div class="title">
            <slot name="title"></slot>
        </div>
       <div class="main">
            <slot></slot>
       </div>

        <div @click="onFormSubmit" class="btn">
            <!-- 具名插槽 -->
            <slot name="submit">
                <!-- 父组件没有传递按钮元素，则显示下方的默认按钮 -->
                <el-button>Default</el-button>
            </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits, onUnmounted } from 'vue';
import { emitter } from '../hooks/UseMitt';

// 定义存储validateInput函数的类型
type ValidateFunc = () => boolean;
const funcArr: ValidateFunc[] = [];

const callback = (func: ValidateFunc) => {
    funcArr.push(func);
}
// 注册子组件创建完毕事件
emitter.on('form-item-created', callback);
onUnmounted(() => {
    emitter.off('form-item-created', callback);
})

const emit = defineEmits(['form-submit']);
const onFormSubmit = () => {
    const result = funcArr.map(fn => fn()).every(item => item);
    emit('form-submit', result);
}
</script>
<style lang="scss" scoped>
.form {
    width: 100%;
    margin-top: 100px;

    .title {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
    }
}
</style>