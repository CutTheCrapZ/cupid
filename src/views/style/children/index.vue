<!--  -->
<template>
    <div>style-detail</div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import { useRoute } from "vue-router";
import { getStyleDetail } from "@/api/common";
const route = useRoute()
console.log(route.query.id);
const getData = async () => {
    let res = await getStyleDetail(route.query.id as string)
    console.log(res);
    
}
onMounted(() => {
    getData();
 })
</script>
<style lang='scss' scoped></style>