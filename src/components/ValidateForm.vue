<template>
    <div class="container">
        <div class="form">
            <div class="title">登录博文专栏</div>
            <slot></slot>

            <div @click="onFormSubmit">
                <!-- 具名插槽 -->
                <slot name="submit">
                    <!-- 父组件没有传递按钮元素，则显示下方的默认按钮 -->
                    <el-button>Default</el-button>
                </slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import  { defineEmits } from 'vue';

const emit = defineEmits(['form-submit']);
const onFormSubmit = () => {
    emit('form-submit',true);
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;

    .form {
        width: 400px;
        height: 500px;
        margin-top: 100px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
            font-size: 30px;
            font-weight: 600;
            text-align: center;
        }
    }
}
</style>