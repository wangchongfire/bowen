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
            <el-button type="danger">删除</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {  computed, reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import { useStore } from "vuex";
import { UserProps } from "../store/index";

const route = useRoute();
const store = useStore();

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
    const userId = store.state.user._id;
    if(post.value && post.value.author){
        const curAuthor = postObj.post.author as UserProps;
        return curAuthor._id === userId;
    }
    return false; 
})
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
