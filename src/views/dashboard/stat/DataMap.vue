<template>
  <div class="container">
    <div class="header-box">
      <div class="header-logo">
        <img :src="logo" alt="Logo" />
      </div>
      <div class="header-title">华南理工大学生态流蓝绿空间监测系统</div>
    </div>
    <div class="map-container">
      <!-- 左侧折线图 -->
      <div class="side-panel">
        <div class="panel-block">
          <div class="panel-value">空气质量指数</div>
          <div ref="left1Chart" class="panel-chart"></div>
          <div style="float: left; width: 100%; margin-top: 10px">
            <div class="bottom-value">晴转多云 28°</div>
            <div class="bottom-value">东南风2级 湿度 63%</div>
          </div>
        </div>
        <div class="panel-block">
          <div class="panel-value" style="margin-top: -80px;">水体环境</div>
          <div ref="left2Chart" class="panel-chart">
            <div class="water-monitoring">
              <!-- 水源地 -->
              <section class="card">
                <h4>水源地监测</h4>
                <table border="1" cellpadding="8" cellspacing="0">
                  <thead>
                    <tr>
                      <th>水源地名称</th>
                      <th>监测日期</th>
                      <th>达标情况</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sourceData" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ formatDate(item.date) }}</td>
                      <td>
                        <span :class="getStatusClass(item.status)">
                          {{ item.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <!-- 河湖断面 -->
              <section class="card">
                <h4>河湖断面监测</h4>
                <table border="1" cellpadding="8" cellspacing="0" style="height: 40px;overflow-y: auto;">
                  <thead>
                    <tr>
                      <th>断面名称</th>
                      <th>监测日期</th>
                      <th>水质级别</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sectionData" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ formatDate(item.date) }}</td>
                      <td>
                        <span :class="getWaterClass(item.level)">
                          {{ item.level }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="panel-value">污染源监管</div>
          <div ref="chartDom3" style="width: 100%; height: 220px;"></div>
        </div>
      </div>

      <!-- 中间地图 -->
      <div id="map"></div>

      <!-- 右侧数值 -->
      <div class="side-panel">
        <div class="panel-block">
          <div class="water-quality-container">
            <div class="panel-value">水质监测实时数据</div>
            <div class="table-wrapper">
              <!-- 表头 -->
              <div class="table-header">
                <span>序号</span>
                <span>监测点</span>
                <span>水质级别</span>
                <span>更新时间</span>
              </div>

              <!-- 无缝滚动区域 -->
              <vue-seamless-scroll
                :data="monitoringData"
                class="scroll-wrapper"
                :class-option="scrollOption"
              >
                <div v-for="(item, index) in monitoringData" :key="index" class="table-row">
                  <span>{{ index + 1 }}</span>
                  <span>{{ item.station }}</span>
                  <span>{{ item.level }}</span>
                  <span>{{ item.updateTime }}</span>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="panel-value">
            鸟类生态多样性
          </div>
          <div ref="chartDom" style="width: 100%; height: 210px;"></div>
        </div>
        <div class="panel-block">
          <div class="panel-value">环境事件监管</div>
          <div ref="chartDom4" style="width: 100%; height: 220px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'App',
  data() {
    return {
      leftCharts: [],
      right1: 'PM2.5热力: 0',
      right2: '鸟类多样性指数: 0',
      right3: '雨水径流削减率: 0%',
      logo: require('@/assets/logo.png'),
      chart1: null,
      value1: 100,
      chart2: null,
      chart3: null,
      chart4: null,
      quarters: ['第一季度', '第二季度', '第三季度', '第四季度'],
      values: [102, 76, 90, 60],
      // 模拟数据：鸟类名称 & 各年份数量
      birdNames: ['麻雀', '喜鹊', '白鹭', '红隼', '画眉', '翠鸟'],
      data2023: [120, 85, 40, 12, 30, 25],
      data2024: [130, 90, 55, 18, 35, 32],
      monitoringData: [
        {
          station: '上西湖',
          level: 'II',
          updateTime: '2025-11-05 14:30:22',
        },
        {
          station: '下西湖',
          level: 'III',
          updateTime: '2025-11-05 14:28:15',
        },
        {
          station: '下西湖小岛',
          level: 'I',
          updateTime: '2025-11-05 14:32:07',
        },
        // 可继续添加更多模拟数据以实现更好滚动效果
        {
          station: '苏堤南',
          level: 'IV',
          updateTime: '2025-11-05 14:25:44',
        },
        {
          station: '白堤',
          level: 'II',
          updateTime: '2025-11-05 14:29:33',
        },
      ],
      sourceData: [
        {
          name: '华工水源地1',
          date: '2025-11-06',
          status: '达标',
        },
      ],
      sectionData: [
        {
          name: '上西湖断面',
          date: '2025-11-06',
          level: 'Ⅰ类',
        }
      ],
      map: null,
    }
  },
  computed: {
    scrollOption() {
      return {
        step: 0.5, // 滚动速度（像素/帧）
        limitMoveNum: 2, // 启动无缝滚动的最小数据量
        hoverStop: true, // 鼠标悬停停止
        direction: 0, // 0 = 向上滚动，1 = 向下，2 = 向左，3 = 向右
        openWatch: true, // 监听 data 变化
        singleHeight: 40, // 单行高度（px），需与 CSS 一致
        waitTime: 1000, // 停顿时间（ms），仅在 direction=1 时有效
      }
    },
  },
  mounted() {
    this.initMap()
    this.startUpdating()
    this.initChart1()
    this.initChart2()
    this.initChart3()
    this.initChart4()
    this.startDynamic()
  },
  methods: {
    initChart4() {
      // 对数据进行排序，并保持与季度的对应关系
      const sortedData = this.values.map((value, index) => ({ quarter: this.quarters[index], value }))
        .sort((a, b) => a.value - b.value);

      const quartersSorted = sortedData.map(item => item.quarter);
      const valuesSorted = sortedData.map(item => item.value);

      this.chart4 = echarts.init(this.$refs.chartDom4)

      const option = {
        title: {
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16
          }
        },
        angleAxis: {
          type: 'category',
          data: quartersSorted,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ddd',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#333',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        radiusAxis: {},
        polar: {},
        series: [
          {
            type: 'bar',
            coordinateSystem: 'polar',
            data: valuesSorted,
            roundCap: true,
            barWidth: 30,
            itemStyle: {
              color: function(params) {
                const colors = ['#118AB2', '#FFD166', '#4ECDC4', '#FF6B6B']
                return colors[params.dataIndex] // 根据索引选择颜色，也可以自定义逻辑
              }
            },
            label: {
              show: true,
              position: 'middle',
              distance: 10,
              formatter: '{c}起',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'none' }
        }
      }

      this.chart4.setOption(option)
    },
    initChart3() {
      const chartDom3 = this.$refs.chartDom3
      this.chart3 = echarts.init(chartDom3)

      const option = {
        title: {
          text: '重点排污单位',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        series: [
          {
            name: '污染源类型',
            type: 'pie',
            radius: ['50%', '70%'], // 设置为环形图
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true
            },
            data: [
              {value: 9, name: '废水'},
              {value: 26, name: '废气'},
              {value: 7, name: '其他'},
              {value: 4, name: '土壤'}
            ]
          }
        ]
      }

      this.chart3.setOption(option)
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chartDom)

      const option = {
        title: {
          left: 'center',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2023年', '2024年'],
          top: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.birdNames,
          axisLabel: {
            rotate: 30 // 鸟名较长时旋转
          }
        },
        yAxis: {
          type: 'value',
          name: '数量（只）',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '2023年',
            type: 'bar',
            data: this.data2023,
            itemStyle: {
              color: '#5470C6'
            }
          },
          {
            name: '2024年',
            type: 'bar',
            data: this.data2024,
            itemStyle: {
              color: '#91CC75'
            }
          }
        ]
      }

      this.chart2.setOption(option)
    },
    initChart1() {
      this.chart1 = echarts.init(this.$refs.left1Chart)
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          {
            name: '空气质量指数',
            type: 'gauge',
            min: 0,
            max: 300,
            splitNumber: 6,
            radius: '120%', // 设置为容器宽度或高度的80%，以适应容器尺寸
            center: ['50%', '60%'], // 调整中心位置，使仪表盘更靠近顶部
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.33, '#ff4500'],
                  [0.66, '#ffdd00'],
                  [1, '#00b050'],
                ],
              },
            },
            axisTick: { length: 8 },
            splitLine: { length: 12 },
            pointer: { width: 4 },
            detail: {
              formatter: '{value}',
              fontSize: 12,
              offsetCenter: [0, 50], // x, y，向下偏移40像素
            },
            axisLabel: {
              show: true,
              // 显示特定的刻度标签
              formatter: function (value) {
                if ([0, 50, 100, 150, 200, 250, 300].includes(value)) {
                  return value
                }
                return '' // 隐藏其他刻度
              },
              color: '#333',
              fontSize: 12,
            },
            data: [
              {
                value: this.value1,
                name: '',
              },
            ],
          },
        ],
      }
      this.chart1.setOption(option)
    },
    startDynamic() {
      setInterval(() => {
        // 生成 1~2 之间随机值，保留一位小数
        this.value1 = (Math.random() + 100).toFixed(1)
        this.chart1.setOption({
          series: [{ data: [{ value: this.value1 }] }],
        })
      }, 5000)
    },
    initMap() {
      const T = window.T
      this.map = null
      var imageURL =
        'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f5f58a60eb5ca15e131b1df75c5f5567'
      var lay = new T.TileLayer(imageURL, {
        minZoom: 1,
        maxZoom: 18,
      })
      var config = {
        layers: [lay],
        name: 'TMAP_SATELLITE_MAP',
      }
      this.map = new T.Map('map', config) // 地图实例
      this.map.centerAndZoom(new T.LngLat(113.2759952545166, 23.117055306224895), 12)
      this.map.enableScrollWheelZoom()
      this.map.enableDrag()
      // this.map.addControl(new T.Control.Scale())
      var ctrl = new T.Control.MapType()
      this.map.addControl(ctrl)
      var control = new T.Control.Zoom()
      control.setPosition(window.T_ANCHOR_TOP_RIGHT)
      this.map.addControl(control)
      this.map.setMapType(window.TMAP_HYBRID_MAP)
      // this.map.addEventListener('click', this.mapClick)
      // this.loadData()
      // this.fetchTotal()
    },
    formatDate(dateStr) {
      // 已是 YYYY-MM-DD 格式，直接返回；也可扩展格式化逻辑
      return dateStr
    },
    getStatusClass(status) {
      return status === '达标' ? 'status-pass' : 'status-fail'
    },
    getWaterClass(level) {
      if (level.includes('Ⅰ') || level.includes('Ⅱ')) return 'water-good'
      if (level.includes('Ⅲ')) return 'water-moderate'
      if (level.includes('Ⅳ') || level.includes('Ⅴ')) return 'water-poor'
      if (level.includes('劣')) return 'water-bad'
      return ''
    },
    startUpdating() {
      setInterval(() => {
        // 更新右侧数值
        this.right1 = `PM2.5热力: ${Math.floor(Math.random() * 100)}`
        this.right2 = `鸟类多样性指数: ${Math.floor(Math.random() * 50 + 10)}`
        this.right3 = `雨水径流削减率: ${(Math.random() * 50).toFixed(1)}%`

        // 更新左侧折线图
        this.leftCharts.forEach(chart => {
          chart.setOption({
            series: [
              {
                data: Array(8)
                  .fill(0)
                  .map(() => Math.floor(Math.random() * 100)),
              },
            ],
          })
        })
      }, 2000)
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 92vh;
}

.map-container {
  display: flex;
  width: 100%;
  height: calc(92vh - 60px);
}

.side-panel {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #00796b;
}

.panel-block {
  flex: 1;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.panel-block:last-child {
  margin-bottom: 0;
}

.panel-value {
  font-size: 18px;
  margin-bottom: 5px;
  color: white;
  text-align: center;
}

.panel-chart {
  width: 100%;
  height: 60%;
}

#map {
  flex: 1;
  background: #e0f7fa;
}

.header-box {
  width: 100%;
  height: 60px; /* header 高度 */
  line-height: 60px; /* 文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  font-size: 24px; /* 文字大小 */
  font-weight: bold;
  color: #ffffff; /* 白色文字 */
  background: linear-gradient(90deg, #00796b, #26a69a); /* 渐变背景 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* 阴影 */
}

.header-logo {
  float: left;
  width: 120px;
}

/* Logo 样式 */
.header-logo img {
  height: 40px; /* 控制 logo 高度 */
  width: auto;
}

/* 标题居中 */
.header-title {
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

.bottom-value {
  width: 50%;
  border: 1px solid #02a7f0;
  float: left;
}

.water-quality-container h3 {
  text-align: center;
  margin-bottom: 16px;
  color: white;
}

.table-wrapper {
  min-width: 500px; /* 根据你的列宽总和调整 */
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.table-header,
.table-row {
  display: flex;
  height: 40px;
  line-height: 40px;
  background: #339489;
}

.table-header {
  font-weight: bold;
  background: #339489;
  color: #333;
}

.table-row:nth-child(even) {
  background: #339489;
}

.table-row:nth-child(odd) {
  background: #339489;
}

.table-header span,
.table-row span {
  flex: 1;
  text-align: center;
  border-right: 1px solid #02a7f0;
  font-size: 14px;
}

.table-header span:last-child,
.table-row span:last-child {
  border-right: none;
}

.scroll-wrapper {
  height: 160px; /* 显示 4 行 */
  overflow: hidden;
  background-color: #00796b;
}
</style>
