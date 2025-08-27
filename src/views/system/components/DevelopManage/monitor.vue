<template>
  <div class="mainBox">
    <HeaderBox></HeaderBox>
    <LeftBox ref="leftBox" id="leftBox2"></LeftBox>
    <MapBox></MapBox>
    <RightBox ref="rightBox" id="rightBox2"></RightBox>
  </div>
</template>
<script>
import MapBox from '@/views/system/components/DevelopManage/monitor/MapBox.vue'
import HeaderBox from '@/views/system/components/DevelopManage/monitor/HeaderBox.vue'
import LeftBox from '@/views/system/components/DevelopManage/monitor/LeftBox.vue'
import RightBox from '@/views/system/components/DevelopManage/monitor/RightBox.vue'

export default {
  components: {
    RightBox,
    LeftBox,
    HeaderBox,
    MapBox,
  },
  name: 'Main',
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 100%;
}
</style>
