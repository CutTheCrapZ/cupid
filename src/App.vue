<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import { login } from "@/api/common";
import { useRouter } from 'vue-router';
import { R } from "@/interface/user";
//pinia
const store = useStore();
//router
const router = useRouter()
onMounted(() => {
  sessionToken()
  let tokenArr = "zoeyzoey"
  let time: unknown
  let tokenReq: String[] = []
  window.addEventListener("keydown", function (event) {
    if (time) clearTimeout(time as number)
    tokenReq.push(event.key)
    if (tokenReq.join("") === tokenArr) {
      if (!store.token) l()
    }
    time = setTimeout(() => {
      tokenReq = []
    }, 3000);

  });

  window.addEventListener('beforeunload', (event) => {
    store.token && sessionStorage.setItem('token', store.token);
  });

})
const l = async () => {
  let res = await login()
  if (res.code === 200) {
    store.SAVETOKEN(res.token)
    res.list.forEach((ele: R) => {
      router.addRoute({
        path: ele.path as string,
        component: () => require(ele.component as string)
      })
    });
  }
}
const sessionToken = () => {
  let token = sessionStorage.getItem('token')
  if (token) {
    store.SAVETOKEN(token)
    sessionStorage.removeItem('token')
  }
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <Transition name="fade">
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
      </Transition>
    </keep-alive>
    <Transition name="fade">
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </Transition>
  </router-view>
</template>

<style scoped lang="scss">
@import '@/assets/style/animation/transition.scss';//引用此混合样式
.fade-enter-active {
  transition: all .7s ease-out;
}

.fade-leave-active {
  transition: all .7s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from{
  transform: translate3d(0, 40%, 0);
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

</style>
