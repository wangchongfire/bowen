<template>
    <div class="editor">
        <textarea ref="textarea"></textarea>
        <button @click="clear">清空</button>
    </div>
</template>
<script setup lang="ts">
import EasyMDE,{Options} from 'easymde';
import { onMounted, ref,defineExpose ,defineProps,defineEmits, onUnmounted, watch} from 'vue';

const props = defineProps({
    modelValue:{
        type:String,
    }
});
const emit = defineEmits(['update:modelValue','blur']);

const curVal = ref( props.modelValue || '');
watch(() => props.modelValue,(newValue) => {
    easyMDEInstance.value(newValue);
})

const textarea = ref<null | HTMLTextAreaElement>(null);
let easyMDEInstance:EasyMDE | null;
onMounted(() => {
    if(textarea.value){
        const config:Options = {
            element:textarea.value,
            initialValue:curVal.value
        }
        easyMDEInstance = new EasyMDE(config);

        // 监控对应事件
        easyMDEInstance.codemirror.on('change',() => {
            if(easyMDEInstance){
                const newVal = easyMDEInstance.value();
                curVal.value = newVal;
                emit('update:modelValue',newVal);
            }
        });
        easyMDEInstance.codemirror.on('blur',() => {
            if(easyMDEInstance){
                emit('blur');
            }
        })
    }
});
onUnmounted(() => {
    if(easyMDEInstance){
        easyMDEInstance.cleanup();
    }
    easyMDEInstance = null;
});
const clear = () => {
    if(easyMDEInstance){
        easyMDEInstance.value('');
    }
}
const getMDEInstance = () => {
    return easyMDEInstance;
}
defineExpose({
    clear,
    getMDEInstance
});
</script>
<style lang="scss" scoped>
.editor{
    border: 1px solid #000;
}
</style>