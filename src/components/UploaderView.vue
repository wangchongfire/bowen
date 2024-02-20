<template>
    <input type="file" ref="fileInput"
    @change.prevent="handleFileChange"
    class="input"
    />
    <button @click="triggerUpload">
        <span v-if="fileStatus==='ready'">点击上传</span>
        <span v-else-if="fileStatus==='loading'">正在上传</span>
        <span v-else-if="fileStatus==='success'">上传成功</span>
        <span v-else-if="fileStatus==='error'">上传失败</span>
    </button>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import axios from 'axios';

const props = defineProps({
    action:{
        type:String,
    }
})

type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
const fileInput = ref<null | HTMLInputElement>(null);
const fileStatus = ref<UploadStatus>('ready');
const triggerUpload = () => {
    fileInput.value.click();
}

const handleFileChange = (e:Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
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
            console.log(res);
            fileStatus.value = 'success';
        }).catch(err => {
            console.log(err);
            fileStatus.value = 'error';
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
  