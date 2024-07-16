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

const files = import.meta.glob('./views/**/*'); // 自定义规则 **表示匹配任意深度的目录，*表示匹配任意文件名。
console.log(files)
for (let i in files) {
    const newName = i.replace(/.\/views\//, '').replace(/.vue/, '');
    if (!i.includes('components')) {
        let arr=i.split("/")
        console.log(123,arr, i, files[i]);
        //   router.addRoute({
        //     path: '/' + newName.toLocaleLowerCase(),
        //     name: newName,
        //     component: files[i],
        //   });
    }


}

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
//获取页面静态资源加载信息
const resourceList: any = []
new PerformanceObserver((list) => {
    list
        .getEntries().forEach((entry: any) => {
            if (entry.name.includes('https://graph.microsoft.com')) return//微软服务器忽略
            if ((entry.transferSize / 1024 > 10) && entry.duration > 500) {
                resourceList.push({
                    name: entry.name, // 资源名称
                    loadTime: `${(entry.duration / 1000).toFixed(3)}s`, // 资源加载时间
                    type: entry.initiatorType, // 资源类型
                    size: `${(entry.transferSize / 1024).toFixed(0)}kb`, // 资源大小
                })
                console.warn(`
                该资源大小超过10kb且加载时间超过500毫秒
                资源名称:${entry.name}
                资源类型:${entry.initiatorType}
                资源大小:${(entry.transferSize / 1024).toFixed(0)}kb(${entry.transferSize})
                加载时间:${(entry.duration / 1000).toFixed(3)}s(${entry.duration})
                `)
            }
            else if (entry.duration > 500) {
                console.warn(`
                该资源加载时间超过500毫秒
                资源名称:${entry.name}
                资源类型:${entry.initiatorType}
                资源大小:${(entry.transferSize / 1024).toFixed(0)}kb(${entry.transferSize})
                加载时间:${(entry.duration / 1000).toFixed(3)}s(${entry.duration})
                `)
            }
        })
}).observe({ entryTypes: ['resource'] })
const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
        if (entry.name === 'first-paint') {
            observer.disconnect()
            console.log(`FP:${(entry.startTime / 1000).toFixed(3)}s(${entry.startTime})
            从页面加载开始到第一个像素绘制到屏幕上的时间，也可以把 FP 理解成白屏时间。`)
        }
    }
}

const observer = new PerformanceObserver(entryHandler)
observer.observe({ type: 'paint', buffered: true })
