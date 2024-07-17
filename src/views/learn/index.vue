<!--  -->
<template>
  <div class="learn">
    <div class="list">
      <div v-for="item in list" :key="item.name" class="sentence" @click="toPage(item.path)">
        <div class="header">
          <span> {{ item.label }}</span>
          <span class="date">{{ item.date }}</span>
        </div>
      </div>
    </div>
    <div style="flex-grow:1;background-color:#fff;margin:1rem;border-radius:10px;padding:.5rem">
      <router-view></router-view>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";


let router = useRouter()
//获取子路由
let r = router.options.routes.filter(ele => {
  return ele.path === "/learn"
})
let currentRouter = ""
const toPage = (page: string) => {
  if (currentRouter == page) return
  currentRouter = page
  console.log(page);
  
  router.push({ name: page })
}
const list = ref<any>(r[0].children)
</script>
<style lang='scss' scoped>
.learn {
  background-image: linear-gradient(180deg, #f5f1f1 30%, #eff1f3 45%, #f7f4ee 71%, #efefef 91%);
  width: 100%;
  min-height: 100%;
  @include flex(space-between);

  .list {
    padding: 1.75rem;
    width: 24%;

    .sentence {
      padding: .5rem .75rem;
      border-radius: 10px;
      margin-bottom: 1.1rem;
      background-color: rgba(255, 255, 255, .6);
      transition: .4s ease-in-out;
      box-shadow: 0 0.625em 3.75em 0 #eaeaea;

      .header {
        @include flex(space-between, center, row, nowrap);
        width: 100%;

        .username {
          font-weight: 600;
          font-size: .9rem;
          color: #132850;
          text-decoration: none;
        }

        .dot {
          margin: auto 0.3em;
        }

        .date {
          font-size: .75rem;
          font-weight: lighter;
        }



        .tag {
          margin-left: auto;
          padding: .15rem .25rem;
          font-size: .7rem;
          border-radius: 3px;
          box-shadow: inset 0 -1px 0 rgba(27, 31, 35, .12);
          font-family: Comic Sans MS, Helvetica Neue, Microsoft Yahei, -apple-system, sans-serif;
        }

        .dot,
        .date {
          color: #a1a1a1;
          text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
        }
      }

      .contentz {
        margin: .5rem 0 1rem;
        font-size: .75rem;
        letter-spacing: 1px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
      }
    }

    .sentence:hover {
      box-shadow: 0 .35em 3rem 0.4rem #d7d7d7;
      transform: translateY(-3px);
    }
  }
}
</style>