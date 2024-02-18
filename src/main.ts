import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://apis.imooc.com/api';
axios.interceptors.request.use(config => {
    config.params = {...config.params,icode:'71E023A54874772F'};

    store.state.loading = true;
    return config;
});
axios.interceptors.response.use(config => {
    store.state.loading = false;
    return config;
});

// axios.get('/columns').then(res => {
//     console.log(res.data);
    
// });

const app = createApp(App)
app.use(ElementPlus).use(store).use(router);
app.mount('#app')
