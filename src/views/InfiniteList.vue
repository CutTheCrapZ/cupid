<!--  -->
<template>
  <div>
    <h3>水平</h3>
    <InfiniteList
      class="box"
      :data="data"
      style="width: 100%"
      :height="220"
      :itemSize="getItemSize"
      scrollDirection="horizontal"
      :debug="debugHorizontal"
      v-slot="{ item, index }"
      :scrollToIndex="scrollToIndex"
    >
      <div class="li-con li-con-r">
        item{{ index }} <br />
        xxxxxxx <br />
        xxxxxxx <br />
        <el-button type="primary" round>Primary</el-button>
      </div>
    </InfiniteList>
    <h3>垂直</h3>
    <InfiniteList
      :data="data"
      class="box"
      :width="'100%'"
      :height="320"
      :itemSize="getItemSize"
      :debug="debug"
      v-slot="{ item, index }"
      :scrollToIndex="scrollToIndex"
      :scrollToAlignment="scrollToAlignment"
      :overscanCount="overscanCount"
    >
      <div class="li-con">item {{ index }} : {{ item }}</div>
    </InfiniteList>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th align="left">属性</th>
            <th align="left">类型</th>
            <th align="left">是否必须?</th>
            <th align="left">描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">width</td>
            <td align="left">Number or String*</td>
            <td align="left">✓</td>
            <td align="left">
              列表宽度.
              在滚动方向是&nbsp;<code>'horizontal'</code>是用于确定滚动元素个数.
            </td>
          </tr>
          <tr>
            <td align="left">height</td>
            <td align="left">Number or String*</td>
            <td align="left">✓</td>
            <td align="left">
              列表宽度.
              在滚动方向是&nbsp;<code>'vertical'</code>是用于确定滚动元素个数.
            </td>
          </tr>
          <tr>
            <td align="left">data</td>
            <td align="left">any[]</td>
            <td align="left">✓</td>
            <td align="left">构建滚动元素的数据</td>
          </tr>
          <tr>
            <td align="left">itemSize</td>
            <td align="left"><code>(index: number): number</code></td>
            <td align="left"></td>
            <td align="left">
              可以是一个固定的宽/高（取决于滚动方向）,
              一个包含列表所有元素的数组,
              或者是返回指定位置元素高度的函数:&nbsp;<code
                >(index: number): number</code
              >
            </td>
          </tr>
          <tr>
            <td align="left">scrollDirection</td>
            <td align="left">String</td>
            <td align="left"></td>
            <td align="left">
              指定滚动方向&nbsp;<code>'vertical'</code>&nbsp;(默认)
              或&nbsp;<code>'horizontal'</code>.
            </td>
          </tr>
          <tr>
            <td align="left">scrollOffset</td>
            <td align="left">Number</td>
            <td align="left"></td>
            <td align="left">可以指定滚动位置</td>
          </tr>
          <tr>
            <td align="left">scrollToIndex</td>
            <td align="left">Number</td>
            <td align="left"></td>
            <td align="left">可以指定到滚动到哪个元素</td>
          </tr>
          <tr>
            <td align="left">scrollToAlignment</td>
            <td align="left">String</td>
            <td align="left"></td>
            <td align="left">
              结合&nbsp;<code>scrollToIndex</code>一起用,
              用于控制滚动到的元素的对齐方式.
              可选:&nbsp;<code>'start'</code>,&nbsp;<code>'center'</code>,&nbsp;<code>'end'</code>&nbsp;or&nbsp;<code>'auto'</code>.
              使用&nbsp;<code>'start'</code>&nbsp;将对齐到容器的起始位置，&nbsp;<code>'end'</code>&nbsp;则对齐到元素的结尾.
              使用&nbsp;<code>'center</code>可以对齐到容器正中间.&nbsp;<code>'auto'</code>&nbsp;则是滚动到<code>scrollToIndex</code>指定元素恰好完全可见的位置
            </td>
          </tr>
          <tr>
            <td align="left">overscanCount</td>
            <td align="left">Number</td>
            <td align="left"></td>
            <td align="left">
              在可见元素上/下额外渲染的元素数量.
              这可以减少在特定浏览器/设备上的闪烁
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InfiniteList from "vue3-infinite-list";
const debug = ref(false);
const debugHorizontal = ref(false);
const scrollToIndex = ref(8);
const d = ref();
const scrollToAlignment = ref("start"); // auto, start, center, end，分别对应自动对齐、位于容器起始，位于容器中间，位于容器末尾。
let data = ref<any>([]);
const overscanCount = ref(4);
const generateData = (
  min: number = 100000,
  max: number = -1
): { title: number; msg: string }[] => {
  const data: { title: number; msg: string }[] = [];
  if (max <= 0) max = min;
  const length = Math.floor(Math.random() * (max - min + 1) + min);
  for (let i: number = 0; i < length; i++) {
    data.push({ title: i, msg: "hello wrold" });
  }
  return data;
};
const getItemSize = (i: number): number => {
  // 通过getItemSize计算出每一个元素的高度
  // return rowHeights?.[idx] || ((83 + orderList?.[idx]?.products?.length * 96 + bottom) * window.innerWidth) / 375
  switch (i % 4) {
    case 1:
      return 160;

    case 2:
      return 120;

    case 3:
      return 100;

    default:
      return 200;
  }
};
const init = async () => {
  data.value = generateData(100000);
};
init();
</script>
<style lang="scss" scoped>
.li-con {
  padding: 0 20px;
  line-height: 50px;
  color: #333;
  box-sizing: border-box;
}
.box {
  border: 1px solid #ccc;
  border-radius: 12px;
  :deep(.vue3-infinite-list) {
    border-bottom: 1px solid #ddd;
  }
}
.table {
  margin-top: 1rem;
  font-size: 12px;
  width: 100%;
  overflow-x: auto;
  border: 1px solid #f6f6f6;
  th {
    white-space: nowrap;
  }
}
</style>
