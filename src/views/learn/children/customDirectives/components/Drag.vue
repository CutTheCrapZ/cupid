<!--  -->
<template>
    <h3>自定义指令-拖拽</h3>
    <div id="drag_box" class="box">
        <div v-move class="contentz">
            <div class="header"></div>
            内容
        </div>
    </div>
</template>

<script lang='ts' setup>
import { } from 'vue'
import type { Directive, DirectiveBinding } from 'vue'
const vMove: Directive<any, void> = (el: HTMLDivElement, bind: DirectiveBinding) => {
    let header = el.firstElementChild as HTMLDivElement
    const mousedown = (e: MouseEvent) => {
        const x = e.clientX - el.offsetLeft
        const y = e.clientY - el.offsetTop
        const move = (e: MouseEvent) => {
            el.style.left = e.clientX - x + 'px'
            el.style.top = e.clientY - y + 'px'
        }
        (document.getElementById('drag_box') as HTMLDivElement).addEventListener('mousemove', move);
        document.addEventListener('mouseup', () => {
            (document.getElementById('drag_box') as HTMLDivElement).removeEventListener('mousemove', move)
        })
    }
    header.addEventListener('mousedown', mousedown)
}
</script>
<style lang='scss' scoped>
.box {
    width: 100%;
    height: 30rem;
    position: relative;

    .contentz {
        width: 30%;
        height: 10rem;
        border: 1px solid #000;
        position: absolute;
        .header {
            width: 100%;
            height: 1.4rem;
            background-color: #000;
        }
    }
}
</style>