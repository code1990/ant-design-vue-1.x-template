<template>
  <div class="mainBox">
    <HeaderBox></HeaderBox>
    <LeftBox v-if="false"></LeftBox>
    <MapBox></MapBox>
    <RightBox></RightBox>
  </div>
</template>
<script>
import HeaderBox from '@/views/system/components/DevelopManage/river/HeaderBox.vue'
import LeftBox from '@/views/system/components/DevelopManage/river/LeftBox.vue'
import RightBox from '@/views/system/components/DevelopManage/river/RightBox.vue'
import MapBox from '@/views/system/components/DevelopManage/river/MapBox.vue'

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
