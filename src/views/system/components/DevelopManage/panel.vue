<template>
  <div class="mainBox">
    <HeaderBox></HeaderBox>
    <MidBox1></MidBox1>
    <MidBox2></MidBox2>
    <MidBox3></MidBox3>
    <BottomBox></BottomBox>
  </div>
</template>
<script>
import HeaderBox from '@/views/system/components/DevelopManage/panel/HeaderBox.vue'
import MidBox1 from '@/views/system/components/DevelopManage/panel/MidBox1.vue'
import MidBox2 from '@/views/system/components/DevelopManage/panel/MidBox2.vue'
import MidBox3 from '@/views/system/components/DevelopManage/panel/MidBox3.vue'
import BottomBox from '@/views/system/components/DevelopManage/panel/BottomBox.vue'

export default {
  components: {
    HeaderBox,
    MidBox1,
    MidBox2,
    MidBox3,
    BottomBox,
  },
  name: 'Main',
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 100%;
  background-color: #F0F2F5;
  overflow-y: auto;
}
</style>
