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
                <div class="card-title">
                  <div style="font-size: 30px; float: left">干吨水电耗</div>
                  <div style="float: left; line-height: 60px">(kWh/(km-MPa))</div>
                </div>
                <div class="center-num">340</div>
                <div class="progress-labels">
                  <div style="float: left; width: 33%; text-align: left">0</div>
                  <div style="float: left; width: 33%; text-align: center">380</div>
                  <div style="float: left; width: 33%; text-align: right">760</div>
                </div>
                <a-progress
                  :percent="Math.round((340 / 760) * 100)"
                  stroke-color="{ '0%':'#87d068','100%':'#f5222d'}"
                />
                <div class="progress-labels">
                  <div style="float: left; width: 33%; text-align: left">优</div>
                  <div style="float: left; width: 33%; text-align: center">中</div>
                  <div style="float: left; width: 33%; text-align: right">差</div>
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
                <a-icon type="dashboard" style="font-size: 30px;color:#3CCCA6;float: left;"/>
                <div style="float: left;line-height: 30px;margin-left: 20px;">在线泵房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;579</div>
              </div>
              <div class="status-item">
                <a-icon type="close-circle" style="font-size: 30px;color:#FE4C4A;float: left;"/>
                <div style="float: left;line-height: 30px;margin-left: 20px;">异常&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;19</div>
              </div>
              <div class="status-item">
                <a-icon type="warning" style="font-size: 30px;color:#FCFC00;float: left;"/>
                <div style="float: left;line-height: 30px;margin-left: 20px;">预警&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;121</div>
              </div>
              <div class="status-item">
                <a-icon type="poweroff" style="font-size: 30px;color:#0066FF;float: left;"/>
                <div style="float: left;line-height: 30px;margin-left: 20px;">离线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">维修/维护</div>
            <div class="progress-info">
              <div style="float: left;width: 30%;">维修 5/12</div>
              <a-progress :percent="42"  style="float: left;width: 70%;"/>
            </div>
            <div class="progress-info">
              <div style="float: left;width: 30%;">保养 8/9</div>
              <a-progress :percent="89" status="active"  style="float: left;width: 70%;"/>
            </div>
            <div class="progress-info">
              <div  style="float: left;width: 30%;">巡检 8/21</div>
              <a-progress :percent="38" status="exception"  style="float: left;width: 70%;"/>
            </div>
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
      const COLORS = ['#FB6260', '#0196FA', '#FEC245', '#4BCED0']

      // 简单的 HEX -> RGBA 转换，给“异常”做同色浅底
      const hexToRgba = (hex, a = 0.18) => {
        const n = hex.replace('#', '')
        const r = parseInt(n.slice(0, 2), 16)
        const g = parseInt(n.slice(2, 4), 16)
        const b = parseInt(n.slice(4, 6), 16)
        return `rgba(${r},${g},${b},${a})`
      }

      this.waterQuality.forEach((item, idx) => {
        const dom = document.getElementById('circle' + idx)
        if (!dom) return
        const chart = echarts.init(dom)

        // ✅ 按数组下标取色：每个圆环固定主色
        const base = COLORS[idx % COLORS.length]
        const bg = hexToRgba(base, 0.18)

        // 这里用百分比示例；如果你要“正常 100 / 异常 200”，把 value 改成 100/200 即可
        const data = [
          {
            name: '正常',
            value: item.percent,
            itemStyle: { color: base },
          },
          {
            name: '异常',
            value: Math.max(0, 100 - item.percent),
            itemStyle: { color: bg },
          },
        ]

        const legendValueMap = data.reduce((m, d) => ((m[d.name] = d.value), m), {})

        chart.setOption({
          // 不用全局 color 队列，改为各 data 的 itemStyle 定色（由 idx 决定）
          legend: {
            orient: 'vertical',
            right: 80,
            top: 'middle',
            icon: 'rect', // ✅ 正方形
            itemWidth: 12,
            itemHeight: 12,
            textStyle: { color: '#666' },
            formatter(name) {
              const v = legendValueMap[name] ?? ''
              return `${name} ${v}`
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['70%', '90%'],
              center: ['33%', '50%'], // ✅ 环状居左
              avoidLabelOverlap: true,
              label: { show: false },
              labelLine: { show: false },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
              },
              data,
            },
          ],
          graphic: {
            type: 'text',
            left: '30%', // 与饼图中心对齐
            top: 'center',
            style: {
              text: `${item.percent}%\n${item.label}`,
              textAlign: 'center',
              fill: '#333',
              fontSize: 12,
              lineHeight: 18,
              fontWeight: 500,
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
  font-size: 40px;
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
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  width: 100%;
}

.pump-status {
  display: flex;
  flex-wrap: wrap;
  background-color: #F2F2F2;
  padding: 10px;
}

.status-item {
  width: 100%;
  margin-bottom: 6px;
  font-size: 13px;
  height: 30px;
  margin-left: 30%;
}
.progress-info{
  width: 100% ;
  float: left;
  padding: 5px 0;
}
</style>
