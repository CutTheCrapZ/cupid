<template>
    <div>
        <div class="bilibiliBanner" ref="bilibiliBanner" @mouseenter="mouseEnter" @mouseleave="mouseLeave"
            @mousemove="mouseMove">
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/1.png"
                    style="filter: blur(4px); transform: translate(0px, 0px) rotate(0deg);">
            </div>
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/2.png"
                    style="transform: translate(0px, 0px) rotate(0deg); filter: blur(0px);">
            </div>
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/3.png"
                    style="transform: translate(-58.0645px, 0px) rotate(0deg); filter: blur(1px);">
            </div>
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/4.png"
                    style="transform: translate(0px, 4.87742px) rotate(0deg); filter: blur(4px);">
            </div>
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/5.png"
                    style="transform: translate(0px, -2.09032px) rotate(0deg); filter: blur(5px);">
            </div>
            <div class="layer">
                <img src="@/assets/images/bilibiliBanner/6.png"
                    style="filter: blur(6px); transform: translate(0px, 0px) rotate(0deg);">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getAssetsFile } from "@/utils/common";
const bilibiliBanner = ref<HTMLElement>();
let imgs = []
onMounted(() => {
    imgs = document.querySelectorAll('img');
})
let l, _l
//绑定事件
function mouseEnter(e) {
    imgs.forEach(item => {
        item.style.transition = 'none';
    })
    //获取鼠标移入 container 的位置
    l = e.clientX;
}
function mouseMove(e) {
    //控制第一张图的位置与模糊  1920    4
    _l = e.clientX;
    let disX = (_l - l);
    let blur_1_change = disX / (1920 / 4);
    let blur_1 = 4 + blur_1_change;
    //设置第一张图的模糊
    imgs[0].style.filter = `blur(${blur_1}px)`;
    //计算第二张图的位置与模糊
    //位置  1920   translateX 10   可以为负值
    //模糊  1920   blur    10      绝对为正数
    let translateX = disX / (1920 / 10);
    let blur_2 = Math.abs(disX / (1920 / 10));
    imgs[1].style.transform = `translate(${translateX}px, 0px) rotate(0deg)`;
    imgs[1].style.filter = `blur(${blur_2}px)`

    //计算第三张图的位置与模糊
    //位置  1920   translateX 35   可以为负值  -58px
    //模糊  1920   blur    5      绝对为正数   1
    let translateX_3 = disX / (1920 / 35);
    let blur_3 = Math.abs(1 + disX / (1920 / -5));//
    imgs[2].style.transform = `translate(${translateX_3}px, 0px) rotate(0deg)`;
    imgs[2].style.filter = `blur(${blur_3}px)`

    //计算第四张图的位置与模糊
    //位置  1920  42    向右移动增加            初始值为 0
    //模糊  1920  9     向右减小  向左增加       初始值为  4
    let translateX_4 = disX / (1920 / 42);
    let blur_4 = Math.abs(4 + disX / (1920 / -9));
    imgs[3].style.transform = `translate(${translateX_4}px, 4.87742px) rotate(0deg)`;
    imgs[3].style.filter = `blur(${blur_4}px)`;

    //计算第五张图的位置与模糊
    //位置  1920  90    向右移动增加            初始值为 0
    //模糊  1920  9     向右减小  向左增加       初始值为  5
    let translateX_5 = disX / (1920 / 90);
    let blur_5 = Math.abs(5 + disX / (1920 / -9));
    imgs[4].style.transform = `translate(${translateX_5}px, -2.09032px) rotate(0deg)`;
    imgs[4].style.filter = `blur(${blur_5}px)`;


    //计算第五张图的位置与模糊
    //位置  1920  113    向右移动增加            初始值为 0
    //模糊  1920  -6     向右减小  向左增加       初始值为  6
    let translateX_6 = disX / (1920 / 113);
    let blur_6 = Math.abs(6 + disX / (1920 / -6));
    imgs[5].style.transform = `translate(${translateX_6}px, 0px) rotate(0deg)`;
    imgs[5].style.filter = `blur(${blur_6}px)`;
}

const mouseLeave = () => {
    imgs.forEach(item => {
        item.style.transition = 'all 0.5s';
    })
    imgs[0].style.filter = 'blur(4px)';
    imgs[0].style.transform = 'translate(0px, 0px) rotate(0deg)';

    imgs[1].style.filter = 'blur(0px)';
    imgs[1].style.transform = 'translate(0px, 0px) rotate(0deg)';

    imgs[2].style.filter = 'blur(1px)';
    imgs[2].style.transform = 'translate(0px, 0px) rotate(0deg)';

    imgs[3].style.filter = 'blur(4px)';
    imgs[3].style.transform = 'translate(0px, 4.87742px) rotate(0deg)';

    imgs[4].style.filter = 'blur(5px)';
    imgs[4].style.transform = 'translate(0px, -2.09032px) rotate(0deg)';

    imgs[5].style.filter = 'blur(6px)';
    imgs[5].style.transform = 'translate(0px, 0px) rotate(0deg)';
}

setInterval(() => {
    setTimeout(() => {
        imgs[1].src = getAssetsFile('bilibiliBanner/2-zha.png');
    });

    setTimeout(() => {
        imgs[1].src = getAssetsFile('bilibiliBanner/2-bi.png');
    }, 100);

    setTimeout(() => {
        imgs[1].src = getAssetsFile('bilibiliBanner/2-zha.png');
    }, 200);

    setTimeout(() => {
        imgs[1].src = getAssetsFile('bilibiliBanner/2.png');
    }, 300);
}, 3000)

</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.bilibiliBanner {
    transform-origin: 0 0;
    width: 100%;
    position: relative;
    height: 180px;
    overflow: hidden;
}

.bilibiliBanner .layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>