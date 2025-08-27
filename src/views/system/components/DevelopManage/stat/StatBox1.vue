<template>
  <div class="container">
    <!-- div1 顶部 20% -->
    <div class="top">
      <div class="stat-item">
        <span class="label">管线总数量</span>
        <span class="value" style="color: #556edf">
          1,023
          <span class="unit">条</span>
        </span>
      </div>
      <div class="stat-item">
        <span class="label">管线总长度</span>
        <span class="value" style="color: #f59a23">
          8,612
          <span class="unit">万公里</span>
        </span>
      </div>
      <div class="stat-item" style="margin-right: 0">
        <span class="label">管线总运输能力</span>
        <span class="value" style="color: #6300bf">
          12,238,873
          <span class="unit">万吨/年</span>
        </span>
      </div>
    </div>

    <!-- div2 底部 80% -->
    <div class="bottom">
      <!-- 左侧 33% -->
      <div class="left">
        <div class="chart-box" ref="pie1" />
        <div class="chart-box" ref="pie2" />
      </div>

      <!-- 右侧 66% -->
      <div class="right">
        <div class="chart-box-big" ref="bar" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PipelineTab',
  mounted() {
    this.initPie1()
    this.initPie2()
    this.initBar()
  },
  methods: {
    initPie1() {
      const chart = echarts.init(this.$refs.pie1)
      chart.setOption({
        title: {
          text: '管线类型占比',
          left: '10px',
          top: '10px',
          textStyle: {
            fontSize: 14, // 字体大小
            fontFamily: 'Microsoft YaHei', // 字体
          },
        },
        legend: {
          orient: 'vertical',
          left: '10px',
          top: '40px',
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            right: '0',
            data: [
              {
                value: 60,
                name: '输气管道',
              },
              {
                value: 40,
                name: '输油管道',
              },
            ],
          },
        ],
      })
    },
    initPie2() {
      const chart = echarts.init(this.$refs.pie2)
      chart.setOption({
        title: {
          text: '管线布置形式占比',
          left: '10px',
          textStyle: {
            fontSize: 14, // 字体大小
            fontFamily: 'Microsoft YaHei', // 字体
          },
        },
        legend: {
          orient: 'vertical',
          left: '10px',
          top: '30px',
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            right: '0',
            data: [
              {
                value: 50,
                name: '单管系统',
              },
              {
                value: 30,
                name: '双管系统',
              },
              {
                value: 20,
                name: '独立管道系统',
              },
            ],
          },
        ],
      })
    },
    initBar() {
      const chart = echarts.init(this.$refs.bar)
      chart.setOption({
        title: {
          text: '管线总长度 Top5',
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
        // x轴改为类目轴
        xAxis: {
          type: 'category',
          data: ['孤罗东管线', '孤罗东管线2', '孤罗东管线3', '孤罗东管线4', '孤罗东管线5'],
          axisLabel: {
            interval: 0, // 全部显示
            rotate: 30, // 文字过长时倾斜显示
          },
        },
        // y轴改为数值轴
        yAxis: {
          type: 'value',
          name: '公里',
          axisLabel: { formatter: '{value}' },
        },
        series: [
          {
            type: 'bar',
            data: [50000, 40000, 30000, 20000, 10000],
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
  height: 460px;
}

.top {
  display: flex;
  justify-content: space-between;
  height: 20%;
  padding: 15px;
}

.stat-item {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 16px;
  margin-right: 15px;
  height: 60px;
  line-height: 60px;
  background-color: white;
  border-right: 5px;
}

.label {
  font-weight: bold;
}

.value {
  font-size: 18px;
  font-weight: bold;
}

.unit {
  margin-left: 4px;
  font-size: 10px;
  color: #5c5c5c;
}

.bottom {
  display: flex;
  height: 80%;
  padding: 0 15px;
}

.left {
  width: 32.7%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 5px;
}

.right {
  width: 66.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  margin-left: 15px;
}

.chart-box {
  height: 50%;
  min-height: 180px;
}

.chart-box-big {
  width: 100%;
  height: 100%;
}
</style>
