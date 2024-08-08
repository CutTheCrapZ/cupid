<!--  -->
<template>
  <div class="weibo">
    <h1 class="post-card-title">zoey的随笔</h1>

    <TransitionGroup name="fade" tag="div">
      <div v-for="item in list" :key="item._id" class="sentence">
        <div class="header">
          <span class="username">Zoey💘</span>
          <span class="dot">·</span>
          <span class="date">{{ item.created_d.slice(0, 10) }}</span>
          <span class="tag" :style="{ backgroundColor: tag[item.tag].background, color: tag[item.tag].color }">{{
            tag[item.tag].text }}</span>
        </div>
        <div class="contentz">
          {{ item.sentences }}
        </div>
        <div class="footer"></div>
      </div>
    </TransitionGroup>

  </div>
</template>
  
<script lang='ts' setup>
import { onMounted, ref, nextTick } from "vue";
import { getStyleList } from "@/api/sentence";
onMounted(() => {
  getList()
})
const tag = [
  { text: "💬一言", background: "rgb(249, 208, 169)", color: "black" },
  { text: "💬一言©", background: "rgb(130, 21, 150)", color: "white" },
  { text: "💫想法", background: "rgb(121, 85, 72)", color: "white" },
  { text: "👻生活", background: "rgb(171, 252, 198)", color: "black" }
]
const reqData = ref<{ curPage: number, pageSize: number, total: number }>({ curPage: 1, pageSize: 20, total: 0 })
const list = ref<{ _id: string, tag: number, sentences: string, created_d: string }[]>([]);
const getList = async () => {
  let res = await getStyleList(reqData.value)
  if (res.code === 200) {
    list.value = [...list.value, ...res.list]
    reqData.value = res.pagination
    if (reqData.value.curPage * reqData.value.pageSize < reqData.value.total) { console.log(333);observe() }else{

    };
  }
}
const observe = () => {
  nextTick(() => {
    let dom = document.querySelectorAll(".sentence")
    const o = new IntersectionObserver((config, observe) => {
      if (config[0].intersectionRatio > 0) {
        reqData.value.curPage += 1
        getList()
        o.unobserve(dom[dom.length - 3])
      }
    })
    o.observe(dom[dom.length - 3])
  })

}
</script>
<style lang='scss'>
.weibo {
  padding: 1.75rem 28%;
  width: 100%;
  background-image: linear-gradient(180deg, #f5f1f1 30%, #eff1f3 45%, #f7f4ee 71%, #efefef 91%);

  @media screen and (max-width: 560px) {
    width: 100% !important;
    padding: 12%;
  }

  .sentence {
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.1rem;
    background-color: rgba(255, 255, 255, .6);
    transition: .4s ease-in-out;
    box-shadow: 0 0.625em 3.75em 0 #eaeaea;

    .header {
      @include flex(start, center, row, nowrap);

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
        margin-right: auto;
        margin-left: 0.3rem;
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
</style>