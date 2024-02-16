<template>
    <div class="form-input">
        <slot></slot>
        <el-input 
        @blur="validateEmail"
        @input="updateVal"
        v-model="inputRef.val" autosize type="textarea" placeholder="Please input" />
        <p v-if="inputRef.error" v-text="inputRef.message"></p>
    </div>
</template>
<script setup lang="ts">
import { PropType, reactive} from 'vue';

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 定义验证规则的接口
interface IRuleProp{
    type:'required' | 'email';
    message:string;
}
// 接受父组件传来的值，包括验证规则
// eslint-disable-next-line no-undef
const props = defineProps({
    rules:Array as PropType<IRuleProp[]>,
    modelVal:String,
});

// 响应式的信息，
const inputRef = reactive({
    val: "",//输入框绑定的值
    message:'',//绑定的错误提示信息
    error:false,//输入信息是佛正确
});
// 遍历传入的数组，检验输入值是否符合每一个规则
const validateEmail = () => {
    if(props.rules){
        let allPassed = props.rules.every(rule => {
            let passed = true;
            inputRef.message = rule.message;
            switch(rule.type){
                case 'required':
                    passed = (inputRef.val !== '');
                    break;
                case 'email':
                    passed = emailReg.test(inputRef.val);
                    break;
                default:
                    break;
            }

            return passed;
        })
        inputRef.error = !allPassed;
    }
}

// eslint-disable-next-line no-undef
const emit = defineEmits(['updateVal'])
// 监听输入框的数据更新
const updateVal = () => {
    emit('updateVal',inputRef.val);
}
</script>