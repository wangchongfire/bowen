<template>
  <div id="app">
    <GlobalHeader :user="userData" />
    <!-- <ColumnList :list="testData"/> -->
    <ValidateForm @form-submit="handleFormSubmit">
      <ValidateInput
        ref="inputRef"
        type="text"
        v-model:modelValue="emailVal"
       :rules="emailRules">
        <div>邮箱：</div>
      </ValidateInput>
      <ValidateInput type="password">
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
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { IUser } from './components/GlobalHeader.vue'
import ValidateForm from './components/ValidateForm.vue'
import ValidateInput, { IRuleProp } from './components/ValidateInput.vue';

// 表单数据之邮箱数据的响应式
const emailVal = ref('init email');
// 传给表单输入框验证的 校验规则
const emailRules: IRuleProp[] = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]

// 获取ValidateInput组件的实例
const inputRef = ref<any>();
// 处理表单组件注册的事件
const handleFormSubmit = (flag:boolean) => {
  // alert(flag);
  console.log(inputRef.value);
  console.log(inputRef.value.validateInput());
  
}


// 传给首页header的数据
const userData: IUser = {
  isLogin: true,
  name: 'jack',
  id: 101
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>