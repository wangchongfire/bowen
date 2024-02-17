import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import store from './store'


const app = createApp(App)
app.use(ElementPlus).use(store).use(router);
app.mount('#app')
