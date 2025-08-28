<template>
  <div class="rightBox">
    <div class="container">
      <!-- div1 -->
      <div class="section">
        <div class="title"><span>用水统计</span></div>
        <div class="content grid2x2 crystal">
          <div v-for="(item, i) in waterStats" :key="i" class="crystal-item">
            <div class="crystal-text">{{ item.label }}</div>
            <div class="crystal-value">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!-- div2 -->
      <div class="section">
        <div class="title"><span>监测统计</span></div>
        <div class="content grid2x2 monitor">
          <div v-for="(item, i) in monitorStats" :key="i" class="monitor-item">
            <div class="left-bar"></div>
            <div class="right-content">
              <div class="right-top">
                <a-icon type="dropbox" style="margin-right: 6px" />
                <span>{{ item.label }}</span>
              </div>
              <div class="right-bottom">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- div3 -->
      <div class="section">
        <div class="title"><span>会话统计</span></div>
        <div class="content flex-row">
          <!-- 左侧统计 -->
          <div class="left-stats">
            <div v-for="(item, i) in sessionStats" :key="i" class="stat-box">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
            </div>
          </div>
          <!-- 右侧堆叠柱状图 -->
          <div class="right-chart" ref="barChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      waterStats: [
        {
          label: '全市用水总量',
          value: '433.5亿',
        },
        {
          label: '非农监控户数',
          value: '433户',
        },
        {
          label: '非农用水总量',
          value: '433.5亿',
        },
        {
          label: '灌区监控户数',
          value: '433户',
        },
      ],
      monitorStats: [
        {
          label: '年累计非农监测取水量',
          value: '99.9754亿m²',
        },
        {
          label: '监测点在线率',
          value: '88.56%',
        },
        {
          label: '年累计灌区渠首监测取水量',
          value: '88.6060亿m',
        },
        {
          label: '年累计灌区首监测取水量',
          value: '88.6060亿m',
        },
      ],
      sessionStats: [
        {
          label: '总会话数',
          value: '13216',
        },
        {
          label: '使用总容量',
          value: '132G',
        },
        {
          label: '超长会话数',
          value: '13216',
        },
      ],
    }
  },
  mounted() {
    this.initBarChart()
  },
  methods: {
    initBarChart() {
      const chart = echarts.init(this.$refs.barChart)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        legend: { data: ['总会话数', '超长会话数'] },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['DWS数据库', 'HIMe数据库', 'HBase数据库'],
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '总会话数',
            type: 'bar',
            stack: 'total',
            data: [120, 200, 150],
          },
          {
            name: '超长会话数',
            type: 'bar',
            stack: 'total',
            data: [80, 50, 100],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="less">
.rightBox {
  width: 20%;
  height: calc(100vh - 50px);
  float: left;
  background-color: black; /* 背景透明 */
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
}

.title {
  flex: 0 0 40px;
  background: url('~@/assets/images/tip2.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: bold;
  color: #333;
}

.content {
  flex: 1;
  padding: 10px;
}

/* div1 水晶球 */
.grid2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}

.crystal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle at center, #e6f7ff, #bae7ff);
  border: 2px solid #91d5ff;
  text-align: center;
  width: 100%;
  height: 100%;
}

.crystal-text {
  font-size: 14px;
  margin-bottom: 4px;
}

.crystal-value {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
}

/* div2 监测 */
.monitor-item {
  display: flex;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.left-bar {
  width: 6px;
  background: linear-gradient(to bottom, #1890ff, #69c0ff);
}

.right-content {
  flex: 1;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right-top {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.right-bottom {
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  text-align: center;
}

/* div3 会话统计 */
.flex-row {
  display: flex;
  height: 100%;
}

.left-stats {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.stat-box {
  text-align: center;
  padding: 10px 0;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
}

.stat-label {
  font-size: 14px;
  color: #555;
}

.right-chart {
  flex: 1;
  height: 100%;
}
</style>
