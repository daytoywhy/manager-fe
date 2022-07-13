import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/js/permission'
import store from './store'

console.log(import.meta.env);
const app =createApp(App)
app.use(router).use(ElementPlus).use(store).mount('#app')
