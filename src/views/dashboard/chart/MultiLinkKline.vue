<template>
  <div class="multi-link-kline" ref="chart" style="width: 100%; height: 900px;"></div>
</template>

<script>
// 如果你是通过 CDN 引入的 echarts（index.html 里有 <script src="...echarts.min.js">）
// 可以把下面这行改成： const echarts = window.echarts;
import * as echarts from 'echarts';

export default {
  name: 'MultiLinkKline',

  props: {
    // 时间轴
    categoryData: {
      type: Array,
      default: () => []
    },
    // K 线数据: [[open, close, low, high], ...]
    kData: {
      type: Array,
      default: () => []
    },
    // 特大单、大单、中单、小单 成交量（正负表示买卖方向）
    volExtra: {
      type: Array,
      default: () => []
    },
    volBig: {
      type: Array,
      default: () => []
    },
    volMid: {
      type: Array,
      default: () => []
    },
    volSmall: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      chart: null
    };
  },

  computed: {
    // 趋势折线（这里简单用 K 线四价的均值，你可以换成自己的指标）
    trendData () {
      if (!this.kData || !this.kData.length) return [];
      return this.kData.map(v => {
        if (!v || v.length < 4) return null;
        return (v[0] + v[1] + v[2] + v[3]) / 4;
      });
    },

    // 如果用户没传数据，就用内置 demo 数据
    finalCategory () {
      if (this.categoryData && this.categoryData.length) return this.categoryData;
      return [
        '09:30','09:31','09:32','09:33','09:34','09:35','09:36','09:37','09:38','09:39',
        '09:40','09:41','09:42','09:43','09:44','09:45','09:46','09:47','09:48','09:49'
      ];
    },
    finalKData () {
      if (this.kData && this.kData.length) return this.kData;
      return [
        [10.2,10.5,10.1,10.6],
        [10.5,10.4,10.3,10.6],
        [10.4,10.8,10.4,10.9],
        [10.8,10.6,10.5,10.9],
        [10.6,10.9,10.6,11.0],
        [10.9,10.7,10.6,11.1],
        [10.7,10.8,10.6,10.9],
        [10.8,10.9,10.7,11.0],
        [10.9,11.0,10.8,11.1],
        [11.0,11.2,10.9,11.3],
        [11.2,11.1,11.0,11.3],
        [11.1,11.0,11.0,11.2],
        [11.0,10.9,10.8,11.1],
        [10.9,10.8,10.8,11.0],
        [10.8,10.7,10.6,10.9],
        [10.7,10.6,10.5,10.8],
        [10.6,10.8,10.5,10.9],
        [10.8,10.9,10.7,11.0],
        [10.9,11.1,10.9,11.2],
        [11.1,11.0,11.0,11.2]
      ];
    },
    finalVolExtra () {
      if (this.volExtra && this.volExtra.length) return this.volExtra;
      return [  5000, -8000, 12000, -6000,  9000, -7000,  3000, -2000,  6000, -5000,
        10000, -4000,  8000, -9000,  5000, -3000, 12000, -6000,  7000, -4000 ];
    },
    finalVolBig () {
      if (this.volBig && this.volBig.length) return this.volBig;
      return [  3000, -4000,  5000, -3000,  6000, -5000,  2000, -1000,  4000, -3000,
        7000, -2000,  5000, -6000,  3000, -2000,  8000, -4000,  5000, -3000 ];
    },
    finalVolMid () {
      if (this.volMid && this.volMid.length) return this.volMid;
      return [  2000, -2000,  3000, -2000,  4000, -3000,  1500, -800,  2500, -2000,
        3500, -1500,  3000, -3500,  2000, -1200,  4000, -2000,  2500, -1500 ];
    },
    finalVolSmall () {
      if (this.volSmall && this.volSmall.length) return this.volSmall;
      return [   800, -700,  1000, -900,  1200, -1100,   600, -500,   900, -800,
        1300, -700,  1100, -1200,  800, -700,   1500, -900,  1000, -700 ];
    },
    finalTrend () {
      // 如果外面以后想传自定义趋势线，也可以再加个 prop 覆盖
      if (this.trendData && this.trendData.length) return this.trendData;
      return this.finalKData.map(v => (v[0] + v[1] + v[2] + v[3]) / 4);
    }
  },

  mounted () {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },

  watch: {
    // 数据变化时自动刷新图表
    categoryData: {
      handler () { this.updateChart(); },
      deep: true
    },
    kData: {
      handler () { this.updateChart(); },
      deep: true
    },
    volExtra: {
      handler () { this.updateChart(); },
      deep: true
    },
    volBig: {
      handler () { this.updateChart(); },
      deep: true
    },
    volMid: {
      handler () { this.updateChart(); },
      deep: true
    },
    volSmall: {
      handler () { this.updateChart(); },
      deep: true
    }
  },

  methods: {
    handleResize () {
      if (this.chart) {
        this.chart.resize();
      }
    },

    getVolumeColor (params) {
      const v = params.data;
      return v >= 0 ? '#ff0000' : '#00aa00';
    },

    initChart () {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart);
      }
      const option = this.buildOption();
      this.chart.setOption(option, true);
    },

    updateChart () {
      if (!this.chart) return;
      const option = this.buildOption();
      this.chart.setOption(option, true);
    },

    buildOption () {
      const categoryData = this.finalCategory;
      const kData = this.finalKData;
      const volExtra = this.finalVolExtra;
      const volBig = this.finalVolBig;
      const volMid = this.finalVolMid;
      const volSmall = this.finalVolSmall;
      const trendData = this.finalTrend;

      return {
        animation: false,
        axisPointer: {
          link: [{ xAxisIndex: 'all' }],
          label: {
            backgroundColor: '#777'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: [
          { left: '8%', right: '3%', top: '3%',  height: '20%' }, // 0: K 线
          { left: '8%', right: '3%', top: '24%', height: '13%' }, // 1: 特大单
          { left: '8%', right: '3%', top: '38%', height: '13%' }, // 2: 大单
          { left: '8%', right: '3%', top: '52%', height: '13%' }, // 3: 中单
          { left: '8%', right: '3%', top: '66%', height: '13%' }, // 4: 小单
          { left: '8%', right: '3%', top: '80%', height: '15%' }  // 5: 趋势
        ],
        xAxis: [
          {
            type: 'category',
            data: categoryData,
            boundaryGap: true,
            axisLine: { onZero: false },
            axisTick: { show: false },
            gridIndex: 0
          },
          { type: 'category', data: categoryData, gridIndex: 1, axisTick: { show: false } },
          { type: 'category', data: categoryData, gridIndex: 2, axisTick: { show: false } },
          { type: 'category', data: categoryData, gridIndex: 3, axisTick: { show: false } },
          { type: 'category', data: categoryData, gridIndex: 4, axisTick: { show: false } },
          { type: 'category', data: categoryData, gridIndex: 5, axisTick: { show: false } }
        ],
        yAxis: [
          { scale: true, gridIndex: 0, name: 'K线' },
          { gridIndex: 1, name: '特大单', splitLine: { show: true } },
          { gridIndex: 2, name: '大单',   splitLine: { show: true } },
          { gridIndex: 3, name: '中单',   splitLine: { show: true } },
          { gridIndex: 4, name: '小单',   splitLine: { show: true } },
          { gridIndex: 5, name: '趋势',   splitLine: { show: true } }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1, 2, 3, 4, 5],
            start: 0,
            end: 100
          },
          {
            type: 'slider',
            xAxisIndex: [0, 1, 2, 3, 4, 5],
            top: '95%',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: 'K线',
            type: 'candlestick',
            data: kData,
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            name: '特大单',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volExtra,
            barMaxWidth: 10,
            itemStyle: {
              color: this.getVolumeColor
            }
          },
          {
            name: '大单',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: volBig,
            barMaxWidth: 10,
            itemStyle: {
              color: this.getVolumeColor
            }
          },
          {
            name: '中单',
            type: 'bar',
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: volMid,
            barMaxWidth: 10,
            itemStyle: {
              color: this.getVolumeColor
            }
          },
          {
            name: '小单',
            type: 'bar',
            xAxisIndex: 4,
            yAxisIndex: 4,
            data: volSmall,
            barMaxWidth: 10,
            itemStyle: {
              color: this.getVolumeColor
            }
          },
          {
            name: '趋势',
            type: 'line',
            xAxisIndex: 5,
            yAxisIndex: 5,
            data: trendData,
            smooth: true,
            showSymbol: false
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.multi-link-kline {
  /* 你可以在这里按需调整高度 / 背景等样式 */
}
</style>
