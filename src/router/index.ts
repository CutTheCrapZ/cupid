import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import pinia from '@/store/pinia';
import { useStore } from "@/store";
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/blog",
    component: () => import("@/views/blog/index.vue"),
  },
  {
    path: "/learn",
    component: () => import("@/views/learn/index.vue"),
    children: [
      {
        path: "recursiveComponents",
        name: "recursiveComponents",
        label: "递归组件",
        component: () => import('@/views/learn/children/recursiveComponents/index.vue')
      },
      {
        path: "dynamicComponents",
        name: "dynamicComponents",
        label: "动态组件",
        component: () => import('@/views/learn/children/dynamicComponents/index.vue')
      },
      {
        path: "keepAlive",
        name: "keepAlive",
        label: "keep-alive",
        component: () => import('@/views/learn/children/keepAlive/index.vue')
      },
      {
        path: "customDirectives",
        name: "customDirectives",
        label: "自定义指令",
        component: () => import('@/views/learn/children/customDirectives/index.vue')
      },
      {
        path: "fontStrokes",
        name: "fontStrokes",
        label: "字体描边",
        component: () => import('@/views/learn/children/fontStrokes/index.vue')
      },

    ],
  },
  {
    path: "/demo",
    component: () => import("@/views/demo/index.vue"),
    children: [
      {
        path: "bilibiliBanner",
        name: "bilibiliBanner",
        component: () => import('@/views/demo/children/bilibiliBanner/index.vue')
      },
    ],
  },
  {
    path: "/weibo",
    component: () => import("@/views/weibo/index.vue"),
  },
  {
    path: "/style",
    component: () => import("@/views/style/index.vue"),
  },
  {
    path: '/style/detail',
    component: () => import("@/views/style/children/index.vue")
  }
  // {
  //   path: "/think",
  //   component: () => import("@/views/think/index.vue"),
  // }
];
// if (import.meta.env.VITE_NODE_ENV != "production") {
//   routes[0].redirect = '/blog'
// }
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const store = useStore(pinia);
// 添加统一判断是否返回
router.afterEach((to, from, failure) => {  // 一定要再afterEach中判断而不是beforeEach，因为beforeEach在点击返回之后获取到的值不准确，每返回一次，会获取到延后一次的to、history
  console.log(to, from, failure)
  if (window.history.state && window.history.state.forward) { // 或者判断 to.forward,window.history.state.forward是vue-router写入的，当返回或前进的时候才会有值
    to.meta.isBack = true;
    if (to.fullPath == '/' && from.fullPath == '/') {
      store.SAVEBACKHOME(false)
    } else {
      store.SAVEBACKHOME(true)
    }
  } else {
    to.meta.isBack = false;
  }
});
// 3导出路由   然后去 main.ts 注册 router.ts
export default router