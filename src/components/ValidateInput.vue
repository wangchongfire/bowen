<template>
    <div class="form-input">
        <slot></slot>
        <input 
        v-if="tag === 'input'"
        v-bind="$attrs"
        @blur="validateInput"
        @input="updateVal"
        v-model="inputRef.val" autosize />
        <textarea
        v-else
        v-bind="$attrs"
        @blur="validateInput"
        @input="updateVal"
        v-model="inputRef.val" autosize />
        <p v-if="inputRef.error" v-text="inputRef.message"></p>
    </div>
</template>
<script setup lang="ts">
import { PropType,defineExpose, reactive,defineOptions,defineEmits,defineProps, onMounted} from 'vue';
import {emitter} from '../../src/hooks/UseMitt';

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 定义验证规则的接口
interface IRuleProp{
    type:'required' | 'email';
    message:string;
}
type TagType = 'input' | 'textarea';
// 设置根组件不继承属性
defineOptions({
    inheritAttrs:false,
})
// 接受父组件传来的值，包括验证规则、双向绑定的数据modelValue
const props = defineProps({
    rules:Array as PropType<IRuleProp[]>,
    modelValue:String,
    tag:{
        type:String as PropType<TagType>,
        default:'text',
    }
});
// 响应式的信息，
const inputRef = reactive({
    val: props.modelValue || "",//输入框绑定的值
    message:'',//绑定的错误提示信息
    error:false,//输入信息是佛正确
});
// 遍历传入的数组，检验输入值是否符合每一个规则
const validateInput = ():boolean => {
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
        return allPassed;
    }
    return true;
}
defineExpose({
    validateInput,
})
const emit = defineEmits(['update:modelValue']);
// 监听输入框的数据更新
const updateVal = () => {
    emit('update:modelValue',inputRef.val);
}

onMounted(() => {
    emitter.emit('form-item-created',validateInput);
})
</script>
<style lang="scss" scoped>
.form-input{
    margin: 30px 0;
    input{
        width:100%;
    }
    textarea{
        width: 100%;
        height: 400px;
    }
}
</style>