<template>
  <div class="leftBox">
    <LineModal ref="gateModal"></LineModal>
    <WellModal ref="gateModal"></WellModal>
    <GateModal ref="gateModal"></GateModal>
  </div>
</template>
<script>
import GateModal from '@/views/system/components/DevelopManage/pipe/GateModal.vue'
import WellModal from '@/views/system/components/DevelopManage/pipe/WellModal.vue'
import LineModal from '@/views/system/components/DevelopManage/pipe/LineModal.vue'

export default {
  components: {
    GateModal,
    WellModal,
    LineModal,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.leftBox {
  width: 20%;
  height: calc(100vh - 70px);
  position: absolute;
  top: 60px;
  opacity: 1; /* 保持文字完全不透明 */
  //background-color: rgba(255, 255, 255, 0.5); /* 背景透明 */
  z-index: 99;
  margin-top: 10px;
}
</style>
