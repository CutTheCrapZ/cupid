// store/index.ts
import { defineStore } from 'pinia'
// 1. 定义容器、导出容器
// 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
// 参数2：一些选项对象，也就是state、getter和action
// 返回值：一个函数，调用即可得到容器实例

export const useStore = defineStore('main', {
    // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
    // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
    state: () => {
        return {
            info: "pinia 可以使用",
            token: ""
        }
    },
    getters: {},
    actions: {
        async SAVETOKEN(token: string) {
            this.token = token
        }
    }
}
// , {
//     persist: {
//         //默认名称为当前store唯一标识 这里即home
//         key: 'main',
//         //默认localStorage 本地储存 
//         //这里建议临时储存sessionStorage 也可写成window.sessionStorage
//         storage: sessionStorage,
//         //默认当前store里的所有变量都持久化
//         paths: ['token']
//     }
// }
)

// 2. 使用容器中的 state
// 3. 通过 getter 修改 state
// 4. 使用容器中的 action 同步和异步请求
