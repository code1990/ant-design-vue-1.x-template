<template>
  <div class="mainBox">
    <StatBox1></StatBox1>
    <StatBox2></StatBox2>
  </div>
</template>

<script>
import StatBox1 from '@/views/system/components/DevelopManage/stat/StatBox1.vue'
import StatBox2 from '@/views/system/components/DevelopManage/stat/StatBox2.vue'

export default {
  components: {
    StatBox1,
    StatBox2,
  },
  name: 'stat',
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 100%;
  background-color: #F0F2F5;
}
</style>
