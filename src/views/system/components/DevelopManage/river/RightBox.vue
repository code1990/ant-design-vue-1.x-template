<template>
  <div class="rightBox">
    <div class="infoBox">
      <div class="title">
        <div class="tip1">
          <div class="tip2"></div>
        </div>
        <div class="tip3">
          {{ title1 }}
        </div>
      </div>
      <div class="content">
        <div style="margin-top: 10px;">
          <div style="float: left;width: 33%;height: 80px;">
            <div style="border-bottom: #089C98">
              <div style="color: #BAAE49;float: left;width: 50%;text-align: center;font-size: 20px;">20</div>
              <div style="color: #1FE0D4;float: left;width: 50%;text-align: center;font-size: 20px;">16</div>
              <div style="color: white;font-size: 10px;float: left;width: 50%;text-align: center;margin-top: 15px;">
                我的待办
              </div>
              <div style="color: white;font-size: 10px;float: left;width: 50%;text-align: center;margin-top: 15px;">
                已处理
              </div>
            </div>
          </div>
          <div style="float: left;width: 25%;height: 80px;">
            <div class="notched-b">
              <div style="font-size: 18px;">20</div>
              <div style="font-size: 10px;">舆情指数</div>
            </div>
          </div>
          <div style="float: left;width: 33%;height: 80px;">
            <span style="color:#AE2F35">消极态度：32%</span></br>
            <span style="color:#23B99D">中立态度：32%</span></br>
            <span style="color:#0D59C1">积极态度：32%</span>
          </div>
        </div>
        <div ref="chart" style="width: 100%; height: 200px;float: left;"></div>
      </div>
    </div>
    <div class="infoBox">
      <div class="title">
        <div class="tip1">
          <div class="tip2"></div>
        </div>
        <div class="tip3">
          {{ title2 }}
        </div>
      </div>
      <div class="content">
        <div>
          <div id="app"
               style="display: flex; justify-content: space-around; align-items: center; height: 80px; background: #0b0f1a;"
          >
            <div ref="chart1" style="width: 80px; height: 80px;"></div>
            <div ref="chart2" style="width: 80px; height: 80px;"></div>
            <div ref="chart3" style="width: 80px; height: 80px;"></div>
            <div ref="chart4" style="width: 80px; height: 80px;"></div>
          </div>
        </div>
        <div>
          <div style="color: #fff;float: left;width: 25%;text-align: center;">污染源<span style="color: #CC612D"
          >↑5</span></div>
          <div style="color: #fff;float: left;width: 25%;text-align: center;">排河口<span style="color: #CC612D"
          >↑5</span></div>
          <div style="color: #fff;float: left;width: 25%;text-align: center;">群众举报<span style="color: #CC612D"
          >↑5</span></div>
          <div style="color: #fff;float: left;width: 25%;text-align: center;">违法违章<span style="color: #CC612D"
          >↑5</span></div>
        </div>
        <div style="margin-left: 5px;">
          <span style="color: white;">南岗河：</span>
          <a-progress :percent="30" stroke-color="#39D7C9" />
          <span style="color: white;">乌涌河：</span>
          <a-progress :percent="50" stroke-color="#CCA42C" />
          <span style="color: white;">细陂河：</span>
          <a-progress :percent="70" stroke-color="#AE562C" />
        </div>
      </div>
    </div>
    <div class="infoBox">
      <div class="title">
        <div class="tip1">
          <div class="tip2"></div>
        </div>
        <div class="tip3">
          {{ title3 }}
        </div>
      </div>
      <div class="content">
        <a-table
          :columns="columns"
          :data-source="rows"
          :pagination="false"
          rowKey="name"
          size="small"
          :scroll="{ x: 'max-content' }"
        />
        <div class="hex-row">
          <div class="hex">
            <div class="top">7处</div>
            <div class="bottom">溶氧量超标</div>
          </div>
          <div class="hex">
            <div class="top">7处</div>
            <div class="bottom">溶氧量超标</div>
          </div>
          <div class="hex">
            <div class="top">7处</div>
            <div class="bottom">溶氧量超标</div>
          </div>
          <div class="hex">
            <div class="top">7处</div>
            <div class="bottom">溶氧量超标</div>
          </div>
          <div class="hex">
            <div class="top">7处</div>
            <div class="bottom">溶氧量超标</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'RightBox',
  data () {
    return {
      title1: '舆情、投诉统计',
      title2: '违法违章统计',
      title3: '水质监测统计',
      chartInstance: null,
      columns: [
        {
          title: '监测站点',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          fixed: 'left',
          width: 100,
        },
        {
          title: '溶解氧',
          dataIndex: 'dissolvedOxygen',
          key: 'dissolvedOxygen',
          align: 'center',
          width: 90,
        },
        {
          title: '氨氮',
          dataIndex: 'ammonia',
          key: 'ammonia',
          align: 'center',
          width: 90,
        },
        {
          title: '水温',
          dataIndex: 'waterTemp',
          key: 'waterTemp',
          align: 'center',
          width: 90,
        },
        {
          title: 'PH',
          dataIndex: 'ph',
          key: 'ph',
          align: 'center',
          width: 90,
        },
        {
          title: '浊度',
          dataIndex: 'turbidity',
          key: 'turbidity',
          align: 'center',
          width: 90,
        },
        {
          title: '气温',
          dataIndex: 'airTemp',
          key: 'airTemp',
          align: 'center',
          width: 90,
        },
        {
          title: '电导率',
          dataIndex: 'conductivity',
          key: 'conductivity',
          align: 'center',
          width: 90,
        },
        {
          title: '水质等级',
          dataIndex: 'level',
          key: 'level',
          align: 'center',
          fixed: 'right',
          width: 80,
        },
      ],
      rows: [
        {
          name: '河流1',
          dissolvedOxygen: 8.2,
          ammonia: 0.3,
          waterTemp: 20.1,
          ph: 7.2,
          turbidity: 5.1,
          airTemp: 25.3,
          conductivity: 450,
          level: 'I',
        },
        {
          name: '河流2',
          dissolvedOxygen: 6.5,
          ammonia: 1.2,
          waterTemp: 22.5,
          ph: 6.9,
          turbidity: 12.4,
          airTemp: 27.8,
          conductivity: 510,
          level: 'II',
        },
        {
          name: '河流3',
          dissolvedOxygen: 9.1,
          ammonia: 0.1,
          waterTemp: 19.6,
          ph: 7.5,
          turbidity: 3.2,
          airTemp: 24.7,
          conductivity: 420,
          level: 'I',
        },
        {
          name: '河流4',
          dissolvedOxygen: 5.8,
          ammonia: 2.5,
          waterTemp: 21.2,
          ph: 6.7,
          turbidity: 18.6,
          airTemp: 28.9,
          conductivity: 600,
          level: 'III',
        },
      ],
      amap:null,
    }
  },
  mounted () {
    this.initChart()
    this.initCircle()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy () {
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initCircle () {
      const createRing = (el, percent, topText, bottomText) => {
        const chart = echarts.init(el)
        chart.setOption({
          tooltip: { show: false },
          series: [{
            type: 'pie',
            radius: ['68%', '84%'],
            startAngle: 90,
            silent: true,
            labelLine: { show: false },
            data: [
              {
                value: percent,
                itemStyle: { color: '#1FDFE2' },
                label: {
                  show: true,
                  position: 'center',
                  formatter: () => `${topText}\n${bottomText}`,
                  color: '#fff',
                  lineHeight: 14,
                  fontSize: 12,
                  fontWeight: 500,
                },
              },
              {
                value: 100 - percent,
                itemStyle: { color: 'rgba(31,223,226,0.18)' },
              },
            ],
          }],
        })
        return chart
      }

      this.charts = [
        createRing(this.$refs.chart1, 80, '80%', '20件'),
        createRing(this.$refs.chart2, 45, '45%', '9件'),
        createRing(this.$refs.chart3, 62, '62%', '13件'),
        createRing(this.$refs.chart4, 90, '90%', '18件'),
      ]

      window.addEventListener('resize', () => {
        this.charts.forEach(c => c.resize())
      })
    },
    initChart () {
      this.chartInstance = echarts.init(this.$refs.chart)
      const option = {
        tooltip: { trigger: 'axis' },
        // legend: { data: ['系列A','系列B','系列C'] },
        grid: {
          left: 40,
          right: 20,
          top: 20,
          bottom: 20,
        },
        color: ['#ED0808', '#AE8A13', '#0873BE'], // 三条折线的颜色
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '04', '05', '06', '07(月)'],
          boundaryGap: false,
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '系列A',
            type: 'line',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '系列B',
            type: 'line',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '系列C',
            type: 'line',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      }
      this.chartInstance.setOption(option)
    },
    resizeChart () {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },
  },
}
</script>

<style scoped lang="less">
.rightBox {
  width: 20%;
  height: calc(100vh - 80px);
  background-color: #192f3e;
  float: left;
}

.infoBox {
  width: 100%;
  height: 33%;
  //background-color: white;
}

.tip1 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #97e8e5;
  float: left;
  margin: 5px 5px;
}

.tip2 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 2px;
  margin-left: 2px;
  background-color: #36cfc7;
}

.title {
  width: 100%;
  color: white;
  padding: 5px 5px;
  border-bottom: 1px solid #0b5e75;
}

.notched-b {
  width: 60px;
  height: 60px;
  position: relative;
  background: #1E4458; /* 边框颜色 */
  /* 外轮廓：角切 22px */
  clip-path: polygon(11px 0, calc(100% - 11px) 0,
  100% 11px, 100% calc(100% - 11px),
  calc(100% - 11px) 100%, 11px 100%,
  0 calc(100% - 11px), 0 11px);
  color: #fff; /* 设置文字颜色 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notched-b::before {
  content: "";
  position: absolute;
  inset: 1px; /* 边框厚度 2px */
  background: #195566; /* 内部填充色 */
  /* 内轮廓：角切 20px（= 22 - 边框厚度） */
  clip-path: polygon(10px 0, calc(100% - 10px) 0,
  100% 10px, 100% calc(100% - 10px),
  calc(100% - 10px) 100%, 10px 100%,
  0 calc(100% - 10px), 0 10px);
  z-index: 0; /* 关键：让背景在底层 */
}

.notched-b > * {
  position: relative;
  z-index: 1; /* 关键：让文字在前面 */
}

::v-deep .ant-table-thead > tr > th {
  white-space: nowrap;
}

.hex-row {
  height: 80px;
  display: flex;
  justify-content: center; /* 居中整排 */
  align-items: center;
  gap: 14px; /* 六边形之间的间距 */
  padding: 12px;
}

.hex {
  width: calc(80px * 2 / 1.73205); /* 宽度可微调形状比例 */
  height: 30px; /* 固定高度 80px */
  background: #1FDFE2; /* 六边形颜色 */
  color: #fff; /* 文字颜色 */
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .25);
}

.hex .top {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.hex .bottom {
  font-size: 8px;
  opacity: .95;
  letter-spacing: .5px;
}

/* 表格整体背景 */
::v-deep .ant-table {
  background-color: #000;
}

/* 表头背景 & 字体颜色 */
::v-deep .ant-table-thead > tr > th {
  background-color: #1a1a1a;
  color: #fff;
}

/* 表格内容背景 & 字体颜色 */
::v-deep .ant-table-tbody > tr > td {
  background-color: #000;
  color: #fff;
}

/* 鼠标悬停行背景 */
::v-deep .ant-table-tbody > tr:hover > td {
  background-color: #333;
}
</style>
