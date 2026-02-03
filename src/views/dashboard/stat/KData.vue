<template>
  <div ref="chartContainer" style="width: 100%; height: 90vh"></div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: 'KLineChart',
  data() {
    return {
      chart: null,
      rawData: [],
      upColor: '#ec0000',
      upBorderColor: '#8A0000',
      downColor: '#00da3c',
      downBorderColor: '#008F28',
    }
  },
  async mounted() {
    await this.fetchData()
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/kdata.json') // 从 public 目录加载
        this.rawData = response.data
      } catch (error) {
        console.error('Failed to load kdata.json:', error)
        this.rawData = [] // fallback
      }
    },

    splitData(rawData) {
      const categoryData = []
      const values = []
      for (let i = 0; i < rawData.length; i++) {
        // 注意：不能直接 splice 原始数据，会破坏源数据！应复制
        const item = [...rawData[i]] // 浅拷贝
        const date = item[0]
        const ohlc = item.slice(1) // [open, close, low, high]
        categoryData.push(date)
        values.push(ohlc)
      }
      return {
        categoryData,
        values,
      }
    },

    calculateMA(dayCount, values) {
      const result = []
      for (let i = 0; i < values.length; i++) {
        if (i < dayCount - 1) {
          result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount; j++) {
          sum += parseFloat(values[i - j][0]) // open price is at index 0 in ohlc
        }
        result.push(sum / dayCount)
      }
      return result
    },

    initChart() {
      if (this.rawData.length === 0) return

      const { categoryData, values } = this.splitData(this.rawData)

      const option = {
        // title: {
        //   text: '上证指数',
        //   left: 0,
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        // legend: {
        //   data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
        //   top: 20,
        // },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          top: '1%',
        },
        xAxis: {
          type: 'category',
          data: categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: 'inside', // 启用鼠标滚轮缩放 + 拖拽平移
            zoomOnMouseWheel: true, // 默认 true，可省略
            moveOnMouseMove: true, // 拖拽平移（配合鼠标左键拖动）
            moveOnMouseWheel: false, // 滚轮是否平移（通常设为 false）
            preventDefaultMouseMove: true,
          },
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: values,
            itemStyle: {
              color: this.upColor,
              color0: this.downColor,
              borderColor: this.upBorderColor,
              borderColor0: this.downBorderColor,
            },
            markPoint: {
              label: {
                formatter: param => {
                  return param != null ? Math.round(param.value) + '' : ''
                },
              },
              data: [
                {
                  name: 'Mark',
                  coord: ['2013/5/31', 2300],
                  value: 2300,
                  itemStyle: {
                    color: 'rgb(41,60,85)',
                  },
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest',
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest',
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close',
                },
              ],
              tooltip: {
                formatter: param => {
                  return param.name + '<br>' + (param.data.coord || '')
                },
              },
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: { show: false },
                    emphasis: { label: { show: false } },
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: { show: false },
                    emphasis: { label: { show: false } },
                  },
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close',
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close',
                },
              ],
            },
          },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5, values),
            smooth: true,
            lineStyle: { opacity: 0.5 },
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10, values),
            smooth: true,
            lineStyle: { opacity: 0.5 },
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(20, values),
            smooth: true,
            lineStyle: { opacity: 0.5 },
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(30, values),
            smooth: true,
            lineStyle: { opacity: 0.5 },
          },
        ],
      }

      this.chart = echarts.init(this.$refs.chartContainer)
      this.chart.setOption(option)
    },
  },
}
</script>