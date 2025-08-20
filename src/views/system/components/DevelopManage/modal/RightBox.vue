<template>
  <div class="right">
    <div class="chartDetail">左上内容</div>
    <div class="chartDetail">左中内容</div>
    <div class="chartDetail">左下内容</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped>
.right {
  width: 20%;
  background-color: #f5f5f5;
  padding: 10px;
}

.chartDetail {
  flex: 1;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px;
  box-sizing: border-box;
  height: 33%;
}

.chartDetail:last-child {
  border-bottom: none;
}

.chart-box {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.chart-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.chart-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
}

.chart-item {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-echart {
  width: 100%;
  height: 60px;
}

.chart-label {
  text-align: center;
  font-size: 10px;
  color: #333;
}

.chart-value {
  font-weight: bold;
  color: #1890ff;
}

.header-title {
  color: #8df0f8;
}
</style>
