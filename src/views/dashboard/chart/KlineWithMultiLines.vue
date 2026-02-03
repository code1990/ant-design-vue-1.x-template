<template>
  <div class="kline-multi-lines" ref="chart" style="width: 100%; height: 600px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'KlineWithMultiLines',

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
    /**
     * 10 条折线的数据
     * 结构示例：
     * [
     *   { name: '线1', data: [1,2,3,...] },
     *   { name: '线2', data: [2,3,4,...] },
     *   ...
     * ]
     * 长度不一定必须 10，但你可以按约定传 10 条
     */
    lineSeries: {
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
    // demo：如果外面没传数据，就使用内置示例
    finalCategory () {
      if (this.categoryData && this.categoryData.length) return this.categoryData;
      return [
        '09:30','09:31','09:32','09:33','09:34',
        '09:35','09:36','09:37','09:38','09:39',
        '09:40','09:41','09:42','09:43','09:44'
      ];
    },
    finalKData () {
      if (this.kData && this.kData.length) return this.kData;
      return [
        [10.0,10.2, 9.9,10.3],
        [10.2,10.4,10.1,10.5],
        [10.4,10.3,10.2,10.5],
        [10.3,10.6,10.3,10.7],
        [10.6,10.5,10.4,10.7],
        [10.5,10.7,10.4,10.8],
        [10.7,10.8,10.6,10.9],
        [10.8,10.9,10.7,11.0],
        [10.9,11.1,10.8,11.2],
        [11.1,11.0,11.0,11.2],
        [11.0,10.9,10.9,11.1],
        [10.9,10.8,10.8,11.0],
        [10.8,10.7,10.6,10.9],
        [10.7,10.6,10.5,10.8],
        [10.6,10.8,10.5,10.9]
      ];
    },
    finalLineSeries () {
      if (this.lineSeries && this.lineSeries.length) return this.lineSeries;

      // 默认构造 10 条简单的示例折线
      const baseLen = this.finalCategory.length;
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const data = [];
        for (let j = 0; j < baseLen; j++) {
          // 随便造点数据：10.x 周围抖动一下
          data.push(10 + i * 0.1 + Math.sin(j / 2) * 0.3);
        }
        lines.push({
          name: '线' + (i + 1),
          data
        });
      }
      return lines;
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
    categoryData: {
      handler () { this.updateChart(); },
      deep: true
    },
    kData: {
      handler () { this.updateChart(); },
      deep: true
    },
    lineSeries: {
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
      const lineSeries = this.finalLineSeries;

      return {
        animation: false,
        legend: {
          top: '48%',          // 放在折线区域上方
          left: 'center',       // 你可以调整位置
          type: 'scroll'        // 线多的时候用 scroll 方便隐藏/显示
        },
        axisPointer: {
          link: [{ xAxisIndex: 'all' }], // 关键：联动所有 x 轴
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
          // 0: K 线区域
          { left: '8%', right: '3%', top: '5%',  height: '35%' },
          // 1: 10 条折线区域（全部堆在一起）
          { left: '8%', right: '3%', top: '55%', height: '40%' }
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
          {
            type: 'category',
            data: categoryData,
            boundaryGap: true,
            axisTick: { show: false },
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            scale: true,
            gridIndex: 0,
            name: 'K线'
          },
          {
            gridIndex: 1,
            name: '指标',
            splitLine: { show: true }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
          },
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            top: '96%',
            start: 0,
            end: 100
          }
        ],
        series: [
          // 0: K 线
          {
            name: 'K线',
            type: 'candlestick',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: kData
          },
          // 1~10: 多条折线，全都放在 gridIndex:1 / yAxisIndex:1
          ...lineSeries.map((s, idx) => ({
            name: s.name || `线${idx + 1}`,
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: s.data || [],
            smooth: true,
            showSymbol: false
          }))
        ]
      };
    }
  }
};
</script>

<style scoped>
.kline-multi-lines {
  /* 可以按需调样式 */
}
</style>
