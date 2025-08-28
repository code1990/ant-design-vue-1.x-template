<template>
  <div class="leftBox">
    <div class="overview-container">
      <!-- div1 -->
      <div class="div1">
        <!-- 标题栏 -->
        <div class="header">
          <div class="tip"></div>
          <div class="title">总览</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <!-- 渐变分割线 -->
        <div class="divider"></div>
        <!-- 4个进度圈 -->
        <div class="circle-container">
          <div
            v-for="(item, idx) in circles"
            :key="idx"
            class="circle-item"
            :id="'circle' + idx"
          ></div>
        </div>
      </div>

      <!-- div2 -->
      <div class="div2">
        <!-- 标题栏 -->
        <div class="header">
          <div class="tip"></div>
          <div class="title">水质状态</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <!-- 渐变分割线 -->
        <div class="divider"></div>
        <div class="metric-row" v-for="(item, idx) in metrics" :key="idx">
          <div class="metric-circle">{{ item.name }}</div>
          <div class="metric-cell">{{ item.desc }}</div>
          <div class="metric-cell">{{ item.range }}</div>
          <div class="metric-cell normal">正常{{ item.normal }}</div>
          <div class="metric-cell offline">离线{{ item.offline }}</div>
          <div class="metric-cell abnormal">异常{{ item.abnormal }}</div>
        </div>
      </div>

      <!-- div3 -->
      <div class="div3">
        <!-- 标题栏 -->
        <div class="header">
          <div class="tip"></div>
          <div class="title">实时数据</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <!-- 渐变分割线 -->
        <div class="divider"></div>
        <div class="table-container">
          <!-- 遍历数据 -->
          <div class="table-row" v-for="(row, idx) in rows" :key="idx">
            <!-- 如果是最后一行，先插入标题 -->
            <div v-if="idx === 0" class="table-header">
              <div class="table-cell head"></div>
              <div class="table-cell head"></div>
              <div class="table-cell head"></div>
              <div v-for="h in headers" :key="h" class="table-cell head">{{ h }}</div>
            </div>

            <!-- 数据行 -->
            <div class="table-cell icon">
              <a-icon type="environment" />
            </div>
            <div class="table-cell">{{ row.station }}</div>
            <div class="table-cell">
              <div class="double-circle"></div>
            </div>
            <div class="table-cell">{{ row.nh3 }}</div>
            <div class="table-cell">{{ row.cod }}</div>
            <div class="table-cell">{{ row.tn }}</div>
            <div class="table-cell">{{ row.tp }}</div>
          </div>
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
      updateTime: new Date().toLocaleString(),
      circles: [
        {
          name: '行政区',
          monitored: 48,
          unmonitored: 5,
        },
        {
          name: '污水厂',
          monitored: 48,
          unmonitored: 5,
        },
        {
          name: '监控设备',
          monitored: 48,
          unmonitored: 5,
        },
        {
          name: '河道',
          monitored: 48,
          unmonitored: 5,
        },
      ],
      color: ['#2897CF', '#FF9900', '#67CC9A', '#2C99CD'],
      metrics: [
        {
          name: 'NH3',
          desc: '氨氮',
          range: '0-8mg/L',
          normal: 48,
          offline: 48,
          abnormal: 3,
        },
        {
          name: 'COD',
          desc: 'COD',
          range: '0-8mg/L',
          normal: 48,
          offline: 48,
          abnormal: 3,
        },
        {
          name: '总氨',
          desc: '总氨',
          range: '0-8mg/L',
          normal: 48,
          offline: 48,
          abnormal: 3,
        },
        {
          name: '总氮',
          desc: '总氮',
          range: '0-8mg/L',
          normal: 48,
          offline: 48,
          abnormal: 3,
        },
      ],
      headers: ['氨氮', 'COD', '总氮', '总磷'],
      rows: [
        {
          station: '水处理站',
          nh3: 0.1,
          cod: 0.6,
          tn: 0.1,
          tp: 0.6,
        },
        {
          station: '水处理站',
          nh3: 0.1,
          cod: 0.6,
          tn: 0.1,
          tp: 0.6,
        },
        {
          station: '水处理站',
          nh3: 0.1,
          cod: 0.6,
          tn: 0.1,
          tp: 0.6,
        },
        {
          station: '水处理站',
          nh3: 0.1,
          cod: 0.6,
          tn: 0.1,
          tp: 0.6,
        },
      ],
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.circles.forEach((item, idx) => {
        const dom = document.getElementById('circle' + idx)
        const chart = echarts.init(dom)
        // series 数据
        const seriesData = [
          {
            value: item.monitored,
            name: '已监测',
            itemStyle: { color: '#4caf50' },
          },
          {
            value: item.unmonitored,
            name: '未监测',
            itemStyle: { color: '#f44336' },
          },
        ]
        chart.setOption({
          title: {
            text: item.name,
            left: 'center',
            bottom: '50%',
            textStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
            },
          },
          legend: {
            orient: 'horizontal',
            bottom: 0,
            left: 'center',
            textStyle: {
              fontSize: 10,
              fontWeight: 'bold',
              color: 'white',
            },
            formatter: function (name) {
              // 从 seriesData 中找对应数量
              const d = seriesData.find(d => d.name === name)
              return d ? `${name} ${d.value}` : name
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['65%', '85%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: false,
              label: { show: false },
              data: [
                {
                  value: item.monitored,
                  name: '已监测',
                  itemStyle: { color: '#4caf50' },
                },
                {
                  value: item.unmonitored,
                  name: '未监测',
                  itemStyle: { color: '#f44336' },
                },
              ],
            },
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                textAlign: 'center',
                fill: 'white',
                fontSize: 12,
              },
            },
          ],
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
.leftBox {
  width: 20%;
  height: calc(100vh - 50px);
  float: left;
  background-color: black; /* 背景透明 */
}

.overview-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.div1 {
  height: 20%;
  display: flex;
  flex-direction: column;
}

.div2 {
  height: 40%;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  overflow-y: auto; /* 内容多时可滚动 */
}

.div3 {
  height: 40%;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  font-size: 16px;
  font-weight: bold;
}

.title {
  color: white;
}

.time {
  color: white;
  font-size: 10px;
}

.divider {
  height: 2px;
  background: linear-gradient(to right, #4caf50, #2196f3);
  margin: 4px 8px;
}

.circle-container {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.circle-item {
  width: 22%;
  height: 100%;
}

/* div2 样式 */
.metric-row {
  display: flex;
  align-items: center;
  width: 100%; /* 占满整行 */
  padding: 8px 0;
}

.metric-circle {
  width: 48px;
  height: 48px;
  border: 2px solid #2196f3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2196f3;
  margin-right: 12px;
}

.metric-cell {
  flex: 1;
  text-align: center;
  color: white;
}

.metric-cell.normal {
  color: #4caf50;
}

.metric-cell.offline {
  color: #999;
}

.metric-cell.abnormal {
  color: #f44336;
}

.table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.table-header {
  display: flex;
  width: 100%;
  font-weight: bold;
  color: #333;
  margin: 6px 0;
}

.table-cell {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: white;
  padding: 2px 4px;
}

.table-cell.icon {
  flex: 0 0 40px;
}

.table-cell.head {
  font-size: 14px;
  font-weight: bold;
  color: #2196f3;
}

/* 双圆圈样式 */
.double-circle {
  position: relative;
  width: 22px;
  height: 22px;
  border: 2px solid #2196f3;
  border-radius: 50%;
  margin: 0 auto;
}

.double-circle::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 10px;
  height: 10px;
  border: 2px solid #2196f3;
  border-radius: 50%;
}

.tip {
  float: left;
  width: 20px;
  height: 20px;
  background-image: url('~@/assets/images/tip.png');
  background-repeat: no-repeat; /* 不平铺 */
  background-size: cover; /* 等比缩放，铺满容器 */
  background-position: center; /* 居中对齐 */
}
</style>
