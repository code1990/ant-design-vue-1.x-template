<template>
  <div class="container">
    <!-- div1 -->
    <div class="section">
      <!-- 标题区 -->
      <div class="title">
        <span>安全审计趋势</span>
      </div>
      <!-- 内容区 -->
      <div class="content" ref="lineChart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    this.initLineChart()
  },
  methods: {
    initLineChart() {
      const chart = echarts.init(this.$refs.lineChart)

      // x 轴时间点
      const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`)

      // 随机生成三类数据
      const network = hours.map(() => Math.round(Math.random() * 100))
      const terminal = hours.map(() => Math.round(Math.random() * 100))
      const database = hours.map(() => Math.round(Math.random() * 100))

      chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['网络', '终端', '数据库审计'],
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          top: 20,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: hours,
          axisLine: {
            lineStyle: {
              type: 'dashed', // 设置为虚线
              color: '#999', // 线条颜色
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed', // 虚线
              color: '#ccc', // 分隔线颜色
            },
          },
        },
        series: [
          {
            name: '网络',
            type: 'line',
            smooth: true,
            data: network,
          },
          {
            name: '终端',
            type: 'line',
            smooth: true,
            data: terminal,
          },
          {
            name: '数据库审计',
            type: 'line',
            smooth: true,
            data: database,
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 20vh;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  flex: 0 0 40px;
  background: url('~@/assets/images/tip5.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: self-end;
  padding-left: 10px;
  font-weight: bold;
  color: white;
}

.content {
  flex: 1;
}
</style>
