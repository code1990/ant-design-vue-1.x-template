<template>
  <div>
    <a-tabs v-model="activeKey" type="card">
      <a-tab-pane key="1" tab="水质设备按日统计">
        <WaterDayPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="水质设备按月统计">
        <WaterMonthPage />
      </a-tab-pane>
      <a-tab-pane key="3" tab="水质设备在线统计">
        <WaterStatPage />
      </a-tab-pane>
      <a-tab-pane key="4" tab="水质设备在线统计2">
        <WaterDevicePage />
      </a-tab-pane>
      <a-tab-pane key="5" tab="动态数据表格">
        <DataTable />
      </a-tab-pane>
      <a-tab-pane key="6" tab="水位曲线">
        <RiverChart />
      </a-tab-pane>
      <a-tab-pane key="7" tab="水位曲线7">
        <RiverSVG />
      </a-tab-pane>
      <a-tab-pane key="8" tab="水位曲线8">
        <PipeSVG />
      </a-tab-pane>
      <a-tab-pane key="9" tab="水位曲线9">
        <TrafficSVG />
      </a-tab-pane>
      <a-tab-pane key="10" tab="水位曲线10">
        <DataMap />
      </a-tab-pane>
      <a-tab-pane key="11" tab="水位曲线11">
        <DataYear />
      </a-tab-pane>
      <a-tab-pane key="12" tab="水位曲线1111">
        <Kdata />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import WaterDayPage from '@/views/dashboard/stat/WaterDayPage.vue'
import WaterMonthPage from '@/views/dashboard/stat/WaterMonthPage.vue'
import WaterStatPage from '@/views/dashboard/stat/WaterStatPage.vue'
import WaterDevicePage from '@/views/dashboard/stat/WaterDevicePage.vue'
import DataTable from '@/views/dashboard/stat/DataTable.vue'
import RiverChart from '@/views/dashboard/stat/RiverChart.vue'
import RiverSVG from '@/views/dashboard/stat/RiverSVG.vue'
import PipeSVG from '@/views/dashboard/stat/PipeSVG.vue'
import TrafficSVG from '@/views/dashboard/stat/TrafficSVG.vue'
import DataMap from '@/views/dashboard/stat/DataMap.vue'
import DataYear from '@/views/dashboard/stat/DataYear.vue'
import Kdata from '@/views/dashboard/stat/KData.vue'

export default {
  name: 'WaterStatTabs',
  components: {
    DataTable,
    RiverChart,
    DataMap,
    DataYear,
    WaterDayPage,
    WaterMonthPage,
    WaterDevicePage,
    WaterStatPage,
    RiverSVG,
    PipeSVG,
    Kdata,
    TrafficSVG,
  },
  data() {
    return {
      activeKey: '1', // 默认显示第一个 Tab
    }
  },
}
</script>

<style scoped>
/* 根据需要美化 Tab */
</style>
