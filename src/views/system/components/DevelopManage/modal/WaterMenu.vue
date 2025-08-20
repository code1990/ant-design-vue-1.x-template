<template>
  <div class="main-box">
    <HeaderBox></HeaderBox>
    <div class="content">
      <LeftBox></LeftBox>
      <BMapBox></BMapBox>
      <RightBox></RightBox>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import HeaderBox from '@/views/system/components/DevelopManage/modal/HeaderBox.vue'
import LeftBox from '@/views/system/components/DevelopManage/modal/LeftBox.vue'
import RightBox from '@/views/system/components/DevelopManage/modal/RightBox.vue'
import BMapBox from '@/views/system/components/DevelopManage/modal/BMapBox.vue'

export default {
  components: {
    HeaderBox,
    LeftBox,
    RightBox,
    BMapBox,
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {},
  methods: {
    open() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>

<style scoped>
.main-box {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.content {
  flex: 1;
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
}
</style>
