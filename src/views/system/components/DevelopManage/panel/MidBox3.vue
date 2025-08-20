<template>
  <div class="midBox3">
    <div class="dashboard1">
      <a-row>
        <!-- 左侧 70% -->
        <a-col :span="24" class="left-panel">
          <div class="panel-title">管网情况</div>
          <a-row :gutter="10">
            <a-col :span="6" v-for="(item, idx) in pipes" :key="idx">
              <div class="stat-card">
                <div class="stat-content">
                  <a-icon :type="item.icon" class="stat-icon" />
                  <div class="info-title">{{ item.title }}</div>
                  <div style="padding: 5px 20px;">新增 {{ item.add }} {{ item.unit }}</div>
                  <div style="padding: 5px 20px;">总计 {{ item.total }} {{ item.unit }}</div>
                  <a-progress :percent="Math.round((item.add / item.total) * 100)" size="small" style="padding: 5px 20px;" />
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
          <div class="panel-title">监测</div>

          <!-- div21 折线图 -->
          <div class="chart-card chart-top">
            <div class="chart-title">压力合格率与压力富余度</div>
            <div ref="lineChart" class="chart"></div>
          </div>

          <!-- div22 三个统计卡片 -->
          <div class="chart-bottom">
            <a-row :gutter="10">
              <a-col :span="24">
                <div class="mini-card">
                  <div class="mini-title">巡检完成情况</div>
                  <div class="mini-values">
                    <div>
                      <div class="num">26.7</div>
                      <div class="txt">已巡(km)</div>
                    </div>
                    <div>
                      <div class="num">28.49</div>
                      <div class="txt">未巡(km)</div>
                    </div>
                    <div>
                      <div class="num">66.97</div>
                      <div class="txt">总长(km)</div>
                    </div>
                    <a-progress
                      type="circle"
                      :percent="Math.round((26.7 / 66.97) * 100)"
                      :width="40"
                    />
                  </div>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="mini-card">
                  <div class="mini-title">DMA分析</div>
                  <div class="mini-values">
                    <div>
                      <div class="num">15</div>
                      <div class="txt">暗漏(处)</div>
                    </div>
                    <div>
                      <div class="num">13</div>
                      <div class="txt">明漏(处)</div>
                    </div>
                    <div>
                      <div class="num">66.97</div>
                      <div class="txt">总计(处)</div>
                    </div>
                    <a-progress type="circle" :percent="Math.round((15 / 66.97) * 100)" :width="40" />
                  </div>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="mini-card">
                  <div class="mini-title">维修统计</div>
                  <div class="mini-values">
                    <div>
                      <div class="num">24</div>
                      <div class="txt">爆管(件)</div>
                    </div>
                    <div>
                      <div class="num">28</div>
                      <div class="txt">自检(件)</div>
                    </div>
                    <div>
                      <div class="num">66.97</div>
                      <div class="txt">第三方破坏(件)</div>
                    </div>
                    <a-progress type="circle" :percent="Math.round((24 / 66.97) * 100)" :width="40" />
                  </div>

                </div>
              </a-col>
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
  name: 'PipeDashboard',
  data() {
    return {
      pipes: [
        {
          title: '管网',
          add: 14.65,
          total: 476.49,
          unit: 'km',
          icon: 'apartment',
        },
        {
          title: '压力计',
          add: 10,
          total: 192,
          unit: '个',
          icon: 'dashboard',
        },
        {
          title: '流量计',
          add: 12,
          total: 121,
          unit: '个',
          icon: 'area-chart',
        },
        {
          title: '闸阀',
          add: 22,
          total: 417,
          unit: '个',
          icon: 'gateway',
        },
        {
          title: '水质传感器',
          add: 38,
          total: 479,
          unit: '个',
          icon: 'experiment',
        },
        {
          title: '大用户表',
          add: 5,
          total: 53,
          unit: '个',
          icon: 'user',
        },
        {
          title: '户表',
          add: 23,
          total: 4125,
          unit: '个',
          icon: 'team',
        },
        {
          title: '消防栓',
          add: 16,
          total: 3571,
          unit: '个',
          icon: 'fire',
        },
      ],
    }
  },
  mounted() {
    this.initLineChart()
  },
  methods: {
    initLineChart() {
      const chart = echarts.init(this.$refs.lineChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: {
          top: 20, // 距离容器上边距
          right: 10, // 距离容器右边距
          bottom: 10, // 距离容器下边距
          left: 10, // 距离容器左边距
          containLabel: true, // ✅ 保证坐标轴标签不会被裁剪
        },
        legend: { data: ['压力合格率', '压力富余度'] },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 12 }, (_, i) => `4.${i + 1}`),
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '压力合格率',
            type: 'line',
            smooth: true,
            data: [85, 88, 87, 86, 89, 90, 91, 92, 93, 91, 90, 89],
          },
          {
            name: '压力富余度',
            type: 'line',
            smooth: true,
            data: [60, 62, 61, 63, 65, 64, 66, 67, 68, 66, 65, 64],
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.midBox3 {
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

.stat-card {
  border-radius: 6px;
  padding: 6px;
  display: flex;
  align-items: flex-start;
  background-color: #F2F2F2;
  margin-bottom: 10px;
  height: 185px;
}

.stat-icon {
  font-size: 36px;
  margin-right: 10px;
  color: #1890ff;
  padding: 20px;
}

.stat-content p {
  margin: 2px 0;
  font-size: 13px;
  width: 100%;
}

.chart-card {
  border-radius: 6px;
  background: #fff;
  padding: 6px;
}

.chart-title {
  font-size: 14px;
  margin-bottom: 5px;
}

.chart {
  width: 100%;
  height: 140px;
}

.chart-bottom {
  margin-top: 5px;
}

.mini-card {
  border-radius: 6px;
  background: #fff;
  text-align: center;
}

.mini-title {
  font-size: 13px;
  margin-bottom: 5px;
  text-align: left;
}

.mini-values {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}

.num {
  font-size: 14px;
  font-weight: bold;
}

.txt {
  font-size: 12px;
  color: #666;
}
.info-title{
  float: right;
  padding: 20px 20px;
  font-size: 20px;
}
</style>
