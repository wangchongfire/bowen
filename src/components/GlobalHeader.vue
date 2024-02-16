<template>
    <header>
        <aside>博文专栏</aside>
        <aside>
            <div v-if="!user?.isLogin">
                <el-button type="primary">登录</el-button>
                <el-button type="info">注册</el-button>
            </div>
            <div v-else>
                <DropDown :name="user.name">
                    <DropdownItem>
                        <a>新建文章</a>
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
import { PropType ,ref} from 'vue';
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