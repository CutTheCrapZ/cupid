<!--  -->
<template>
    <h3>1、尝试使用text-stroke</h3>
    <div class='num1 tip2' style="-webkit-text-stroke: 2px #ccc;">加客服咨询更多内容</div>
    <h3>2、尝试使用text-shadow</h3>
    <div class='num2 tip2' style="text-shadow: -4px -4px 10px #ccc;">加客服咨询更多内容</div>
    <h3>3、使用定位来进行“描边”</h3>
    <div class='tip2'>
        <div class='num'>加客服咨询更多内容</div>
        <div class='num numBorder'>加客服咨询更多内容</div>
    </div>
</template>

<script lang='ts' setup>

</script>
<style lang='scss' scoped>
.tip2 {
    text-align: center;
    font-size: 42px;
    line-height: 100px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #000;
    font-weight: bold;
    width: 100%;
    position: relative;
}
.num {
    width: 100%;
    position: absolute;
    z-index: 2;
    text-align: center;
    font-size: 36px;
    color: #000;
    font-weight: 900;
    letter-spacing: 4px;

}

.numBorder {
    position: absolute;
    z-index: 1;
    -webkit-text-stroke: 10px #ccc;
}
</style>