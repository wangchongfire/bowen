<template>
    <input type="file" ref="fileInput"
    @change.prevent="handleFileChange"
    class="input"
    />
    <button @click="triggerUpload">
        <slot  v-if="fileStatus==='ready'" name="ready">
            <span>点击上传</span>
        </slot>
        <slot v-else-if="fileStatus==='loading'" name="loading">
            <span>正在上传...</span>
        </slot>
        <slot
        :uplodaedData="uploadData"
        v-else-if="fileStatus==='success'" name="succss">
            <span>上传成功</span>
        </slot>
        <slot v-else-if="fileStatus==='error'" name="error">
            <span>上传失败</span>
        </slot>
    </button>
</template>
<script lang="ts" setup>
import { ref, defineProps,defineEmits, PropType } from 'vue'
import axios from 'axios';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckFile = (file:File) => boolean;


const props = defineProps({
    action:{
        type:String,
    },
    beforeUpload:{
        type:Function as PropType<CheckFile>,
    }
});
const emit = defineEmits(['file-upload-success','file-upload-fail']);

const uploadData = ref();
const fileInput = ref<null | HTMLInputElement>(null);
const fileStatus = ref<UploadStatus>('ready');
const triggerUpload = () => {
    fileInput.value.click();
}

const handleFileChange = (e:Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if(props.beforeUpload){
        const res = props.beforeUpload(files[0]);
        if(!res){
            return;
        }
    }

    if(files){
        fileStatus.value = 'loading';
        const uploadedFile = files[0];
        const formData = new FormData();
        formData.append(uploadedFile.name,uploadedFile);
        axios.post(props.action,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res);
            fileStatus.value = 'success';
            uploadData.value = res.data;
            emit('file-upload-success',res.data);
        }).catch(err => {
            // console.log(err);
            fileStatus.value = 'error';
            emit('file-upload-fail',err);
        }).finally(() => {
            if(fileInput.value){
                fileInput.value.value = '';
            }
        })
    }
}
</script>
<style scoped lang="scss">
.input{
    display: none;
}
</style>
  