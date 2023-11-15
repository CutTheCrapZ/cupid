<!--  -->
<template>
  <div class="container">
    <TransitionGroup name="fade" tag="div">
      <div @click="detail(item)" class="album" style="width: 20%;" v-for="(item, i) in data" :key="i"
        :style="{ height: item.position.height, width: item.position.width, top: item.position.top, left: item.position.left }">
        <img :src="item!.src" loading="lazy" alt="">
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang='ts' setup>
import { getAssetsFile } from "@/utils/common";
import { ref, onMounted, nextTick } from 'vue'
import { getStyleList } from "@/api/common";
import { useRouter } from 'vue-router';
import { getFileChildren } from "@/api/oneDrive";
const data = ref<{ src: string, position: { height: number, width: number, top: number, left: number }, id: string }[]>([])//图片列表
const heightList = ref<number[]>([])//高度数组，每一列的高度
const itemWidth = ref<number>(0);
const getWindowInfo = () => {
  const windowInfo = {
    width: window.innerWidth,
    hight: window.innerHeight
  }
  switch (true) {
    case (windowInfo.width > 1440):
      heightList.value = Array.from({ length: 5 }, (x, i) => 0);
      break;
    case (windowInfo.width > 1160):
      heightList.value = Array.from({ length: 4 }, (x, i) => 0);
      break;
    case (windowInfo.width > 878):
      heightList.value = Array.from({ length: 3 }, (x, i) => 0);
      break;
    default:
      heightList.value = Array.from({ length: 2 }, (x, i) => 0);
      break;
  }
  //根元素像素
  let rootPx = document.documentElement.style.fontSize.replace("px", "")
  //计算边距
  let pd = heightList.value.length * Number(rootPx) * 2
  // 每个图片宽度
  itemWidth.value = (window.innerWidth - pd) / heightList.value.length

};
const debounce = (fn: Function, delay: number | undefined) => {
  let timer: number | null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = Number(setTimeout(() => {
      fn();
    }, Number(delay)))
  }
};
const getImage = async (src: string, i: number) => {
  console.log(src);
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    img.onload = () => {
      let rootPx = document.documentElement.style.fontSize.replace("px", "")//根元素fontsize
      let index = heightList.value.indexOf(Math.min(...heightList.value))//取高度数组最小值下标
      //加载的每个图片宽高根据定宽计算高度
      img.height = (img.height * itemWidth.value) / img.width
      let left = index * itemWidth.value + index * Number(rootPx) * 2//定位X
      let top = heightList.value[index] // 定位Y
      heightList.value[index] += img.height + Number(rootPx) * 2//拼接最低高度
      img.width = itemWidth.value
      console.log({ src: src, position: { height: img.height + "px", width: img.width + "px", top: top + "px", left: left + "px" } });

      // return { src: src, position: { height: image.height + "px", width: image.width + "px", top: top + "px", left: left + "px" } }
      resolve({ src: src, position: { height: img.height + "px", width: img.width + "px", top: top + "px", left: left + "px" } })
    }
    img.onerror = (e,a) => {
      console.log(e,a,431432);
      reject(e)

    }
  })
}
const observe = () => {
  let imgs = document.querySelectorAll(".album")
  // 观察最后一行的第一个被渲染的元素, 不管它所在的高度如何, 它在最后一行第一个被渲染
  // 那么它渲染之前所在的列是最低高度, 那么它就会是最后一行第一个出现在可视区的
  // 那么就可以观察它的出现, 这是就可以进行请求了
  // 上面的情况是刚好渲染够每一列, 如果最后一行没有渲染满, 就不能这样计算了
  // 那么就将多的那一列去掉, 再计算
  // let index = data.value.length - heightList.value.length + 1
  let index = data.value.length - (data.value.length % heightList.value.length) - heightList.value.length + 1
  console.log(index);
  console.log(imgs);

  // 创建一个观察者对象, 这个对象会在观察物出现和离开可视区执行构造函数中的回调函数
  // 回调函数中两个参数, 一个是被观察对象触发时的各种数据, 一个是观察者实例对象
  const obser = new IntersectionObserver((config, observe) => {
    // 这里面是触发后的回调函数
    // config[0].intersectionRatio属性记录了元素的在可视区的比例
    // 最开始会执行一次, 因为比例是0, 当出现在可视区后, 它的比例 > 0, 具体要看一次滑动出现了多少
    // 懒加载这样的思路是, 被观察的元素(第一次加载渲染到页面上的最后一行的最高位置的元素出现在可视区, 说明下面一行没了, 且即将出现空白)
    // 就可以进行请求了, 同时移除这个观察者, 观察新的一批
    // console.log('触发了', config)
    if (config[0].intersectionRatio > 0) {
      // unobserve()停止观察某个对象
      observe.unobserve(imgs[index])
      //disconnect停止观察, 观察者失效
      // observe.disconnect(imgs[index])
      // 重新执行load方法, 且这个观察方法也是在那里调用的, 会增加新的观察对象
      getdata();
    }
  })
  // 观察一个dom(也可以多个)
  // obser.observe(imgs[0], imgs[0])
  obser.observe(imgs[index])
}
// 获取图片
// const reqData = ref<{ curPage: number, pageSize: number }>({ curPage: 1, pageSize: 10 })
const reqData = ref<{ curPage: number, pageSize: number, total: number }>({ curPage: 1, pageSize: 20, total: 0 })
const getdata = async () => {
  reqData.value.pageSize = heightList.value.length * 4
  try {
    let res = await getStyleList(reqData.value)
    if (res.code === 200) {
      console.log(res);

      reqData.value = res.pagination
      let arr = res.list.map(async (ele: { imgUrl: string[], _id: string }, i: number) => {
        let e = await getImage(ele.imgUrl[0], i) as { src: string, position: {} }
        let obj = { name: "xxx", src: ele.imgUrl[0], id: ele._id, position: e.position }
        return obj
      })
      console.log(arr);

      Promise.all(arr).then(async res => {
        data.value.push(...res)
        console.log(res);
        await nextTick()
        observe();
      }).catch((e) => {
        console.log(e, "error");

      })
    }
  } catch (error) {
    throw new Error(error as string);

  }
}
//跳转详情
const router = useRouter()
const detail = (item: { id: string }) => {
  router.push({ path: "/style/detail", query: { id: item.id } })
}
onMounted(() => {
  const cancalDebounce = debounce(getWindowInfo, 500);
  window.addEventListener('resize', cancalDebounce);
  getWindowInfo();
  getdata();
})

</script>
<style lang='scss' scoped>
.fade-enter-active {
  transition: all .7s ease-out;
}

.fade-leave-active {
  transition: all .7s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translate3d(0, 40%, 0);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.container {
  // display: flex;
  // flex-wrap: wrap;
  position: relative;

  .album {
    padding: 1rem;
    position: absolute;
    box-sizing: content-box;

    img {
      border-radius: .5rem;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

}
</style>