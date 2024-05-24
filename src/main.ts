import { createApp } from 'vue'
import './style.scss'
import "@/utils/rem"
import 'animate.css';
// import "@/assets/style/font/font.scss"
import App from './App.vue'
import VConsole from 'vconsole';
import router from "@/router/index"
import { createPinia } from 'pinia'
// 引入持久化插件
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(router).use(ElementPlus).use(pinia.use(persist)).mount('#app')

// 判断是否是pc设备
const isPc = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//如果不是生产环境并且不是pc设备那么就显示调试
if (import.meta.env.VITE_NODE_ENV != "production" && !isPc()) {
    console.log(import.meta.env.VITE_NODE_ENV);
    const vConsole = new VConsole();
}
