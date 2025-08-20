<template>
  <div class="header">
    <div class="header-title">
      <span>智慧排水管网信息管理平台</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
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
  },
}
</script>

<style scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #111a39;
  color: #fff;
  align-items: center;
  padding: 5px 20px;
  font-size: 28px;
  text-align: center;
}

.header-title {
  color: #8df0f8;
}
</style>
