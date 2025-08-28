<template>
  <div class="rightBox">
    <div class="main-container">
      <!-- ================= div1 ================= -->
      <div class="div1">
        <!-- 标题区 -->
        <div class="div11 header">
          <div class="tip"></div>
          <div class="title">处理工艺</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <div class="divider"></div>
        <!-- 内容区 -->
        <div class="div12">
          <div class="div121" ref="chartProcess"></div>
          <div class="div122" ref="chartLevel"></div>
        </div>
      </div>

      <!-- ================= div2 ================= -->
      <div class="div2">
        <div class="div21 header">
          <div class="tip"></div>
          <div class="title">趋势分析</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <div class="divider"></div>
        <div class="div22">
          <div class="filters">
            <a-select v-model="plant2" style="width: 60px; margin-right: 10px" size="small">
              <a-select-option value="厂1">污水处理厂1</a-select-option>
              <a-select-option value="厂2">污水处理厂2</a-select-option>
            </a-select>
            <a-select v-model="metric2" style="width: 60px" size="small">
              <a-select-option value="氨氮">氨氮</a-select-option>
              <a-select-option value="COD">COD</a-select-option>
            </a-select>
          </div>
          <div ref="chartLine" class="chart"></div>
        </div>
      </div>

      <!-- ================= div3 ================= -->
      <div class="div3">
        <div class="div31 header">
          <div class="tip"></div>
          <div class="title">进出水对比</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <div class="divider"></div>
        <div class="div32">
          <div class="filters">
            <a-select v-model="plant3" style="width: 60px" size="small">
              <a-select-option value="厂1">污水处理厂1</a-select-option>
              <a-select-option value="厂2">污水处理厂2</a-select-option>
            </a-select>
          </div>
          <div ref="chartBar" class="chart"></div>
        </div>
      </div>

      <!-- ================= div4 ================= -->
      <div class="div4">
        <div class="div41 header">
          <div class="tip"></div>
          <div class="title">报警信息</div>
          <div class="time">更新时间：{{ updateTime }}</div>
        </div>
        <div class="divider"></div>
        <div class="div42">
          <div class="custom-table">
            <!-- 表头 -->
            <div class="table-header">
              <div class="cell">ID</div>
              <div class="cell">站点</div>
              <div class="cell">事件</div>
              <div class="cell">时间</div>
              <div class="cell">状态</div>
              <div class="cell">等级</div>
            </div>

            <!-- 表体 -->
            <div class="table-row" v-for="row in tableData" :key="row.id">
              <div class="cell id">{{ row.id }}</div>
              <div class="cell station">{{ row.station }}</div>
              <div class="cell event">{{ row.event }}</div>
              <div class="cell time">{{ row.time }}</div>
              <div class="cell status" :style="{ color: statusColor(row.status) }">
                {{ row.status }}
              </div>
              <div class="cell level" :style="{ color: levelColor(row.level) }">
                {{ row.level }}
              </div>
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
  name: 'Dashboard',
  data() {
    return {
      updateTime: new Date().toLocaleString(),
      plant2: '厂1',
      metric2: '氨氮',
      plant3: '厂1',
      columns: [
        {
          title: '污水厂站',
          dataIndex: 'station',
        },
        {
          title: '事件',
          dataIndex: 'event',
        },
        {
          title: '时间',
          dataIndex: 'time',
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '等级',
          dataIndex: 'level',
          scopedSlots: { customRender: 'level' },
        },
      ],
      tableData: [
        {
          id: 1,
          station: '污水处理站',
          event: 'COD超标',
          time: '2022-01-11 09:00',
          status: '待处理',
          level: '严重',
        },
        {
          id: 2,
          station: '污水处理站',
          event: '氨氮异常',
          time: '2022-01-11 10:00',
          status: '在处理',
          level: '重大',
        },
        {
          id: 3,
          station: '污水处理站',
          event: '总氮超标',
          time: '2022-01-11 11:00',
          status: '未处理',
          level: '一般',
        },
      ],
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    statusColor(status) {
      if (status === '在处理') return 'blue'
      if (status === '待处理') return 'orange'
      if (status === '未处理') return 'red'
      return '#444'
    },
    levelColor(level) {
      if (level === '严重') return 'red'
      if (level === '重大') return 'orange'
      if (level === '一般') return 'green'
      return '#444'
    },
    initCharts() {
      // div1-左环状图
      const chartProcess = echarts.init(this.$refs.chartProcess)
      chartProcess.setOption({
        title: {
          text: '处理工艺',
          left: 'center',
          top: 'center',
          show: false,
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '50%'],
            label: { show: true },
            data: [
              {
                value: 4,
                name: '氧化沟',
              },
              {
                value: 2,
                name: '模块化持瓷',
              },
              {
                value: 4,
                name: 'PASG',
              },
              {
                value: 2,
                name: 'A2/0',
              },
            ],
          },
        ],
      })

      // div1-右环状图
      const chartLevel = echarts.init(this.$refs.chartLevel)
      chartLevel.setOption({
        title: {
          text: '等级',
          left: 'center',
          top: 'center',
          show: false,
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '50%'],
            label: { show: true },
            data: [
              {
                value: 12,
                name: '二级',
              },
              {
                value: 10,
                name: '三级',
              },
              {
                value: 33,
                name: '一级A标',
              },
              {
                value: 45,
                name: '一级B标',
              },
            ],
          },
        ],
      })

      // div2-折线图
      const chartLine = echarts.init(this.$refs.chartLine)
      const xData = Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}:00`)
      const y1 = xData.map(() => Math.floor(Math.random() * 100))
      const y2 = xData.map(() => Math.floor(Math.random() * 100))
      chartLine.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['实测', '预测'],
          orient: 'horizontal',
          top: 0,
          left: 'right',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
          },
        },
        grid: {
          top: 30, // 距离容器上边距
          right: 10, // 右边距
          bottom: 10, // 下边距
          left: 10, // 左边距
          containLabel: true, // 确保坐标轴文字不会被截掉
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
        },
        series: [
          {
            name: '实测',
            type: 'line',
            smooth: true,
            data: y1,
            lineStyle: {
              color: '#3DA2BA',
              width: 2,
            },
          },
          {
            name: '预测',
            type: 'line',
            smooth: true,
            data: y2,
            lineStyle: {
              color: '#775C1F',
              width: 2,
            },
          },
        ],
      })

      // div3-柱状图
      const chartBar = echarts.init(this.$refs.chartBar)
      const yIn = xData.map(() => Math.floor(Math.random() * 100))
      const yOut = xData.map(() => Math.floor(Math.random() * 100))
      chartBar.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['进水', '出水'],
          orient: 'horizontal',
          top: 0,
          left: 'center',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
          },
        },
        grid: {
          top: 30, // 距离容器上边距
          right: 10, // 右边距
          bottom: 10, // 下边距
          left: 10, // 左边距
          containLabel: true, // 确保坐标轴文字不会被截掉
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
        },
        series: [
          {
            name: '进水',
            type: 'bar',
            data: yIn,
            itemStyle: {
              color: '#2A5A5C',
            },
          },
          {
            name: '出水',
            type: 'bar',
            data: yOut,
            itemStyle: {
              color: '#D8A63D',
            },
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

.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 各大区块 */
.div1,
.div2,
.div3,
.div4 {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 标题区 */
.header {
  height: 15%;
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
}

/* div1 内容 */
.div12 {
  flex: 1;
  display: flex;
}

.div121,
.div122 {
  flex: 1;
  height: 100%;
}

/* div2 内容 */
.div22,
.div32,
.div42 {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.filters {
  margin-bottom: 8px;
  position: absolute;
}

.chart {
  flex: 1;
}

/* 表格样式 */
.div42 {
  padding: 8px 12px;
}

.divider {
  height: 2px;
  background: linear-gradient(to right, #4caf50, #2196f3);
  margin: 4px 8px;
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

::v-deep .ant-select-selection--single,
::v-deep .ant-select-selection--single:hover,
::v-deep .ant-select-selection--single:focus {
  background-color: black !important;
  color: white;
}

.custom-table {
  border-radius: 4px;
  overflow: hidden;
  font-size: 13px;
  color: white;
}

.table-header {
  display: flex;
  background: black;
  font-weight: bold;
}

.table-row {
  display: flex;
  border-top: 1px solid #eee;
}

.cell {
  flex: 1;
  padding: 6px 10px;
  text-align: center;
  white-space: nowrap;
}
.cell {
  padding: 6px 10px;
  text-align: center;
  white-space: nowrap;        /* 不换行 */
  overflow: hidden;           /* 超出隐藏 */
  text-overflow: ellipsis;    /* 显示省略号 */
}

/* 给 time 和 station 这些可能超长的列定宽 */
.cell.time {
  width: 140px;    /* 固定宽度 */
}

.cell.station {
  flex: 2;
  min-width: 60px;
  max-width: 60px; /* 限制最大宽度 */
}
</style>
