<template>
  <div class="dashboard">
    <div class="header">
      <header-chart></header-chart>
    </div>
    <div class="main">
      <div class="left-box"></div>
      <div class="mid-box"></div>
      <div class="right-box"></div>
    </div>
  </div>
</template>
<script>
import HeaderChart from '@/views/wise/HeaderChart.vue'

export default {
  components: {
    HeaderChart,
  },
  name: 'index',
}
</script>

<style scoped lang="less">
.dashboard {
  width: 100%;
  height: 100%;
  background: #172a67; // 推荐大屏深色背景
  display: flex;
  flex-direction: column;

  // 顶部区域
  .header {
    height: 130px; // 可按 HeaderChart 的高度调整
    flex-shrink: 0;
  }

  // 主体区域 - 采用三栏布局
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;

    // 左侧栏
    .left-box {
      width: 360px; // 和 LeftChart 适配
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    // 中间区域（上地图 / 下底部滚动）
    .mid-box {
      flex: 1;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      // 🎯 你的 MidChart（地图） + BottomChart（底部）
      > *:first-child {
        flex: 1; // 中心区域填充高度
        min-height: 0;
      }

      > *:last-child {
        height: 260px; // 你的 BottomChart 高度
        margin-top: 10px;
        flex-shrink: 0;
      }
    }

    // 右侧栏
    .right-box {
      width: 360px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
  }
}
</style>
