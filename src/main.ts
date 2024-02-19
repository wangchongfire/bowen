import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import store from './store';
import axios from 'axios';

// axios.defaults.baseURL = 'http://apis.imooc.com/api';
// axios.interceptors.request.use(config => {
//     config.params = {...config.params,icode:'71E023A54874772F'};

//     store.state.loading = true;
//     return config;
// });

// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
axios.interceptors.request.use(config => {
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '71E023A54874772F' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '71E023A54874772F')
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '71E023A54874772F' }
  }
  return config
})

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
