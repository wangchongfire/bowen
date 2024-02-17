<template>
    <div>login view</div>
    <div>
        <ValidateForm @form-submit="handleFormSubmit">
            <ValidateInput ref="inputRef" type="text" v-model:modelValue="emailVal" :rules="emailRules">
                <div>邮箱：</div>
            </ValidateInput>

            <ValidateInput type="password" v-model:modelValue="passwordVal" :rules="passwordRules">
                <div>密码：</div>
            </ValidateInput>

            <template #submit>
                <el-button type="primary">Primary</el-button>
            </template>
        </ValidateForm>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { IRuleProp } from '../components/ValidateInput.vue';

// 表单数据之邮箱数据的响应式
const emailVal = ref('init email');
// 传给表单输入框验证的 校验规则
const emailRules: IRuleProp[] = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]

// 表单数据之密码数据的响应式
const passwordVal = ref('init password');
const passwordRules: IRuleProp = [
  { type: 'required', message: '密码不能为空' }
]

// 获取ValidateInput组件的实例
const inputRef = ref<any>();
// 处理表单组件注册的事件
const handleFormSubmit = (flag:boolean) => {
  console.log('表单提交结果',flag);
  
}


</script>