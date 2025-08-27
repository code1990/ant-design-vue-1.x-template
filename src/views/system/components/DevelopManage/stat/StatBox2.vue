<template>
  <div class="container">
    <!-- 左侧柱状图 -->
    <div class="left" ref="barChart"></div>

    <!-- 右侧信息栏 -->
    <div class="right">
      <div v-for="(item, index) in stats" :key="index" class="stat-item">
        <div class="title">{{ item.title }}</div>
        <div class="value" :style="{ color: colors[index], textShadow: '0 0 2px rgba(0,0,0,0.3)' }">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PipelineEventPanel',
  data() {
    return {
      stats: [
        {
          title: '企业总数量',
          value: '1,023',
        },
        {
          title: '建筑物总数量',
          value: '3,021',
        },
        {
          title: '全景影像总数量',
          value: '6,023个',
        },
        {
          title: '阀门总数量',
          value: '1,223',
        },
        {
          title: '文档总数量',
          value: '1,023个',
        },
      ],
      colors: ['#556EDF', '#F59A24', '#70B604', '#7B4D12', '#556EDF'],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBar()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.barChart) {
      this.barChart.dispose()
    }
  },
  methods: {
    handleResize() {
      if (this.barChart) {
        this.barChart.resize()
      }
    },
    initBar() {
      this.barChart = echarts.init(this.$refs.barChart)
      this.barChart.setOption({
        title: {
          text: '事件数量统计',
          left: '10px',
          top: '10px',
          textStyle: {
            fontSize: 14, // 字体大小
            fontFamily: 'Microsoft YaHei', // 字体
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        xAxis: {
          type: 'category',
          data: [
            '占压事件',
            '关键（重点）位置',
            '施工事件',
            '打孔盗油/气',
            '管道泄漏',
            '地质灾害',
            '隐患事件',
          ],
          axisLabel: {
            interval: 0,
            rotate: 20,
          },
        },
        yAxis: {
          type: 'value',
          name: '数量：个',
          axisLabel: { formatter: '{value}' },
        },
        series: [
          {
            type: 'bar',
            data: [7000, 6000, 5000, 4000, 3000, 2000, 1000],
            itemStyle: {
              color: '#1890FF',
            },
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
  width: 100%;
  height: calc(100vh - 490px);
}

.left {
  width: 80%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  margin: 15px;
}

.right {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 20px;
}

.stat-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  font-weight: bold;
  background-color: white;
}

.right {
  gap: 15px; /* 统一控制上下间距 */
}

.title {
  text-align: left;
  float: left;
  width: 40%;
  height: 30px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 12px;
}

.value {
  text-align: center;
  float: left;
  width: 30%;
  font-size: 20px;
  margin-top: 10px;
  margin-left: -20px;
  font-weight: bold;
}
</style>
