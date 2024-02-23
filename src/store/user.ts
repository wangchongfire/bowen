import { reactive, ref } from 'vue';
import {ImageProps,ResponseType} from './utils';
import {defineStore} from 'pinia';
import axios from 'axios';

export interface UserDataProps {
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    avatar?: ImageProps;
    description?: string;
}

export interface UserProps {
    token: string;
    isLogin: boolean;
    data: UserDataProps | null;
}

export const useUserStore = defineStore('user',() => {
    const token = ref(localStorage.getItem('token') || '');
    const isLogin = ref(false);
    const data = reactive<UserDataProps | null>({});

    const login = async (email:string,password:string) => {
        const payload = {email,password};
        const {data} = await axios.post<ResponseType>('/user/login',payload);
        token.value = data.data.token;
        localStorage.setItem('token',token.value);
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
    }
    const logout = () => {
        token.value = '';
        isLogin.value = false;
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
    }

    const fetchCurrentUser = async () => {
        const res = await axios.get<ResponseType>('/user/current');
        isLogin.value = true;
        Object.assign(data,res.data.data)
    }

    return {token,isLogin,data,login,logout,fetchCurrentUser};
})