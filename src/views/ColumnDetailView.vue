<template>
    <!-- <pre>{{ route }}</pre> -->
    <div class="container">
        <div class="user">
            <div class="left">
                <img :src="userDetail.avatar"/>
            </div>
            <div class="right">
                <h1>{{ userDetail.title }}</h1>
                <div>{{ userDetail.description }}</div>
            </div>
            <hr />
        </div>
        <div class="articles">
            <div v-for="(article,index) in userArticles" :key="index" class="article">
                <h1>{{ article.title }}</h1>
                <div class="ar-body">
                    <div class="ar-left">
                        <img :src="article.image"/>
                    </div>
                    <div class="ar-right">
                        {{ article.content }}
                    </div>
                </div>
                <div class="ar-time">
                    {{ article.createdAt }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { GlobalDataProps } from "@/store";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {useStore} from 'vuex';

const route = useRoute();
const store = useStore<GlobalDataProps>();
const id = route.params.id;

const userDetail = computed(() => {
    return store.getters.getColumnById(parseInt(id as string));
});

const userArticles = computed(() => {
    return store.getters.getArticlesById(parseInt(id as string));
})
</script>
<style lang="scss">
.container{
    width:1100px;

    .user{
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #524d4d;
        .left{
            width: 200px;
            height: 200px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .right{
            width: 800px;
            height: 200px;
            padding-top: 30px;
            padding-left: 30px;
            h1{
                margin-bottom: 20px;
            }
        }
    }

    .articles{
        padding: 30px;
        .article{
            border: 1px solid #8d8181;
            margin-top: 30px;
            .ar-body{
                display: flex;
                .ar-right{
                    margin: 10px 30px;
                }
            }
        }
    }
}
</style>