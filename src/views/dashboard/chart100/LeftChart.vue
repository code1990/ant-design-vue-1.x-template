<template>
  <div class="left-panel">
    <!-- 1. 报汛站点监测统计（环形图） -->
    <a-card class="panel-card" :bordered="false" :body-style="{ padding: '10px 10px 4px 10px' }">
      <div class="panel-title">报汛站点监测统计</div>
      <div ref="alarmPie" class="chart-box"></div>
    </a-card>

    <!-- 2. 监测站点类型分布（六个数字块） -->
    <a-card class="panel-card" :bordered="false" :body-style="{ padding: '10px 10px 4px 10px' }">
      <div class="panel-title">监测站点类型分布</div>
      <div class="station-grid">
        <div v-for="item in stationTypes" :key="item.key" class="station-item">
          <div class="station-icon">
            <!-- 这里简单用首字母，你可以改成自定义图标 -->
            {{ item.short }}
          </div>
          <div class="station-value">{{ item.value }}</div>
          <div class="station-label">{{ item.label }}</div>
        </div>
      </div>
    </a-card>

    <!-- 3. 上年月降雨量对比（柱状图） -->
    <a-card class="panel-card" :bordered="false" :body-style="{ padding: '10px 10px 10px 10px' }">
      <div class="panel-title">上年月降雨量对比</div>
      <div ref="rainBar" class="chart-box"></div>
    </a-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LeftPanel',

  data() {
    return {
      charts: [],
      // 这里是左侧中间那块“六边形/图标 + 数字”的模拟数据
      stationTypes: [
        {
          key: 'river',
          label: '河道',
          value: 3921,
          short: '河',
        },
        {
          key: 'reservoir',
          label: '水库',
          value: 2961,
          short: '库',
        },
        {
          key: 'rain',
          label: '雨量站',
          value: 1771,
          short: '雨',
        },
        {
          key: 'gate',
          label: '水闸',
          value: 1902,
          short: '闸',
        },
        {
          key: 'lake',
          label: '湖泊',
          value: 1219,
          short: '湖',
        },
        {
          key: 'other',
          label: '其他',
          value: 916,
          short: '其',
        },
      ],
    }
  },

  mounted() {
    this.initCharts()
    // 可选：窗口缩放时自适应
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    this.charts.forEach(c => c && c.dispose())
    this.charts = []
  },

  methods: {
    initCharts() {
      this.initAlarmPie()
      this.initRainBar()
    },

    handleResize() {
      this.charts.forEach(c => c && c.resize())
    },

    // 顶部环形图：报汛站点监测统计
    initAlarmPie() {
      const dom = this.$refs.alarmPie
      if (!dom) return
      const chart = echarts.init(dom)
      this.charts.push(chart)

      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 0,
          textStyle: { color: '#A0BFD8' },
        },
        series: [
          {
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              color: '#E6F7FF',
            },
            labelLine: { show: true },
            data: [
              {
                value: 9688,
                name: '正常报汛',
              },
              {
                value: 5176,
                name: '异常报汛',
              },
              {
                value: 3966,
                name: '预警报汛',
              },
            ],
          },
        ],
      })
    },

    // 底部柱状图：上年月降雨量对比
    initRainBar() {
      const dom = this.$refs.rainBar
      if (!dom) return
      const chart = echarts.init(dom)
      this.charts.push(chart)

      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: {
          left: 40,
          right: 20,
          top: 30,
          bottom: 30,
        },
        legend: {
          data: ['2023年', '2022年'],
          textStyle: { color: '#A0BFD8' },
        },
        xAxis: {
          type: 'category',
          data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: { lineStyle: { color: '#4978A0' } },
          axisLabel: { color: '#A0BFD8' },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#4978A0' } },
          splitLine: { lineStyle: { color: 'rgba(73,120,160,0.4)' } },
          axisLabel: { color: '#A0BFD8' },
        },
        series: [
          {
            name: '2023年',
            type: 'bar',
            barWidth: 12,
            data: [20, 32, 58, 40, 39, 30, 26],
          },
          {
            name: '2022年',
            type: 'bar',
            barWidth: 12,
            data: [18, 28, 50, 35, 32, 26, 22],
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.left-panel {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.panel-card {
  margin-bottom: 8px;
  background: rgba(4, 32, 70, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
}

.panel-title {
  color: #e6f7ff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

.chart-box {
  width: 100%;
  height: 220px;
}

/* 站点类型六宫格 */
.station-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  margin-top: 4px;
  padding-bottom: 4px;
}

.station-item {
  background: radial-gradient(circle at top, #0f3c72, #041b3a);
  border-radius: 10px;
  border: 1px solid rgba(64, 158, 255, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 4px;
}

.station-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(135, 208, 250, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e6f7ff;
  font-size: 14px;
  margin-bottom: 4px;
}

.station-value {
  color: #40e9ff;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
}

.station-label {
  color: #a0bfd8;
  font-size: 12px;
  margin-top: 2px;
}
</style>
