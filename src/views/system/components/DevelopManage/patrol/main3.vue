<template>
  <div class="mainBox">
    <MapBox ></MapBox>
  </div>
</template>
<script>
import MapBox from '@/views/system/components/DevelopManage/patrol/MapBox.vue'
export default {
  components: {
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
