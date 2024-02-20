<template>
    <div class="container">
        <input type="file" name="file" @change.prevent="handleFileChange"/>
        <ValidateForm @form-submit="handleFormSubmit">
            <template #title>
                <div>新建文章</div>
            </template>

            <ValidateInput type="text" :rules="titleRule" tag="input" v-model:modelValue="titleVal"
            placeholder="请输入文章标题"
            >
                <div>文章标题：</div>
            </ValidateInput>

            <ValidateInput type="text" :rules="detailRule" tag="textarea" v-model:modelValue="detailVal"
            placeholder="请输入文章详情"
            >
                <div>文章详情：</div>
            </ValidateInput>

            <template #submit>
                <el-button type="primary">发表文章</el-button>
            </template>
        </ValidateForm>
    </div>
</template>
<script lang="ts" setup>
import ValidateInput, { IRuleProp } from '@/components/ValidateInput.vue';
import ValidateForm from '@/components/ValidateForm.vue';
import { ref } from 'vue';
import axios from 'axios';

const titleRule: IRuleProp[] = [
    { type: 'required', message: '文章标题不能为空' }
]
const detailRule: IRuleProp[] = [
    { type: 'required', message: '文章详情不能为空' }
]

const titleVal = ref('');
const detailVal = ref('');
const handleFormSubmit = (result:boolean) => {
    console.log('发表文章校验结果：',result);
    
}

const handleFileChange = (e:Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if(files){
        const uploadedFile = files[0];
        const formData = new FormData();
        formData.append(uploadedFile.name,uploadedFile);
        axios.post('/upload',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            
        })
    }
}
</script>
<style lang="scss" scoped>
</style>
