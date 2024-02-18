<template>
    <div class="container">
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
</script>
<style lang="scss" scoped>
</style>
