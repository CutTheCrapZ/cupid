<!--  -->
<template>
  <div>我是B组件</div>
</template>

<script lang='ts' setup>
import {} from 'vue'
</script>
<style lang='scss' scoped>
div{
  width: 20rem;
  height: 12rem;
  @include flex(center,center);
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>