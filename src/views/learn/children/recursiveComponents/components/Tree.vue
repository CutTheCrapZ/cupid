<!--  -->
<template>
    <div v-for="item in data" :key="item.name">
        <input type="checkbox"> <span>{{ item.name }}</span>
        <digui v-if="item.children?.length" :data="item.children"></digui>
    </div>
</template>

<script lang='ts' setup>
import { } from 'vue'
interface T {
    name: string,
    checked: boolean,
    children?: T[]
}
withDefaults(defineProps<{
    data: T[]
}>(), {})
</script>
<script lang="ts">
export default {
    name:"digui"
}
</script>
<style lang='scss' scoped>
div {
    margin-left: 10px;

    input {
        cursor: url('/default.cur') !important
    }
}
</style>