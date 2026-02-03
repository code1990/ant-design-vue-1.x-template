<template>
  <div class="mainBox">
    <ChartData></ChartData>
  </div>
</template>
<script>
import ChartData from '@/views/dashboard/chart/ChartData.vue'
export default {
  components: {
    ChartData,
  },
  name: 'Main',
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
