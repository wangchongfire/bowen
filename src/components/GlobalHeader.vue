<template>
    <header>
        <aside>博文专栏</aside>
        <aside>
            <div v-if="!user?.isLogin">
                <el-button type="primary">登录</el-button>
                <el-button type="info">注册</el-button>
            </div>
            <div v-else>
                <el-dropdown split-button type="primary">
                    欢迎你 {{ user.name }}
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>新建文章</el-dropdown-item>
                            <el-dropdown-item>管理账户</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </aside>
    </header>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
interface IUser {
    isLogin: boolean;
    name?: string;
    id?: number;
}

// eslint-disable-next-line no-undef
const props = defineProps({
    user: {
        type: Object as PropType<IUser>,
        requerid: true
    }
});
</script>
<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 40px 0 40px;
    background: blue;

    aside {
        color: #fff;
    }
}
</style>