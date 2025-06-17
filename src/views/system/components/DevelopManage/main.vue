<template>
  <div class="mainBox">
    <HeaderBox></HeaderBox>
    <LeftBox></LeftBox>
    <MapBox></MapBox>
    <RightBox></RightBox>
  </div>
</template>
<script>
import HeaderBox from '@/views/system/components/DevelopManage/HeaderBox.vue'
import LeftBox from '@/views/system/components/DevelopManage/LeftBox.vue'
import RightBox from '@/views/system/components/DevelopManage/RightBox.vue'
import MapBox from '@/views/system/components/DevelopManage/MapBox.vue'

export default {
  components: {
    RightBox,
    LeftBox,
    HeaderBox,
    MapBox
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
