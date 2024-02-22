import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface GlobalErrorProps {
    status: boolean;
    message?: string;
}

export const useGlobalStore = defineStore('global',() => {
    const error = reactive<GlobalErrorProps>({status:false});
    const loading = ref(false);

    const setError = (e:GlobalErrorProps):void => {
        error.status = e.status;
        error.message = e.message;
    }
    const setLoading = (status:boolean):void => {
        loading.value = status;
    }
    
    return {error,loading,setError,setLoading};
})