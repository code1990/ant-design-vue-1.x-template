<template>
  <div class="bottomBox">
    <div class="dashboard1">
      <a-row :gutter="10">
        <div class="panel-title">二次供水情况</div>
        <!-- 左侧 70% -->
        <a-col :span="24" class="left-panel">
          <a-row>
            <!-- 左 60% -->
            <a-col :span="14">
              <!-- div111 供水情况 -->
              <div class="card small-card">
                <div class="card-title">供水情况</div>
                <a-row>
                  <a-col :span="12" class="info-box">
                    <a-icon type="deployment-unit" class="icon" />
                    <div>
                      <div>总用水量</div>
                      <div class="num">7,591,312 m³</div>
                    </div>
                  </a-col>
                  <a-col :span="12" class="info-box">
                    <a-icon type="thunderbolt" class="icon" />
                    <div>
                      <div>今日用电量</div>
                      <div class="num">4,562,377 kW·h</div>
                    </div>
                  </a-col>
                </a-row>
              </div>

              <!-- div112 水质情况 -->
              <div class="card large-card">
                <div class="card-title">水质情况</div>
                <a-row :gutter="10">
                  <a-col :span="12" v-for="(item, idx) in waterQuality" :key="idx">
                    <div class="circle-card">
                      <div ref="circleCharts" :id="'circle' + idx" class="circle-chart"></div>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-col>

            <!-- 右 40% -->
            <a-col :span="10">
              <!-- div121 折线图 -->
              <div class="card chart-card">
                <div class="card-title">同时期干吨水电耗变化曲线图</div>
                <div ref="lineChart" class="chart"></div>
              </div>
              <!-- div122 进度条 -->
              <div class="card chart-card">
                <div class="card-title">干吨水电耗(kWh/(km-MPa))</div>
                <div class="center-num">340</div>
                <a-progress
                  :percent="Math.round((340 / 760) * 100)"
                  stroke-color="{ '0%':'#87d068','100%':'#f5222d'}"
                />
                <div class="progress-labels">
                  <span>0</span>
                  <span>380</span>
                  <span>760</span>
                </div>
                <div class="progress-labels">
                  <span>优</span>
                  <span>中</span>
                  <span>差</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div class="dashboard2">
      <a-row>
        <!-- 右侧 30% -->
        <a-col :span="24" class="right-panel">
          <div class="card">
            <div class="panel-title">泵房状态</div>
            <div class="pump-status">
              <div class="status-item">
                <a-icon type="dashboard" />
                在线泵房 579
              </div>
              <div class="status-item">
                <a-icon type="close-circle" />
                异常 19
              </div>
              <div class="status-item">
                <a-icon type="warning" />
                预警 121
              </div>
              <div class="status-item">
                <a-icon type="poweroff" />
                离线 9
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">维修/维护</div>
            <p>维修 5/12</p>
            <a-progress :percent="42" />
            <p>保养 8/9</p>
            <a-progress :percent="89" status="active" />
            <p>巡检 8/21</p>
            <a-progress :percent="38" status="exception" />
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
  data() {
    return {
      waterQuality: [
        {
          percent: 81,
          label: '余氯',
          normal: 467,
          abnormal: 112,
        },
        {
          percent: 97,
          label: 'PH',
          normal: 560,
          abnormal: 19,
        },
        {
          percent: 84,
          label: '浊度',
          normal: 468,
          abnormal: 93,
        },
        {
          percent: 88,
          label: '托管率',
          normal: 673,
          abnormal: 81,
        },
      ],
    }
  },
  mounted() {
    this.initLineChart()
    this.initCircleCharts()
  },
  methods: {
    // 折线图
    initLineChart() {
      const chart = echarts.init(this.$refs.lineChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: {
          top: 10, // 距离容器上边距
          right: 10, // 距离容器右边距
          bottom: 30, // 距离容器下边距
          left: 10, // 距离容器左边距
          containLabel: true, // ✅ 保证坐标轴标签不会被裁剪
        },
        legend: {
          data: ['今年能耗(kW-h/(km²-MPa))', '上年能耗(kW-h/(km²-MPa))'],
          bottom: 0, // ✅ 图例放在下方
          orient: 'horizontal', // 水平排列（默认就是 horizontal）
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '今年能耗(kW-h/(km²-MPa))',
            type: 'line',
            data: [90, 85, 80, 70, 75, 72, 65, 60, 58, 55, 53, 50],
          },
          {
            name: '上年能耗(kW-h/(km²-MPa))',
            type: 'line',
            data: [100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 73],
          },
        ],
      })
    },
    // 环形进度条
    initCircleCharts() {
      this.waterQuality.forEach((item, idx) => {
        const dom = document.getElementById('circle' + idx)
        const chart = echarts.init(dom)
        chart.setOption({
          series: [
            {
              type: 'pie',
              radius: ['70%', '90%'],
              avoidLabelOverlap: false,
              label: { show: false },
              data: [
                {
                  value: item.percent,
                  name: '正常',
                },
                {
                  value: 100 - item.percent,
                  name: '异常',
                },
              ],
            },
          ],
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: `${item.percent}% ${item.label}\n正常${item.normal}\n异常${item.abnormal}`,
              textAlign: 'center',
              fill: '#333',
              fontSize: 12,
            },
          },
        })
      })
    },
  },
}
</script>

<style scoped>
.bottomBox {
  width: 100%;
}

.dashboard1 {
  width: 70%;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  float: left;
  border-radius: 5px;
  height: 450px;
}

.dashboard2 {
  width: calc(30% - 10px);
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  float: left;
  margin-left: 10px;
  border-radius: 5px;
  height: 450px;
}

.panel-title {
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 1px solid #edf2fa;
  margin-bottom: 15px;
}

.card {
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  margin-bottom: 10px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.small-card {
  margin-bottom: 10px;
}

.large-card {
  margin-bottom: 10px;
}

.info-box {
  display: flex;
  align-items: center;
  padding: 5px;
}

.icon {
  font-size: 24px;
  margin-right: 8px;
  color: #1890ff;
}

.num {
  font-size: 16px;
  font-weight: bold;
}

.chart {
  width: 100%;
  height: 180px;
}

.circle-card {
  height: 100px;
}

.circle-chart {
  width: 100%;
  height: 100%;
}

.center-num {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.pump-status {
  display: flex;
  flex-wrap: wrap;
}

.status-item {
  width: 50%;
  margin-bottom: 6px;
  font-size: 13px;
}
</style>
