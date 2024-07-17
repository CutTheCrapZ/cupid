<!--  -->
<template>
  <h3>递归组件</h3>
  <Tree :data="data" />
</template>

<script lang='ts' setup>
import Tree from './components/Tree.vue'
interface T {
  name: string,
  checked: boolean,
  children?: T[]
}
const data: T[] = [{
  name: "1", checked: false, children: [{ name: "1-1", checked: false }]
}, {
  name: "2", checked: false, children: [{ name: "2-1", checked: false, children: [{ name: "2-1-1", checked: false }] }]
}]
</script>
<style lang='scss' scoped></style>