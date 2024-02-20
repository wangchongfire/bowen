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
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import MarkDownIt from 'markdown-it';


const route = useRoute();
const md = new MarkDownIt();

const postObj = reactive({post:{}});
const {post} = toRefs(postObj);
const getCurPost = async () => {
    const data = await axios.get(`/posts/${route.params.id}`);
    postObj.post = data.data.data;
}
watchEffect(() => {
    getCurPost();
});
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
