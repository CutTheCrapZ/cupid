<!--  -->
<template>
    <h3>动态组件</h3>
    <div class="container">
        <div @click="change(item)" class="tab" v-for="item in com" :key="item.name">
            {{ item.name }}
        </div>
    </div>
    <component :is="cId"></component>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import A from "./components/A.vue"
import B from "./components/B.vue"
import C from "./components/C.vue"
const com: { name: string, com: any }[] = [{ name: "A", com: A }, { name: "B", com: B }, { name: "C", com: C }]
const cId = ref()
const change = (item: { name: string, com: any }) => {
    cId.value = item.com
}
</script>
<style lang='scss' scoped>
.container {
    @include flex(start, center);
    width: 100%;

    .tab {
        padding: 1rem 2rem;
    }
}
</style>