<template>
    <div class="container">
        <div class="form">
            <div class="title">登录博文专栏</div>
            <slot></slot>
            <el-button color="#626aef" >Default</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: center;
    .form{
        width: 400px;
        height: 500px;
        margin-top: 100px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title{
            font-size:30px;
            font-weight: 600;
            text-align: center;
        }
    }
}
</style>