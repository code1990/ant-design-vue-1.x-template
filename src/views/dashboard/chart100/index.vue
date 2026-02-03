<template>
  <div class="dashboard">
    <div class="header">
      <header-chart></header-chart>
    </div>
    <div class="main">
      <div class="left-box">
        <left-chart></left-chart>
      </div>
      <div class="mid-box">
        <mid-chart></mid-chart>
        <bottom-chart></bottom-chart>
      </div>
      <div class="right-box">
        <RightChart></RightChart>
      </div>
    </div>
  </div>
</template>
<script>
import LeftChart from '@/views/dashboard/chart100/LeftChart.vue'
import RightChart from '@/views/dashboard/chart100/RightChart.vue'
import MidChart from '@/views/dashboard/chart100/MidChart.vue'
import HeaderChart from '@/views/dashboard/chart100/HeaderChart.vue'
import BottomChart from '@/views/dashboard/chart100/BottomChart.vue'

export default {
  components: {
    LeftChart,
    MidChart,
    BottomChart,
    HeaderChart,
    RightChart,
  },
  name: 'index',
}
</script>

<style scoped lang="less">
.dashboard {
  width: 100%;
  height: 100%;
  background: #020818;   // 推荐大屏深色背景
  display: flex;
  flex-direction: column;

  // 顶部区域
  .header {
    height: 70px;  // 可按 HeaderChart 的高度调整
    flex-shrink: 0;
  }

  // 主体区域 - 采用三栏布局
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;

    // 左侧栏
    .left-box {
      width: 360px;         // 和 LeftChart 适配
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
        flex: 1;            // 中心区域填充高度
        min-height: 0;
      }

      > *:last-child {
        height: 260px;      // 你的 BottomChart 高度
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
