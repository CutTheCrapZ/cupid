<!--  -->
<template>
  <div class="weibo">
    <h1 class="post-card-title">xxxxx</h1>

    <TransitionGroup name="fade" tag="div">
      <div v-for="item in list" :key="item._id" class="sentence">
        <div class="header">
          <span class="username">Zoey💘</span>
          <span class="dot">·</span>
          <span class="date">2023-01-01</span>
          <span class="tag" :style="{ backgroundColor: tag[item.tag].background, color: tag[item.tag].color }">{{
            tag[item.tag].text }}</span>
        </div>
        <div class="content">
          {{ item.sentences }}
        </div>
        <div class="footer"></div>
      </div>
    </TransitionGroup>

  </div>
</template>
  
<script lang='ts' setup>
import { onMounted, ref } from "vue";
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
const list = ref<{ _id: string, tag: number, sentences: string }[]>([]);
const getList = async () => {
  let res = await getStyleList(reqData.value)
  if (res.code === 200) {
    list.value = res.list
    reqData.value = res.pagination
  }
}
</script>
<style lang='scss' scoped>
.weibo {
  padding: 1.75rem;
  width: 50%;
  margin: 0 auto;

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
        padding: 5px 6px;
        font-size: .7rem;
        border-radius: 3px;
        box-shadow: inset 0 -1px 0 rgba(27, 31, 35, .12)
      }

      .dot,
      .date {
        color: #a1a1a1;
        text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
      }
    }

    .content {
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