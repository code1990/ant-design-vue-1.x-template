<template>
  <div class="mapMain">
    <div class="mapBox">

    </div>
    <BottomBox></BottomBox>
  </div>
</template>
<script>
import BottomBox from '@/views/system/components/DevelopManage/BottomBox.vue'

export default {
  components: {
    BottomBox,
  },
  name: 'MapBox',
}
</script>

<style scoped lang="less">
.mapMain {
  width: 60%;
  height: calc(100vh - 80px);
  background-color: blue;
  float: left;
}
.mapBox {
  width: 100%;
  height: 600px;
  background-color: pink;
  float: left;
}
</style>
