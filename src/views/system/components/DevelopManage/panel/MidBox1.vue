<template>
  <div class="midBox1">
    <div class="dashboard1">
      <a-row>
        <!-- 左侧 70% -->
        <a-col :span="24" class="left-panel">
          <div class="panel-title">原水情况</div>

          <!-- 上半部分 -->
          <div class="half-panel">
            <a-row>
              <!-- 面积图 -->
              <a-col :span="12">
                <div class="chart-card">
                  <div class="chart-title">采样合格率变化面积图</div>
                  <div ref="areaChart" class="chart"></div>
                </div>
              </a-col>
              <!-- 饼状图 -->
              <a-col :span="12">
                <div class="chart-card">
                  <div class="chart-title">水质级别饼状图</div>
                  <div ref="pieChart" class="chart"></div>
                </div>
              </a-col>
            </a-row>
          </div>

          <!-- 下半部分 -->
          <div class="half-panel">
            <div class="chart-card">
              <div class="chart-title">取水量/电耗对比变化曲线图</div>
              <div ref="lineChart" class="chart"></div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="dashboard2">
      <a-row>
        <!-- 右侧 30% -->
        <a-col :span="24" class="right-panel">
          <div class="panel-title">监控视频</div>

          <!-- 上半部分 div1 -->
          <div class="half-panel video-top">
            <div class="video-box bg-v4"></div>
          </div>

          <!-- 下半部分 div2 -->
          <div class="half-panel video-bottom">
            <a-row style="height: 100%">
              <!-- 左侧按钮区 -->
              <a-col :span="7" class="video-buttons">
                <a-button type="primary" block>方圆水库</a-button>
                <a-button type="primary" block>进年河</a-button>
                <a-button type="primary" block>贝冲水库</a-button>
              </a-col>
              <!-- 右侧背景图 -->
              <a-col :span="17" class="video-box bg-v5" style="margin-left: 10px;"></a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'WaterDashboard',
  mounted() {
    this.initAreaChart()
    this.initPieChart()
    this.initLineChart()
  },
  methods: {
    // 面积图
    initAreaChart() {
      const chart = echarts.init(this.$refs.areaChart)
      chart.setOption({
        grid: {
          top: 20, // 距离容器上边距
          right: 20, // 距离容器右边距
          bottom: 20, // 距离容器下边距
          left: 20, // 距离容器左边距
          containLabel: true, // ✅ 保证坐标轴标签不会被裁剪
        },
        tooltip: { trigger: 'axis' },
        legend: { data: ['余氯', 'PH', '浊度'] },
        xAxis: {
          type: 'category',
          data: ['4.8', '4.9', '4.10', '4.11', '4.12', '4.13'],
        },
        yAxis: {
          type: 'value',
          min: 50,
          max: 100,
        },
        series: [
          {
            name: '余氯',
            data: [60, 72, 80, 65, 78, 90],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#ff4d4f' }, // 红色
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,77,79,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,77,79,0.1)',
                },
              ]),
            },
          },
          {
            name: 'PH',
            data: [70, 68, 75, 82, 79, 85],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#1890ff' }, // 蓝色
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(24,144,255,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(24,144,255,0.1)',
                },
              ]),
            },
          },
          {
            name: '浊度',
            data: [65, 74, 69, 76, 81, 88],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#52c41a' }, // 绿色
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(82,196,26,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(82,196,26,0.1)',
                },
              ]),
            },
          },
        ],
      })
    },
    // 饼图
    initPieChart() {
      const chart = echarts.init(this.$refs.pieChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        legend: {
          orient: 'vertical',
          right: 60,
          top: 'middle',
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['35%', '50%'],
            data: [
              {
                value: 5,
                name: 'Ⅰ类水质 38%',
              },
              {
                value: 3,
                name: 'Ⅱ类水质 23%',
              },
              {
                value: 2,
                name: 'Ⅲ类水质 15%',
              },
              {
                value: 2,
                name: 'IV类水质 15%',
              },
              {
                value: 1,
                name: 'V类水质 7%',
              },
            ],
          },
        ],
      })
    },
    // 折线对比图
    initLineChart() {
      const chart = echarts.init(this.$refs.lineChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: {
          top: 20, // 距离容器上边距
          right: 20, // 距离容器右边距
          bottom: 20, // 距离容器下边距
          left: 20, // 距离容器左边距
          containLabel: true, // ✅ 保证坐标轴标签不会被裁剪
        },
        legend: { data: ['取水量', '电耗'] },
        color: ['#43CDA9', '#52A2F3'],
        xAxis: {
          type: 'category',
          data: ['4.8', '4.9', '4.10', '4.11', '4.12', '4.13'],
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '取水量',
            type: 'line',
            data: [200, 520, 530, 220, 540, 560],
          },
          {
            name: '电耗',
            type: 'line',
            data: [500, 210, 220, 550, 225, 240],
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.midBox1 {
  width: 100%;
  background-color: white;
}
.dashboard1 {
  width: 70%;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  float: left;
  border-radius: 5px;
  height: 560px;
}
.dashboard2 {
  width: calc(30% - 10px);
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  float: left;
  margin-left: 10px;
  border-radius: 5px;
  height: 560px;
}
.left-panel,
.right-panel {
  padding: 5px;
}

.panel-title {
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 1px solid #edf2fa;
  margin-bottom: 20px;
}

.half-panel {
  height: 50%;
  margin-bottom: 10px;
}

.chart-card {
  border-radius: 6px;
  padding: 5px;
  height: 100%;
  background: #fff;
}

.chart-title {
  font-size: 14px;
  margin-bottom: 5px;
}

.chart {
  width: 100%;
  height: 200px;
}

/* 监控视频样式 */
.video-top .video-box {
  width: 100%;
  height: 300px;
  border-radius: 6px;
}

.video-bottom {
  height: 100%;
}

.video-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
}

.video-buttons .ant-btn {
  margin-bottom: 8px;
}

.video-box {
  width: 33%;
  height: 120px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
}

.bg-v4 {
  background-image: url('~@/assets/v4.png');
}

.bg-v5 {
  background-image: url('~@/assets/v3.png');
}
</style>
