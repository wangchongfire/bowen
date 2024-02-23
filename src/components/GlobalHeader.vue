<template>
    <header>
        <aside class="title">
            <router-link to="/">博闻专栏</router-link>
        </aside>
        <aside>
            <div v-if="!userStore.isLogin">
                <el-button type="primary">
                    <router-link to="/login">登录</router-link>
                </el-button>
                <!-- <el-button type="info">注册</el-button> -->
            </div>
            <div v-else>
                <DropDown :name="userStore.data.nickName">
                    <DropdownItem>
                        <router-link to="/create">新建文章</router-link>
                    </DropdownItem>
                    <DropdownItem :disabled="isDisabled">
                        <a>管理账户</a>
                    </DropdownItem>
                    <DropdownItem @click.prevent="userStore.logout">
                        <a>退出登录</a>
                    </DropdownItem>
                </DropDown>
            </div>
        </aside>
    </header>
</template>
<script lang="ts" setup>
import DropDown from './DropDown.vue';
import DropdownItem from './DropdownItem.vue';
import { ref,defineProps, PropType} from 'vue';
import {UserProps} from '../store';
import {useUserStore} from '../store/user';

const userStore = useUserStore();


// 传给DropdownItem的值
const isDisabled = ref(true);
</script>
<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 40px 0 40px;
    background: blue;

    a{
        text-decoration: none;
        color: #fff;
        font-size: 26px;
    }
    aside {
        color: #fff;

    }
}
</style>