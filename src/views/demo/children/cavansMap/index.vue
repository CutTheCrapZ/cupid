<!--  -->
<template>
    <div class="containerx" id="containerx">

        <BoxHeader text="当前故障发生情况" :date="false" />
        <div class="map" :style="{ transform: `scale(${scale})` }">
            <div id="xnBox">
                <img id="xnImgPic" src="@/assets/images/order/xn.png" alt="" srcset="">
                <canvas style="display: none;" id="xnCanvas"></canvas>
            </div>
            <div id="hbBox">
                <img id="hbImgPic" src="@/assets/images/order/hb.png" alt="" srcset="">
                <canvas style="display: none;" id="hbCanvas"></canvas>
            </div>
            <div id="hdBox">
                <img id="hdImgPic" src="@/assets/images/order/hd.png" alt="" srcset="">
                <canvas style="display: none;" id="hdCanvas"></canvas>
            </div>
            <div id="glBox">
                <img id="glImgPic" src="@/assets/images/order/gl.png" alt="" srcset="">
                <canvas style="display: none;" id="glCanvas"></canvas>
            </div>
            <div id="hnBox">
                <img id="hnImgPic" src="@/assets/images/order/hn.png" alt="" srcset="">
                <canvas style="display: none;" id="hnCanvas"></canvas>
            </div>
            <div id="hx2Box">
                <img id="hx2ImgPic" src="@/assets/images/order/hx2.png" alt="" srcset="">
                <canvas style="display: none;" id="hx2Canvas"></canvas>
            </div>
            <div id="huangnBox">
                <img id="huangnImgPic" src="@/assets/images/order/huangn.png" alt="" srcset="">
                <canvas style="display: none;" id="huangnCanvas"></canvas>
            </div>
            <div id="ysBox">
                <img id="ysImgPic" src="@/assets/images/order/ys.png" alt="" srcset="">
                <canvas style="display: none;" id="ysCanvas"></canvas>
            </div>
            <div id="hx3Box">
                <img id="hx3ImgPic" src="@/assets/images/order/hx3.png" alt="" srcset="">
                <canvas style="display: none;" id="hx3Canvas"></canvas>
            </div>
        </div>
        <div class="card">
            <div v-for="(item, index) in cardList" :key="index">
                <p>{{ item.title }}</p>
                <p>{{ item.count }}</p>
            </div>
        </div>
        <!-- <myDialog v-if="dialogData" :open="open" @close="open = false" :columns="columns" :data="dialogData" /> -->
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, computed } from 'vue'
// import myDialog from '@/components/myDialog/index.vue'
import { getAssetsFile } from "@/utils/common";
// import { getWorderAreaData, getMonthWorderAreaCount } from "@/api/order"
interface M {
    box: string,
    img: string,
    canvas: string,
    name: string
    id: string
}
// import { themeConfigStore } from "@/store";

// const store = themeConfigStore()
// const bodyW = computed(() => store.bodyW)
const bodyW = 600
const scale = ref<number>(1 / 1500 * bodyW.value)
const dialogData = ref()
const columns = ref([{ title: "故障发生地点/现象", prop: "title" }, { title: "故障上报时间", prop: "count" }])
const getDialogData = async (id: string) => {
    // dialogData.value = null
    // let { req } = store
    // req.month = new Date().getMonth() + 1 + ""
    // let res = await getWorderAreaData({ area: id, ...req })
    // dialogData.value = res.data
}
const mapTiles: M[] = [
    { box: "hbBox", img: "hbImgPic", canvas: "hbCanvas", name: "海北", id: "489444297200896389" },
    { box: "hx2Box", img: "hx2ImgPic", canvas: "hx2Canvas", name: "海西2", id: "489444669109832069" },
    { box: "huangnBox", img: "huangnImgPic", canvas: "huangnCanvas", name: "黄南藏族", id: "489444523793975685" },
    { box: "hnBox", img: "hnImgPic", canvas: "hnCanvas", name: "海南", id: "489444523793975685" },
    { box: "hdBox", img: "hdImgPic", canvas: "hdCanvas", name: "海东", id: "489444297200896389" },
    { box: "xnBox", img: "xnImgPic", canvas: "xnCanvas", name: "西宁", id: "489443823726889349" },
    { box: "glBox", img: "glImgPic", canvas: "glCanvas", name: "果洛", id: "489444669109832069" },
    { box: "ysBox", img: "ysImgPic", canvas: "ysCanvas", name: "玉树藏族", id: "489444669109832069" },
    { box: "hx3Box", img: "hx3ImgPic", canvas: "hx3Canvas", name: "海西3", id: "489444669109832069" },
]
const cardList = ref<{ title: string, count: string }[]>([{ title: "", count: "" }])
onMounted(async () => {
    // let { req } = store
    // req.month = new Date().getMonth() + 1 + ""
    // let res = await getMonthWorderAreaCount(req)
    let res={data:[]}
    cardList.value = res.data
    // // 把image 转换为 canvas对象
    // function convertImageToCanvas(image: HTMLImageElement) {
    //     // 创建canvas DOM元素，并设置其宽高和图片一样 
    //     var canvas = document.createElement("canvas");
    //     console.log(image.width);
    //     console.log(image.style.width);

    //     canvas.width = 200;
    //     canvas.height = 200;
    //     // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
    //     (canvas as { getContext: Function }).getContext("2d").drawImage(image, 0, 0);

    //     return canvas;
    // }
    // setTimeout(() => {
    //   let c = convertImageToCanvas(document.querySelector("#xnImgPic") as HTMLImageElement)
    //   console.log(c);
    //   document.querySelector("#a")?.appendChild(c)
    // }, 2000);


    setTimeout(() => {
        mapTiles.forEach(ele => {
            addModel(ele)

        })
    }, 400);

})
const open = ref<boolean>(false)
/**
* @function 拼接地图点击高亮
* @description 将每一块地图用canvas重画一遍，添加canvas的点击事件通过rgba的透明度判断点击区域
* @param ele{
        box: string,
        img: string,
        canvas: string,
        name: string
    } box(div) img(img) canvas(canvas)均为id box包含img和canvas name为高亮要替换的图片
* @author zoey
*/
//点击之后记录当前点击的图片，下次点击若为不同图片则清除上次点击的样式
let currentImg: M | null = null
const addModel = (ele: M) => {
    // 原始图片的宽高
    let img = document.querySelector(`#${ele.img}`)
    var imgW = img?.clientWidth; // 宽
    var imgH = img?.clientHeight; // 高
    // console.log("图片尺寸imgW,imgH", imgW, imgH);
    // 调整canvas画布大小 - 让canvas与原图大小一致
    document.getElementById(ele.canvas)!.width = imgW;
    document.getElementById(ele.canvas)!.height = imgH;

    // 注：不能使用以下更改css的写法，否则图片会被拉扯变形
    // $('#myCanvas').width(imgW);
    // $('#myCanvas').height(imgH);

    // canvas画图
    var c = document.getElementById(ele.canvas) as HTMLCanvasElement;
    var ctx = c!.getContext("2d");
    ctx!.drawImage(img as HTMLImageElement, 0, 0, imgW as number, imgH as number);


    // 点击事件
    let canvasBox = document.querySelector(`#${ele.box}`)
    canvasBox?.addEventListener("click", (e: any) => {
        console.log(ele)
        if (currentImg != ele && currentImg) {
            //直接赋值，浅拷贝，可直接比较
            //清除之前的样式
            let oldImg = document.querySelector(`#${currentImg.img}`) as HTMLImageElement
            let src = currentImg.canvas.replace("Canvas", "")
            var f = document.querySelector(`#${currentImg.box}`) as HTMLDivElement
            var childs = f.childNodes;
            f.removeChild(childs[childs.length - 1]);
            oldImg.src = getAssetsFile(`order/${src}.png`)
        }
        currentImg = ele
        var x = e.offsetX;
        var y = e.offsetY;
        // console.log("点击元素相对偏移量x,y", x, y)

        // canvas取色
        var imgdata = ctx?.getImageData(x, y, 1, 1);
        // console.log("点击位置的全部颜色数据[r,g,b,a]", imgdata.data);
        console.log("点击位置的透明度颜色数据(0~255，0代表完全透明，255代表完全不透明) value：", imgdata.data[3]);
        console.log(canvasBox?.children[0]);
        // if (imgdata.data[3]) {
        open.value = true
        getDialogData(ele.id)
        let img = canvasBox?.children[0] as HTMLImageElement
        img.src = getAssetsFile(`order/${ele.name}.png`)
        if (canvasBox) {
            canvasBox.innerHTML += `<div id="point" style="  display:none;align-items:center;flex-direction:column;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">
                            <p style="font-size: 20px;
                            white-space:nowrap;
                font-family: DingTalk, DingTalk;
                font-weight: normal;
                color: #FFFFFF;
                margin-bottom: .2857rem;
                line-height: 1.0714rem;">一类地区 ${ele.name}</p>
                            <img style="  width: 30px;height:30px;" src=${getAssetsFile(`order/point.png`)} alt="">
                        </div>`
            setTimeout(() => {
                let d = document.querySelector("#point") as HTMLDivElement
                d.style.display = "flex"
            }, 50);
        }
        // img.src="@/assets/image/order/西宁.png"
        // }

    }, true)
}
</script>
<style lang='scss' scoped>
.card {
    position: absolute;
    bottom: 1rem;
    padding: .75rem 0;
    right: 1rem;
    width: 8.5rem;
    height: 9.45rem;
    overflow-y: scroll;
    // background-image: url(@/assets/images/data/boxBg3.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    >div {
        width: 100%;
        height: 1.3rem;
        padding: 0 .5rem;
        font-size: 0.6rem;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 0.85rem;
        @include flex(space-between, center, row, nowrap);

        p:first-child {
            @include text-overflow();
            width: 70%;
        }
    }

    >div:nth-child(odd) {
        background: linear-gradient(90deg, rgba(19, 59, 87, 0) 0%, rgba(112, 240, 255, 0.5) 51%, rgba(19, 59, 87, 0) 100%);
    }
}

.containerx {
    padding-top: 1.8571rem;
    @include flex(start, center, column, nowrap);

    .map {
        padding-top: 78px;
        width: 548px;
        margin-left: -60px;
        position: relative;



        .point {
            @include flex(start, center, column);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            p {
                font-size: .9286rem;
                font-family: DingTalk, DingTalk;
                font-weight: normal;
                color: #FFFFFF;
                margin-bottom: .2857rem;
                line-height: 1.0714rem;
            }

            img {
                width: 1.2857rem;
                object-fit: contain;
            }
        }

        >div {
            display: inline;
            position: absolute;
            scale: .5;
        }

        #xnBox {
            top: 38px;
            left: 348px;
            z-index: 11;
        }

        #hnBox {
            top: 32px;
            left: 279px;
        }

        #hbBox {
            top: 6px;
            left: 177px;
            z-index: 1;
        }

        #huangnBox {
            top: 46px;
            left: 368px;
            z-index: 9;
        }

        #hdBox {
            top: 24px;
            left: 372px;
        }

        #glBox {
            top: 88px;
            left: 224px;
            z-index: 99;
        }

        #ysBox {
            top: 92px;
            left: -62px;
        }

        #hx2Box {
            top: -36px;
            left: -87px;
        }

        #hx3Box {
            top: 202px;
            left: 43px;
        }

    }



}
</style>