<template>
  <div class="left">
    <div class="chartDetail">
      <div class="chart-title">管线信息汇总</div>
      <div class="chart-content">
        <div class="chart-item" v-for="(item, index) in clockChartData" :key="index">
          <div :ref="'chart' + index" class="chart-echart"></div>
          <div class="chart-label">
            {{ item.label }}：
            <!--                <span class="chart-value">{{ item.value }}</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="chartDetail">
      <!-- 标题 -->
      <div class="chart-title">污水治理返污率</div>

      <!-- 柱状图容器 -->
      <div ref="barChart" class="bar-chart"></div>
    </div>
    <div class="chartDetail">
      <!-- 标题 -->
      <div class="title">污水厂负荷情况</div>

      <!-- 上方：厂区切换（走马灯） -->
      <a-carousel @afterChange="handleCarouselChange" ref="carousel" autoplay :autoplaySpeed="5000">
        <div v-for="(plant, index) in plantList" :key="index" class="plant-name">
          {{ plant.name }}
        </div>
      </a-carousel>

      <!-- 下方：厂区对应的 4 个维度展示 -->
      <div class="stats-grid">
        <div class="stat-item">水泵数量：{{ currentPlant.pumpCount }} 台</div>
        <div class="stat-item">规模：{{ currentPlant.scale }} 万m²/日</div>
        <div class="stat-item">排放口：{{ currentPlant.outletCount }} 个</div>
        <div class="stat-item">负荷率：{{ currentPlant.loadRate }} %</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      autoSwitchTimer: null,
      clockChartData: [
        {
          label: '排水管线长度',
          value: 124.98,
          max: 500,
        },
        {
          label: '地面建（构）筑物',
          value: 44,
          max: 100,
        },
        {
          label: '排水窖井面',
          value: 0,
          max: 10,
        },
        {
          label: '特征点',
          value: 101,
          max: 500,
        },
      ],
      regions: ['幸福渠', '七里冲', '大桥头', '西坝河', '南门沟', '滨河街', '马王堆', '杨家坪'],
      currentIndex: 0,
      plantList: [
        {
          name: '幸福渠厂',
          pumpCount: 2,
          scale: 5.2,
          outletCount: 3,
          loadRate: 66.7,
        },
        {
          name: '七里冲厂',
          pumpCount: 4,
          scale: 7.8,
          outletCount: 2,
          loadRate: 82.5,
        },
        {
          name: '滨河厂',
          pumpCount: 1,
          scale: 3.1,
          outletCount: 1,
          loadRate: 47.3,
        },
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.error('当前厂区：', this.currentPlant)
      this.clockChartData.forEach((item, index) => {
        this.initClockChart(index, item.value, item.max)
      })
      this.initBarChart()
    })
    this.autoSwitchTimer = setInterval(() => {
      this.nextPlant()
    }, 5000)
  },
  computed: {
    currentPlant() {
      console.error(this.plantList[this.currentIndex])
      return (
        this.plantList[this.currentIndex] || {
          name: '',
          pumpCount: 0,
          scale: 0,
          outletCount: 0,
          loadRate: 0,
        }
      )
    },
  },
  methods: {
    initClockChart(index, value, max) {
      const el = this.$refs['chart' + index]
      const dom = Array.isArray(el) ? el[0] : el

      if (!dom) {
        console.warn(`chart ref chart${index} not found!`)
        return
      }

      const chart = echarts.init(dom)
      // const progressRatio = value / max

      chart.setOption({
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: '90%',
            progress: {
              show: true,
              width: 8,
              itemStyle: {
                color: '#2BD7FC', // ✅ 设置进度条颜色（动画后依然保持）
              },
            },
            axisLine: {
              lineStyle: {
                width: 8,
                color: [[1, '#1C2C67']], // ✅ 设置背景环颜色（非进度部分）
              },
            },
            pointer: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: {
              valueAnimation: true,
              fontSize: 10,
              formatter: () => `${value}`,
              offsetCenter: [0, '30%'],
            },
            data: [{ value: ((value / max) * 100).toFixed(2) }],
          },
        ],
      })
    },
    initBarChart() {
      const dom = this.$refs.barChart
      if (!dom) return

      const chart = echarts.init(dom)

      const data = this.regions.map(() => +(Math.random() * 8).toFixed(2))

      chart.setOption({
        grid: {
          left: '40px',
          right: '20px',
          top: '20px',
          bottom: '40px',
        },
        xAxis: {
          type: 'category',
          data: this.regions,
          axisLine: { lineStyle: { color: '#999' } },
          axisLabel: {
            rotate: 30, // 防止区域名字过长重叠
          },
        },
        yAxis: {
          type: 'value',
          name: '返污率',
          axisLine: { lineStyle: { color: '#999' } },
          splitLine: { show: true },
        },
        series: [
          {
            type: 'bar',
            data: data,
            barWidth: 20,
            itemStyle: {
              color: '#2BD7FC',
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      })
    },
    handleCarouselChange(index) {
      console.error('轮播切换到了:', index)
      this.currentIndex = index
    },
    nextPlant() {
      const nextIndex = (this.currentIndex + 1) % this.plantList.length
      this.currentIndex = nextIndex
      this.$refs.carousel.goTo(nextIndex) // 手动轮播切换
    },
  },
  beforeDestroy() {
    clearInterval(this.autoSwitchTimer)
  },
}
</script>

<style scoped>
.left {
  width: 20%;
  background-color: #122c6d;
  padding: 10px;
  color: white;
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
  margin-top: -10px;
}

.chart-value {
  font-weight: bold;
  color: #1890ff;
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
}

.bar-chart {
  width: 100%;
  height: 200px;
}

.carousel-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 120px);
  gap: 10px;
}

.grid-item {
  background: #2bd7fc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.plant-name {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #2bd7fc;
  padding: 10px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 12px;
  column-gap: 16px;
  margin-top: 20px;
}

.stat-item {
  background: #f6faff;
  border-left: 4px solid #2bd7fc;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

</style>
