<!--  -->
<template>
    <h3>自定义指令-鉴权</h3>
    <div>
        <button v-btn-show="'show:create'">创建</button>
        <button v-btn-show="'show:edit'">编辑</button>
        <button v-btn-show="'show:delete'">删除</button>
    </div>
</template>

<script lang='ts' setup>
import { } from 'vue'
import type { Directive, DirectiveBinding } from 'vue'
//模拟后台鉴权数据
const permession = [
    // "zoey:show:edit",
    "zoey:show:create",
    "zoey:show:delete",
]
const vBtnShow: Directive = (el: HTMLButtonElement, bind: DirectiveBinding) => {
    let flag = permession.some(ele => {
        return ele == 'zoey:' + bind.value
    })
    if (flag) {
        el.style.display = 'display'
    } else {
        el.style.display = 'none'
    }
}
</script>
<style lang='scss' scoped>
div {
    @include flex();

    button {
        margin-right: .5rem;
    }
}
</style>