<template>
    <div>文章详情</div>
    <div class="post-detail">
        <div class="header">
            <div class="img">
                <img :src="post.image?.url"/>
            </div>
            <div class="title">
                <h2>{{ post.title }}</h2>
            </div>
        </div>
        <div class="author">
            <div class="left">
                <img :src="post.author?.avatar?.url"/>
                <h5>{{ post.author?.nickName }}</h5>
            </div>
            <div class="right">
                {{ post.createdAt }}
            </div>
        </div>
        <div class="content" v-html="post?.content">
        </div>
        <div class="editor" v-if="isEditorVisible">
            <el-button type="success">
                <router-link 
                :to="{name:'create',query:{id:post._id}}"
                >
                    编辑
                </router-link>
            </el-button>
            <el-button type="danger">
                <ModalComponent @confirm-delete="handleDelete">
                    删除
                    <template #message>确认删除文章吗？</template>
                </ModalComponent>
            </el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import {  computed, reactive, toRefs, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useStore } from "vuex";
import { UserProps } from "../store/index";
import {createMessage} from '../hooks/UseCreateMessage';
import {useUserStore} from '../store/user';

const route = useRoute();
const router = useRouter();
// const store = useStore();
const userStore = useUserStore();

const postObj = reactive({post:{}});
const {post} = toRefs(postObj);
const getCurPost = async () => {
    const data = await axios.get(`/posts/${route.params.id}`);
    postObj.post = data.data.data;
}
watchEffect(() => {
    getCurPost();
});
const isEditorVisible = computed(() => {
    const userId = userStore.data._id;
    if(post.value && post.value.author){
        const curAuthor = postObj.post.author as UserProps;
        return curAuthor._id === userId;
    }
    return false; 
});

//
const handleDelete = () => {
    // console.log(post.value?.column);//文章所属专栏的id
    // console.log(post.value?._id);//文章的id
    axios.delete(`/posts/${post.value?._id}`).then(res => {
        // console.log(res);
        createMessage('success',"删除成功，2秒后回到专栏");
        setTimeout(() => {
            router.push(`/column/${post.value?.column}`);
        },2000);
    })
}
</script>
<style lang="scss" scoped>
.post-detail{
    width: 800px;
    border:1px solid #000;
    margin: 0 auto;
    .header{
        border:1px solid #000;
        img{
            width: 800px;
        }
    }
    .author{
        border:1px solid #000;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .content{
        margin-top: 30px;
    }
}
</style>
