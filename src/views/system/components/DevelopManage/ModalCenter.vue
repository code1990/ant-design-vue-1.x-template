<template>
  <div>
<!--    <a-button type="primary" @click="open">查看历史</a-button>-->
<!--    <HistoryModal ref="historyModal" />-->
    <a-button type="primary" @click="open2">查看站点详情</a-button>
    <StationDetailModal ref="stationDetailModal" :id="selectedId" />
    <LayerCheckBox ref="layerCheckBox" :id="selectedId" />
    <CheckModal ref="checkModal" :id="selectedId" />
  </div>
</template>

<script>
// import HistoryModal from './WaterHistoryModal.vue'
import StationDetailModal from '@/views/system/components/DevelopManage/StationDetailModal.vue'
import LayerCheckBox from '@/views/system/components/DevelopManage/LayerCheckBox.vue'
import CheckModal from '@/views/system/components/DevelopManage/CheckModal.vue'
export default {
  components: {
    LayerCheckBox,
    CheckModal,
    StationDetailModal,
    // HistoryModal,
  },
  data() {
    return {
      visible: false,
      selectedId: 1,
    }
  },
  methods: {
    open() {
      // this.$refs.historyModal.open()
    },
    open2() {
      this.$refs.stationDetailModal.open()
    },
  },
}
</script>
