<template>
  <div class="rightBox">
    <div class="container">
      <!-- div1 -->
      <div class="section" style="background-color: #131f38">
        <div class="title"><span>用水统计</span></div>
        <div class="content grid2x2 crystal">
          <div v-for="(item, i) in waterStats" :key="i" :class="['crystal-item', `crystal-${i}`]">
            <div class="crystal-text">{{ item.label }}</div>
            <div class="crystal-value" v-if="false">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!-- div2 -->
      <div class="section">
        <div class="title"><span>监测统计</span></div>
        <div class="content grid2x2 monitor">
          <div v-for="(item, i) in monitorStats" :key="i" class="monitor-item">
            <div :class="['left-bar', `left-bar-${i}`]"></div>
            <div class="right-content">
              <div class="right-top">
                <a-icon type="dashboard" style="margin-right: 6px" />
                <span v-html="item.label"></span>
              </div>
              <div :class="['right-bottom', `right-bottom-${i}`]">
                {{ item.value }}
                <span style="font-size: 10px">{{ item.unit }}</span>
              </div>
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
            <div v-for="(item, i) in sessionStats" :key="i" :class="['stat-box', `stat-box-${i}`]">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label" v-html="item.label"></div>
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
          label: '年累计非农<br>监测取水量',
          value: '99.9754',
          unit: '亿m²',
        },
        {
          label: '监测点在线率',
          value: '88.56',
          unit: '%',
        },
        {
          label: '年累计灌区渠<br>首监测取水量',
          value: '88.6060',
          unit: '亿m²',
        },
        {
          label: '年累计灌区渠<br>首监测取水量',
          value: '88.6060',
          unit: '亿m²',
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
        legend: {
          data: ['总会话数', '超长会话数'],
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          top: 30,
          left: 10,
          right: 10,
          bottom: 50,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['DWS数据库', 'HIMe数据库', 'HBase数据库'],
          axisLabel: {
            color: '#fff',
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff',
          },
        },
        color: ['#0D82FD', '#0FFCCC'], // 系列1/系列2颜色
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
  background-color: #131f38;
}

.title {
  flex: 0 0 40px;
  background: url('~@/assets/images/tip2.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: self-end;
  padding-left: 10px;
  font-weight: bold;
  color: #fff;
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
  text-align: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat; /* 不平铺 */
  background-size: 66%; /* 等比缩放，铺满容器 */
  background-position: bottom; /* 居中对齐 */
}

.crystal-text {
  font-size: 14px;
  color: white;
  margin-top: -110px;
}

.crystal-value {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
}

/* div2 监测 */
.monitor-item {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}

.left-bar {
  width: 6px;
  background: linear-gradient(to bottom, #1890ff, #69c0ff);
}

.left-bar-0 {
  width: 6px;
  background: linear-gradient(to bottom, #4858de, #43a2df);
}

.left-bar-1 {
  width: 6px;
  background: linear-gradient(to bottom, #cd68a8, #7f31d2);
}

.left-bar-2 {
  width: 6px;
  background: linear-gradient(to bottom, #d9543c, #d8bb5e);
}

.left-bar-3 {
  width: 6px;
  background: linear-gradient(to bottom, #e2563c, #2be1f8);
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
  color: white;
}

.right-bottom {
  font-size: 30px;
  font-weight: bold;
  color: #1890ff;
  text-align: center;
}

.right-bottom-0 {
  color: #1890ff;
}

.right-bottom-1 {
  color: #cd68a8;
}

.right-bottom-2 {
  color: #d9543c;
}

.right-bottom-3 {
  color: #2be1f8;
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
  height: 70px;
}

.stat-box {
  text-align: center;
  padding: 3px 0;
  margin-top: 10px;
  border-left:1px solid #2B7DFE;
  border-bottom:1px solid #2B7DFE;
  border-top:1px solid #2B7DFE;
  background: linear-gradient(to right, #103075, #131F3A);
}
.stat-box-0{
  margin-top: 0px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: #fff;
}

.right-chart {
  flex: 1;
  height: 100%;
}

.crystal-0 {
  background-image: url('@/assets/images/ps_1.png');
}

.crystal-1 {
  background-image: url('@/assets/images/ps_2.png');
}

.crystal-2 {
  background-image: url('@/assets/images/ps_3.png');
}

.crystal-3 {
  background-image: url('@/assets/images/ps_4.png');
}
</style>
