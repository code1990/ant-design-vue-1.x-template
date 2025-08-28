<template>
  <div class="leftBox">
    <div class="container">
      <!-- div1 -->
      <div class="section">
        <div class="title">
          <span>横向柱状图</span>
        </div>
        <div class="content" ref="barChart"></div>
      </div>

      <!-- div2 -->
      <div class="section">
        <div class="title">
          <span>无边框表格</span>
        </div>
        <div class="content">
          <div class="custom-table">
            <div class="row header">
              <div class="cell">日期</div>
              <div class="cell">数据源区</div>
              <div class="cell">监测数据</div>
              <div class="cell">处理进度</div>
            </div>
            <div v-for="item in tableData" :key="item.id" class="row">
              <div class="cell">{{ item.date }}</div>
              <div class="cell">{{ item.source }}</div>
              <div class="cell">{{ item.value }}</div>
              <div class="cell">{{ item.status }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- div3 -->
      <div class="section">
        <div class="title">
          <span>2×3 网格</span>
        </div>
        <div class="content grid">
          <div v-for="(item, index) in gridData" :key="index" class="grid-item">
            <div class="grid-top">
              <div class="stat-box">{{ item.percent }}</div>
            </div>
            <div class="grid-bottom">
              {{ item.value }}
            </div>
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
      tableData: [],
      gridData: [],
    }
  },
  mounted() {
    this.mockTable()
    this.mockGrid()
    this.initBar()
  },
  methods: {
    mockTable() {
      this.tableData = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        date: `2019-09-0${i + 1}`,
        source: '河段',
        value: (Math.random() * 100).toFixed(4),
        status: i % 2 === 0 ? '已处理' : '处理中',
      }))
    },
    mockGrid() {
      this.gridData = Array.from({ length: 6 }).map(() => ({
        percent: `${Math.floor(Math.random() * 100)}%`,
        value: `${Math.floor(Math.random() * 500)},${Math.floor(Math.random() * 500)}`,
      }))
    },
    initBar() {
      const chart = echarts.init(this.$refs.barChart)
      const dates = Array.from({ length: 5 }).map((_, i) => `8月${28 - i}日`)
      const data1 = dates.map(() => Math.floor(Math.random() * 50))
      const data2 = dates.map(() => Math.floor(Math.random() * 50))
      chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['河长巡查', '公众反馈'] },
        grid: {
          left: '20%',
          right: '10%',
          bottom: '10%',
          top: '10%',
        },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          data: dates,
          inverse: true,
        },
        series: [
          {
            name: '河长巡查',
            type: 'bar',
            data: data1,
          },
          {
            name: '公众反馈',
            type: 'bar',
            data: data2,
          },
        ],
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
  background-color: #13152D; /* 背景透明 */
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
}

.section:last-child {
  border-right: none;
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

/* 表格 */
.custom-table {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  padding: 6px 0;
}

.row.header {
  font-weight: bold;
}

.cell {
  flex: 1;
  color: white;
}

/* grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  border-left: 4px solid #1890ff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #1890ff;
  padding: 6px;
}

.grid-top {
  flex: 0 0 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-box {
  width: 80%;
  border: 1px solid #1890ff;
  border-radius: 5px;
  text-align: center;
  padding: 4px;
}

.grid-bottom {
  flex: 0 0 40%;
  text-align: center;
  font-weight: bold;
}
</style>
