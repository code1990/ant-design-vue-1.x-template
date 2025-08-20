<template>
  <div class="midBox2">
    <div class="dashboard1">
      <a-row>
        <!-- 左侧 70% -->
        <a-col :span="24" class="left-panel">
          <div class="panel-title">制水情况</div>

          <!-- div11 四个等分 -->
          <a-row :gutter="10" class="stats-row">
            <a-col :span="6" v-for="(item, idx) in stats" :key="idx">
              <div class="stat-card">
                <a-icon :type="item.icon" class="stat-icon" />
                <div class="stat-content">
                  <div class="stat-title">{{ item.title }}</div>
                  <div class="stat-value">{{ item.value }}</div>
                </div>
              </div>
            </a-col>
          </a-row>

          <!-- div12 折线图 + 统计 -->
          <a-row class="chart-row">
            <a-col :span="14">
              <div class="chart-card">
                <div class="chart-title">制水/电耗/药耗对比变化曲线图</div>
                <div ref="lineChart" class="chart"></div>
              </div>
            </a-col>
            <a-col :span="10">
              <div class="chart-card">
                <div class="chart-title">班组巡查情况</div>
                <div style="padding: 10px 0px"><div style="width: 50%;float: left;">已检：22处 </div><div  style="width: 50%;float: left;text-align: right;">共25处</div></div>
                <a-progress :percent="80" />
                <div style="padding: 10px 0px"><div style="width: 50%;float: left;color:red;">异常：7处 </div><div  style="width: 50%;float: left;text-align: right;">未巡：3处</div></div>
                <div>
                  <div style="width: 50%;float: left;">
                    <div style="padding: 10px;">防雷系统设备</div>
                    <div style="padding: 10px;">KMnO4系统</div>
                  </div>
                  <div style="width: 50%;float: left;">
                    <div style="padding: 10px;">碳滤池空压机</div>
                    <div style="padding: 10px;">沉淀池空压设备</div>
                  </div>
                </div>
<!--                <ul class="issue-list">-->
<!--                  <li></li>-->
<!--                  <li></li>-->
<!--                  <li></li>-->
<!--                  <li></li>-->
<!--                </ul>-->
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div class="dashboard2">
      <!-- 右侧 30% -->
      <a-row>
        <a-col :span="24" class="right-panel">
          <div class="panel-title">预警</div>

          <!-- div21 滚动表格 -->
          <div class="warn-list">
            <vue-seamless-scroll :data="warnings" class="scroll-box" :class-option="option">
              <ul>
                <li v-for="(item, idx) in warnings" :key="idx">{{ item }}</li>
              </ul>
            </vue-seamless-scroll>
          </div>

          <!-- div22 警报统计 -->
          <div class="warn-summary">
            <div class="warn-item">
              <a-icon type="warning" theme="twoTone" twoToneColor="#f5222d" style="font-size: 30px;margin-left: 20px;"/>
              <div style="float: left;width: 30%;line-height: 30px;">
                危险警报</div>
              <div style="float: left;width: 30%;line-height: 30px;"> 2</div>
              <div style="float: left;width: 30%;line-height: 30px;">(29%)</div>
            </div>
            <div class="warn-item">
              <a-icon type="info-circle" theme="twoTone" twoToneColor="#faad14" style="font-size: 30px;margin-left: 20px;"/>
              <div style="float: left;width: 30%;line-height: 30px;">
                一般警报</div>
              <div style="float: left;width: 30%;line-height: 30px;"> 5</div>
              <div style="float: left;width: 30%;line-height: 30px;">(71%)</div>
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
  name: 'WaterPanel',
  data() {
    return {
      // 即便隐藏表头，columns 还是需要声明 field，否则 data 无法渲染
      columns: [
        { field: 'content' }, // 只显示一列内容
      ],
      warnings: [
        { content: '2019年4月13日 19:21:52 福古水厂3#暗漏检修' },
        { content: '2019年4月13日 19:25:31 福古水厂2#阀门异常' },
        { content: '2019年4月13日 19:30:12 东区水厂 泵房异常停机' },
        { content: '2019年4月13日 19:36:43 南区管网 压力过低报警' },
        { content: '2019年4月13日 19:40:27 北区管网 水质浊度异常' },
      ],
      option: {
        step: 1, // 滚动步长（数值越大速度越快）
        limitMoveNum: 5, // 启动无缝滚动的最少数据条数
        hoverStop: true, // 鼠标悬停是否停止
        direction: 1, // 0 向下，1 向上
        openWatch: true, // 开启 data 监控，数据变化自动刷新
        singleHeight: 20, // 每行高度
        waitTime: 1000, // 单步停止等待时间 (ms)
      },
      stats: [
        {
          title: '今日供水量',
          value: '538.2kt',
          icon: 'deployment-unit',
        },
        {
          title: '今日用电量',
          value: '262.1kWh',
          icon: 'thunderbolt',
        },
        {
          title: '今日用药量',
          value: '516.0kg',
          icon: 'experiment',
        },
        {
          title: '水质合格率',
          value: '95%',
          icon: 'check-circle',
        },
      ],
    }
  },
  mounted() {
    this.initLineChart()
    this.mockWarnings()
  },
  methods: {
    // 折线图
    initLineChart() {
      const chart = echarts.init(this.$refs.lineChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: {
          top: 20, // 距离容器上边距
          right: 20, // 距离容器右边距
          bottom: 30, // 距离容器下边距
          left: 20, // 距离容器左边距
          containLabel: true, // ✅ 保证坐标轴标签不会被裁剪
        },
        legend: {
          data: ['制水量', '电耗', '药耗'],
          bottom: 0, // ✅ 图例放在下方
          orient: 'horizontal', // 水平排列（默认就是 horizontal）
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 15 }, (_, i) => i + 1),
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '制水量',
            type: 'line',
            data: [500, 520, 530, 510, 540, 550, 565, 570, 580, 590, 600, 610, 620, 615, 625],
          },
          {
            name: '电耗',
            type: 'line',
            data: [200, 210, 220, 215, 230, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285],
          },
          {
            name: '药耗',
            type: 'line',
            data: [50, 52, 54, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
          },
        ],
      })
    },
    // 模拟预警数据
    mockWarnings() {
      const list = []
      for (let i = 0; i < 10; i++) {
        list.push(`2019年4月13日19:21:${50 + i} 福古水厂${i + 1}#暗漏检修`)
      }
      this.warnings = list
    },
  },
}
</script>

<style scoped>
.midBox2 {
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
  margin-bottom: 20px;
}

/* div11 卡片 */
.stat-card {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  background: #fff;
}

.stat-icon {
  font-size: 36px;
  margin-right: 10px;
  color: #0099ff;
}

.stat-title {
  font-size: 14px;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
}

/* 图表容器 */
.chart-card {
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  margin-bottom: 10px;
  height: 100%;
}

.chart-title {
  font-size: 14px;
  margin-bottom: 5px;
}

.chart {
  width: 100%;
  height: 260px;
}

/* 巡检异常列表 */
.issue-list {
  padding-left: 20px;
  margin: 5px 0;
}

.issue-list li {
  font-size: 13px;
  margin: 2px 0;
}

/* 预警列表 */
.warn-list {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
  height: 300px; /* 限制高度 */
  overflow: hidden;
}

.scroll-box ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.scroll-box li {
  height: 35px;
  line-height: 35px;
  font-size: 13px;
  border-bottom: 1px dashed #ddd;
  padding: 0 8px;
}

/* 警报统计 */
.warn-summary {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.warn-item {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.warn-item span {
  margin-left: 6px;
}
</style>
