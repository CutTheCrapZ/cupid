<template>
  <div class="demo">
    <h1 class="post-card-title">zoey的demo合集</h1>

    <TransitionGroup name="fade" tag="div">
      <div
        v-for="item in list"
        :key="item._id"
        class="sentence"
        @click="toPage(item.src)"
      >
        <div class="header">
          <span class="username">{{ item.name }}</span>
          <span class="dot">·</span>
          <span class="date">{{ item.created_d.slice(0, 10) }}</span>
        </div>
        <div class="contentz" v-html="item.content"></div>
        <div class="footer"></div>
      </div>
    </TransitionGroup>
    <router-view v-slot="{ Component }" class="router">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const list = ref<
  {
    _id: string;
    content: string;
    name: string;
    created_d: string;
    src: string;
  }[]
>([
  {
    _id: "1",
    name: "哔哩哔哩banner",
    content: `<p>B站首页顶部景深效果的 Banner 简易实现</p><p>
『重点』
1. 比例计算
2. 高斯模糊</p>`,
    created_d: "2024-7-25",
    src: "bilibiliBanner",
  },
  {
    _id: "2",
    name: "canvas绘制地图",
    content: `<p>根据png图片通过canvas绘制地图</p><p>
        『重点』
1. 根据透明度获取图片模型实现交互 getImageData</p>`,
    created_d: "2024-9-25",
    src: "map",
  },
]);
const toPage = (page: string) => {
  router.push({ name: page });
};
</script>
<style lang="scss" scoped>
.demo {
  padding: 1.75rem 28%;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(
    180deg,
    #f5f1f1 30%,
    #eff1f3 45%,
    #f7f4ee 71%,
    #efefef 91%
  );

  @media screen and (max-width: 560px) {
    width: 100% !important;
    padding: 12%;
  }

  .sentence {
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.1rem;
    background-color: rgba(255, 255, 255, 0.6);
    transition: 0.4s ease-in-out;
    box-shadow: 0 0.625em 3.75em 0 #eaeaea;

    .header {
      @include flex(start, center, row, nowrap);

      .username {
        font-weight: 600;
        font-size: 0.9rem;
        color: #132850;
        text-decoration: none;
      }

      .dot {
        margin: auto 0.3em;
      }

      .date {
        margin-right: auto;
        margin-left: 0.3rem;
        font-size: 0.75rem;
        font-weight: lighter;
      }

      .tag {
        margin-left: auto;
        padding: 0.15rem 0.25rem;
        font-size: 0.7rem;
        border-radius: 3px;
        box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
        font-family: Comic Sans MS, Helvetica Neue, Microsoft Yahei,
          -apple-system, sans-serif;
      }

      .dot,
      .date {
        color: #a1a1a1;
        text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
      }
    }

    .contentz {
      margin: 0.5rem 0 1rem;
      font-size: 0.75rem;
      letter-spacing: 1px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    }
  }

  .sentence:hover {
    box-shadow: 0 0.35em 3rem 0.4rem #d7d7d7;
    transform: translateY(-3px);
  }

  .router {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      180deg,
      #f5f1f1 30%,
      #eff1f3 45%,
      #f7f4ee 71%,
      #efefef 91%
    );
  }
}

.fade-enter-active {
  transition: all 0.7s ease-out;
}

.fade-leave-active {
  transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translate3d(0, 40%, 0);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
