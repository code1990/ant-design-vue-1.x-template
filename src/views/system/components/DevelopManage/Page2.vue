<template>
  <div class="waterBox">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :tab="tab.title"
      >
        <component :is="tab.component" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SelectRegion from './SelectRegion.vue'
import SelectBasin from './SelectBasin.vue'
import SelectStation from './SelectStation.vue'
import SelectPlant from './SelectPlant.vue'
import SelectPipeline from './SelectPipeline.vue'
export default {
  name: 'Page2',
  components: {
    SelectRegion,
    SelectBasin,
    SelectStation,
    SelectPlant,
    SelectPipeline
  },
  data () {
    return {
      activeKey: '1',
      tabs: [
        { key: '1', title: '区域', component: 'SelectRegion' },
        { key: '2', title: '流域', component: 'SelectBasin' },
        { key: '3', title: '污水处理站', component: 'SelectStation' },
        { key: '4', title: '水厂', component: 'SelectPlant' },
        { key: '5', title: '管线', component: 'SelectPipeline' }
      ]
    }
  },
}
</script>

<style scoped lang="less">
.waterBox {
  width: 30%;
  height: 100%;
  padding: 20px;
}
</style>
