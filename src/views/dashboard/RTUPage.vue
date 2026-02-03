<template>
  <div>
    <a-tabs v-model="activeKey" type="card">
      <a-tab-pane key="1" tab="采集要素配置">
        <Page1 />
      </a-tab-pane>
      <a-tab-pane key="2" tab="自动化规则配置">
        <Page2 />
      </a-tab-pane>
      <a-tab-pane key="3" tab="下位机控制配置">
        <Page3 />
      </a-tab-pane>
      <a-tab-pane key="4" tab="数据上报配置">
        <Page4 />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Page1 from '@/views/dashboard/rtu/page1.vue'
import Page2 from '@/views/dashboard/rtu/page2.vue'
import Page3 from '@/views/dashboard/rtu/page3.vue'
import Page4 from '@/views/dashboard/rtu/page4.vue'

export default {
  name: 'WaterStatTabs',
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
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
