<template>
  <div class="mainBox">
    <HeaderBox></HeaderBox>
    <LeftBox ref="leftBox" id="leftBox2"></LeftBox>
    <MapBox></MapBox>
    <RightBox ref="rightBox" id="rightBox2"></RightBox>
  </div>
</template>
<script>
import MapBox from '@/views/dashboard/safe/MapBox.vue'
import HeaderBox from '@/views/dashboard/safe/HeaderBox.vue'
import LeftBox from '@/views/dashboard/safe/LeftBox.vue'
import RightBox from '@/views/dashboard/safe/RightBox.vue'

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
  overflow-y: hidden;
}
</style>
