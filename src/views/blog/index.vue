<!--  -->
<template>
    <div v-if="show" class="weibo">
      <h1 class="post-card-title">xxxxx</h1>
    </div>
</template>
  
<script lang='ts' setup>
import { onMounted,ref } from "vue";
const show=ref<boolean>(false)
onMounted(() => {
setTimeout(() => {
  show.value=true
  console.log(show.value);
  
}, 1000);
})
</script>
<style lang='scss' scoped>
.weibo{
  padding:1.75rem;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

</style>