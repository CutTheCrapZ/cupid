<template>
    <div class="huidongTech">
        <div class="container">
            <div class="nav" @mouseenter="navEnter()" @mouseleave="navLeave()">
                <p class="nav_p" :style="{ opacity: navShow ? 0 : 1 }">我的相册</p>
                <div class="carousel-container">
                    <div class="carousel-wrapper" :style="{ width: navShow ? '100%' : '44%', height: navShow ? '60%' : 'unset' }">
                        <div @click="change(-1)" class="all" :class="{ 'navEnterStyle': navShow }">
                            <img src="@/assets/hd_bg.jpg" alt="">
                            <div class="name"
                                :style="{ opacity: navShow ? 1 : 0 }">
                                全部
                            </div>
                        </div>
                        <div style="overflow-x: hidden;flex-grow: 1;height: 100%;">
                            <div class="list" ref="listDom">
                                <div @click="change(index)" class="item" v-for="(item, index) in data" :key="item.id"
                                    @mouseenter="itemEnter(index)" @mouseleave="itemLeave(index)"
                                    :class="{ 'active': index === currentItem }" ref="item"
                                    :style='{ marginRight: navShow ? "1.51%" : "1.51%", height: navShow ? "6rem" : "2.6rem"  }'>
                                    <img :src="item.poster" alt="">
                                    <div class="name" :style="{ opacity: navShow ? 1 : 0}">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="data.length > 8" class="more" :style="{ opacity: navShow ? 0 : 1 }">
                            ...
                        </div>
                    </div>
                    <p>全部</p>
                    <div v-show="navShow" class="prev-btn" @click="prevSlide()">
                        <img src="@/assets/arrow.png" alt="" srcset="">
                    </div>
                    <div v-show="navShow" class="next-btn" @click="nextSlide()">
                        <img src="@/assets/arrow.png" alt="" srcset="">
                    </div>
                </div>
            </div>
            <div class="title">
                <img src="@/assets/video.png" alt="" srcset="">
                <p>视频</p>
            </div>
            <div class="video" v-if="data.length">
                <div v-for="( item, index ) in  data[0].videoList " :style="{ backgroundImage: `url(${item.poster})` }"
                    @mouseenter="videoEnter(index)" @mouseleave="videoLeave(index)">
                    <div class="first" ref="video">
                        <p class="name"> {{ item.name }}</p>
                        <p class="date"> {{ item.updateTime.split(" ")[1] }}</p>
                    </div>
                    <div class="second">
                        <img src="@/assets/search.png" alt="" srcset="">
                        <p class="check">查看素材</p>
                        <p class="date">更新{{ item.updateTime }}</p>
                    </div>
                </div>
            </div>
            <div class="title">
                <img src="@/assets/video.png" alt="" srcset="">
                <p>图片</p>
            </div>
            <div class="video" v-if="data.length">
                <div v-for="( item, index ) in  data[0].imageList " :style="{ backgroundImage: `url(${item.url})` }"
                    @mouseenter="imageEnter(index)" @mouseleave="imageLeave(index)">
                    <div class="first" ref="image">
                        <p class="name"> {{ item.name }}</p>
                        <p class="date"> {{ item.updateTime }}</p>
                    </div>
                    <div class="second">
                        <img src="@/assets/search.png" alt="" srcset="">
                        <p class="check">查看素材</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
onMounted(() => {
    getList()
})
// 视频&图片
const video = ref()
const videoEnter = (i) => {
    video.value[i].style.opacity = 0
}
const videoLeave = (i) => {
    video.value[i].style.opacity = 1
}
const image = ref()
const imageEnter = (i) => {
    image.value[i].style.opacity = 0
}
const imageLeave = (i) => {
    image.value[i].style.opacity = 1
}
// 点击导航栏
const isRecover = ref(0)
const currentItem = ref(null)
const change = (i) => {
    if (currentItem.value || currentItem.value == 0) item.value[currentItem.value].style.marginTop = "0"
    if (i != -1) {
        isRecover.value = i
        currentItem.value = i
    }
}
// 导航栏单个item
const item = ref()
const itemEnter = (i) => {
    console.log(i)
    item.value[i].style.marginTop = ".6rem"
}
const itemLeave = (i) => {
    if (!isRecover.value && isRecover.value != "-1" && i != currentItem.value)
        item.value[i].style.marginTop = "0"
    isRecover.value = 0
}
// 数据
const data = ref([])
const getList = async () => {
    try {
        const response = await fetch('https://general.feicut.com/resource/project.json');
        if (response.ok) {
            data.value = await response.json();
            // d.value = data;
            console.log(data.value)
            totalSlides.value = data.value / 8
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// 进入导航栏
const navHeight = ref("10rem")
const navShow = ref(false)
const navEnter = () => {
    if (currentItem.value || currentItem.value == 0) item.value[currentItem.value].setAttribute("class", "item active")
    if (currentItem.value || currentItem.value == 0) item.value[currentItem.value].style.marginTop = "0.6rem"
    navShow.value = true
    navHeight.value = "16.5rem"
}
const navLeave = () => {
    if (currentItem.value || currentItem.value == 0) item.value[currentItem.value].setAttribute("class", "item")
    if (currentItem.value || currentItem.value == 0) item.value[currentItem.value].style.marginTop = "0"
    navShow.value = false
    navHeight.value = "10rem"
}
// 滚动条
let currentIndex = ref(0);
const slides = ref();
const totalSlides = ref(3);
const listDom = ref()
const showSlide = (index) => {
    if (index < 0) {
        currentIndex.value = totalSlides.value - 1;
    } else if (index >= totalSlides.value) {
        currentIndex.value = 0;
    } else {
        currentIndex.value = index;
    }
    const offset = -currentIndex.value * 100 + '%';
    console.log(slides)
    listDom.value.style.transform = 'translateX(' + offset + ')';
};

const nextSlide = () => {
    showSlide(currentIndex.value + 1);
};

const prevSlide = () => {
    showSlide(currentIndex.value - 1);
};
</script>
  
<style lang="scss" scoped>
@import "../../assets/style/hdTech.scss";
</style>
  