<!--  -->
<template>
  <div class="container">
    <el-button @click="componentId == A ? componentId = B : componentId = A" class="tab">
      切换
    </el-button>
  </div>
  <keep-alive :include="['A']">
    <component :is="componentId"></component>
  </keep-alive>
</template>

<script lang='ts' setup>
import { shallowRef } from 'vue'
import A from './components/A.vue'
import B from './components/B.vue'
const componentId = shallowRef(A)
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