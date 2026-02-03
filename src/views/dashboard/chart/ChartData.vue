<template>
  <div class="dashboard">
    <!-- 顶部筛选 -->
    <div class="filter-bar">
      <a-range-picker v-model="dateRange" style="margin-right: 10px" />
      <a-button type="primary" @click="onSearch">搜索</a-button>
      <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
    </div>

    <!-- 内容 2×2 -->
    <div class="content">
      <!-- 时间统计 -->
      <div class="chart-card">
        <div class="chart-title">时间统计（门店一 vs 门店二）</div>
        <div ref="timeChart" class="chart"></div>
      </div>

      <!-- 区属统计（堆积环状饼图） -->
      <div class="chart-card">
        <div class="chart-title">区属统计</div>
        <div ref="regionChart" class="chart"></div>
      </div>

      <!-- 厂家和时间统计 -->
      <div class="chart-card">
        <div class="chart-title">厂家和时间统计</div>
        <div ref="factoryChart" class="chart"></div>
      </div>

      <!-- 报警类型统计（三个环状饼图） -->
      <div class="chart-card">
        <div class="chart-title">报警类型统计</div>
        <div ref="alarmChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DashboardCharts',
  data() {
    return {
      dateRange: [],
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }
  },
  mounted() {
    this.initTimeChart()
    this.initRegionChart()
    this.initFactoryChart()
    this.initAlarmChart()
  },
  methods: {
    // 时间统计（柱状图对比）
    initTimeChart() {
      const chart = echarts.init(this.$refs.timeChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['门店一', '门店二'] },
        xAxis: {
          type: 'category',
          data: this.weekdays,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 1000,
        },
        series: [
          {
            name: '门店一',
            type: 'bar',
            data: [320, 450, 600, 700, 520, 400, 650],
            itemStyle: { color: '#666EE8' },
          },
          {
            name: '门店二',
            type: 'bar',
            data: [220, 350, 500, 400, 320, 500, 300],
            itemStyle: { color: '#FF6262' },
          },
        ],
      })
    },
    // 区属统计（堆积环状饼图）
    initRegionChart() {
      const chart = echarts.init(this.$refs.regionChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        legend: { bottom: 0 },
        series: [
          {
            name: '项目一',
            type: 'pie',
            radius: [0, '30%'], // 内环
            label: {
              position: 'inner',
              formatter: '{c}',
            },
            data: [
              {
                value: 75,
                name: '项目一',
                itemStyle: { color: '#FFC71C' },
              },
            ],
          },
          {
            name: '项目二',
            type: 'pie',
            radius: ['40%', '55%'], // 中环
            label: {
              position: 'inner',
              formatter: '{c}',
            },
            data: [
              {
                value: 65,
                name: '项目二',
                itemStyle: { color: '#FF6262' },
              },
            ],
          },
          {
            name: '项目三',
            type: 'pie',
            radius: ['65%', '80%'], // 外环
            label: {
              position: 'inner',
              formatter: '{c}',
            },
            data: [
              {
                value: 85,
                name: '项目三',
                itemStyle: { color: '#666EE8' },
              },
            ],
          },
        ],
      })
    },

    // 厂家和时间统计（柱状图）
    initFactoryChart() {
      const chart = echarts.init(this.$refs.factoryChart)
      const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))
      chart.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: this.weekdays,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 1000,
        },
        series: [
          {
            name: '厂家数据',
            type: 'bar',
            data,
            itemStyle: { color: '#FF6262' },
          },
        ],
      })
    },
    // 报警类型统计（三个环状饼图并排）
    initAlarmChart() {
      const chart = echarts.init(this.$refs.alarmChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        series: [
          {
            name: '项目一',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['20%', '50%'], // 左边
            label: { formatter: '{b}\n{d}%' },
            data: [
              {
                value: 45,
                name: '项目一',
                itemStyle: { color: '#1E9FF2' },
              },
            ],
          },
          {
            name: '项目二',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'], // 中间
            label: { formatter: '{b}\n{d}%' },
            data: [
              {
                value: 52,
                name: '项目二',
                itemStyle: { color: '#FFC71C' },
              },
            ],
          },
          {
            name: '项目三',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['80%', '50%'], // 右边
            label: { formatter: '{b}\n{d}%' },
            data: [
              {
                value: 75,
                name: '项目三',
                itemStyle: { color: '#FF6262' },
              },
            ],
          },
        ],
      })
    },

    // 搜索
    onSearch() {
      console.log('搜索日期：', this.dateRange)
      this.initFactoryChart() // 模拟刷新
    },

    // 重置
    onReset() {
      this.dateRange = []
      this.initFactoryChart() // 重置时重新生成数据
    },
  },
}
</script>

<style scoped>
.dashboard {
  padding: 16px;
  background: #f5f5f5;
}

.filter-bar {
  margin-bottom: 16px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.chart {
  width: 100%;
  height: 280px;
}
</style>
