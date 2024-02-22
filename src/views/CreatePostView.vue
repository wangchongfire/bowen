<template>
    <div class="container">
        <UploaderComponent
        :curImgUrl="curPostImgUrl" 
        @file-upload-success="onFileUploadSuccess"
        @file-upload-fail="onFileUploadFail"
        action="/upload" 
        :beforeUpload="beforeUpload">
            <template #succss="soltProps"> 
                <img :src="soltProps.uplodaedImgUrl"/>
            </template>
        </UploaderComponent>
        
        <ValidateForm @form-submit="handleFormSubmit">
            <template #title>
                <div v-if="!isEditMode">新建文章</div>
                <div v-else>编辑文章</div>
            </template>
            <ValidateInput type="text" :rules="titleRule" tag="input" v-model:modelValue="titleVal"
            placeholder="请输入文章标题"
            >
                <div>文章标题：</div>
            </ValidateInput>
            <div :class="{editor:true,borderWarn:isEmpty}">
                <MdEditor v-model="detailVal" @blur="checkEditor"/>
                <div class="div" v-if="editorStatus.isVisible">{{ editorStatus.message }}</div>
            </div>
            <template #submit>
                <el-button type="primary">发表文章</el-button>
            </template>
        </ValidateForm>
    </div>
</template>
<script lang="ts" setup>
import ValidateInput, { IRuleProp } from '@/components/ValidateInput.vue';
import ValidateForm from '@/components/ValidateForm.vue';
import {  reactive, ref, watchEffect } from 'vue';
import axios from 'axios';
import UploaderComponent from '@/components/UploaderComponent.vue';
import {createMessage} from '../hooks/UseCreateMessage';
import {ResponseType,ImageProps,PostProps} from '../store/index';
import {beforeUploadCheck} from '../hooks/helper';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const titleRule: IRuleProp[] = [
    { type: 'required', message: '文章标题不能为空' }
]

const store = useStore();
const router = useRouter();
const route = useRoute();

const isEditMode = !!route.query.id;
const curPostImgUrl = ref('');
let postId = '';

const titleVal = ref('');
const detailVal = ref('');
let imageId = '';

let isEmpty = ref(false);
const editorStatus = reactive({
    isVisible:false,
    message:'',
})

const checkEditor = () => {
    if(detailVal.value){
        editorStatus.isVisible = false;
        editorStatus.message = '';
        isEmpty.value = false;
    }else{
        editorStatus.isVisible = true;
        editorStatus.message = '文章内容不能为空！';
        isEmpty.value = true;
    }
}

const getPost = async () => {
    if(isEditMode){
        const {data} = await axios.get(`/posts/${route.query.id}`);
        curPostImgUrl.value = data.data.image?.url;
        // console.log(data.data);
        titleVal.value = data.data.title;
        detailVal.value = data.data.content;
        postId = data.data._id;
    }
}
watchEffect(() => {
    getPost();
})

// 
const handleFormSubmit = (result:boolean) => {
    checkEditor();
    if(result && !editorStatus.isVisible){
        const {column,_id} = store.state.user;
        if(column){
            const newPost:PostProps = {
                title:titleVal.value,
                content:detailVal.value,
                column,
                author:_id,
            }
            if(imageId){
                newPost.image = imageId;
            }
            let p:Promise<any>;
            if(!isEditMode){
                p = store.dispatch('createPost',newPost);
            }else{
                newPost._id = postId;
                p = store.dispatch('updatePost',{id:postId,newPost:newPost});
            }

            p.then(() => {
                createMessage('success','发表成功，2秒后跳转到文章！');
                setTimeout(() => {
                    router.push({name:'column',params:{id:column}});
                },2000);
            })
        }
    }
}

const beforeUpload = (file:File):boolean => {
    const result = beforeUploadCheck(file,{format:['image/jpeg', 'image/png'],size:1});
    const {passed,error} = result;
    if(error === 'format'){
        createMessage('error','上传图片只能是 JPG/PNG 格式!');
    }
    if(error === 'size'){
        createMessage('error','上传图片大小不能超过 1Mb!');
    }
    return passed;
}

const onFileUploadSuccess = (data:ResponseType<ImageProps>):void => {
    imageId = data.data._id;//图片上传成功，将id取出来用于后续提交文章
    createMessage('success',`上传图片ID为：${data.data._id}`);
}
const onFileUploadFail = (err) => {
    createMessage('error',err);
}
</script>
<style lang="scss" scoped>
.editor{
    height: 530px;
    box-sizing: border-box;
   .div{
    color:red;
   }
}
.borderWarn{
    border: 1px solid #f30505;
}
</style>
