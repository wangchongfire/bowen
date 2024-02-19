<template>
    <header>
        <aside>
            <router-link to="/">博文专栏</router-link>
        </aside>
        <aside>
            <div v-if="!user?.isLogin">
                <el-button type="primary">
                    <router-link to="/login">登录</router-link>
                </el-button>
                <el-button type="info">注册</el-button>
            </div>
            <div v-else>
                <DropDown :name="user.nickName">
                    <DropdownItem>
                        <router-link to="/create">新建文章</router-link>
                    </DropdownItem>
                    <DropdownItem :disabled="isDisabled">
                        <a>管理账户</a>
                    </DropdownItem>
                    <DropdownItem>
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
import { computed ,ref,defineProps, PropType} from 'vue';
import {UserProps} from '../store';

const props = defineProps({
    user:{
        type:Object as PropType<UserProps>,
        required:true,
    }
})

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

    aside {
        color: #fff;
    }
}
</style>