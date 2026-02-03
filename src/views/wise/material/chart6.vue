<template>
  <div class="steel-summary">
    <!-- 第一行：标题（10%） -->
    <div class="row row-title">
      <div class="title">钢筋材料汇总</div>
    </div>

    <!-- 第二行：按钮（10%） -->
    <div class="row row-actions">
      <a-button-group>
        <a-button :type="rangeKey === '7d' ? 'primary' : 'default'" @click="onChangeRange('7d')">
          近7天数据
        </a-button>
        <a-button :type="rangeKey === '30d' ? 'primary' : 'default'" @click="onChangeRange('30d')">
          近30天数据
        </a-button>
        <a-button :type="rangeKey === '1y' ? 'primary' : 'default'" @click="onChangeRange('1y')">
          近一年数据
        </a-button>
      </a-button-group>

      <div class="meta">
        <span class="meta-item">当前日期：{{ activeDateLabel }}</span>
        <span class="meta-item">总量：{{ activeTotal }} 吨</span>
      </div>
    </div>

    <!-- 第三行：内容（80%），左右各 50% -->
    <div class="row row-content">
      <div class="chart half">
        <div class="chart-title">当日构成（环状饼图）</div>
        <div ref="pieRef" class="chart-canvas"></div>
      </div>

      <div class="chart half">
        <div class="chart-title">趋势（堆积折线）</div>
        <div ref="lineRef" class="chart-canvas"></div>
      </div>
    </div>
  </div>
</template>

<script>
// Vue 2.6 + Options API
import * as echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
// import axios from 'axios'

export default {
  name: 'SteelMaterialSummary',
  data() {
    return {
      rangeKey: '7d',
      loading: false,

      // 业务数据
      categories: ['HRB400', 'HRB500', 'HPB300', '盘螺', '螺纹钢'],
      dates: [], // ['2026-01-01', ...]
      seriesByCat: {}, // { HRB400: [..], ... }  (按日期对齐)
      activeIndex: 0, // 当前饼图展示的日期索引（默认最后一天）

      // echarts 实例
      pieChart: null,
      lineChart: null,
    }
  },
  computed: {
    activeDateLabel() {
      if (!this.dates.length) return '-'
      return moment(this.dates[this.activeIndex]).format('YYYY-MM-DD')
    },
    activeTotal() {
      if (!this.dates.length) return 0
      const idx = this.activeIndex
      let sum = 0
      this.categories.forEach(c => {
        const arr = this.seriesByCat[c] || []
        sum += Number(arr[idx] || 0)
      })
      return Number(sum.toFixed(2))
    },
  },
  mounted() {
    this.initCharts()
    this.loadRange(this.rangeKey)

    this._resize = _.debounce(() => {
      if (this.pieChart) this.pieChart.resize()
      if (this.lineChart) this.lineChart.resize()
    }, 150)
    window.addEventListener('resize', this._resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._resize)
    this.disposeCharts()
  },
  methods: {
    onChangeRange(key) {
      if (this.rangeKey === key) return
      this.rangeKey = key
      this.loadRange(key)
    },

    initCharts() {
      if (this.$refs.pieRef) this.pieChart = echarts.init(this.$refs.pieRef)
      if (this.$refs.lineRef) this.lineChart = echarts.init(this.$refs.lineRef)

      // 堆积折线 hover -> 切换饼图日期
      if (this.lineChart) {
        this.lineChart.on('updateAxisPointer', event => {
          const info = event && event.axesInfo && event.axesInfo[0]
          if (!info) return
          // info.value 为 xAxis 类目（日期字符串）
          const dateStr = info.value
          const idx = this.dates.indexOf(dateStr)
          if (idx >= 0 && idx !== this.activeIndex) {
            this.activeIndex = idx
            this.renderPie()
          }
        })

        // 鼠标移出图表区域：回到“最后一天”（符合“默认显示最后一天”）
        this.lineChart.on('globalout', () => {
          if (!this.dates.length) return
          const last = this.dates.length - 1
          if (this.activeIndex !== last) {
            this.activeIndex = last
            this.renderPie()
          }
        })
      }

      this.renderPie()
      this.renderLine()
    },

    disposeCharts() {
      if (this.pieChart) {
        this.pieChart.dispose()
        this.pieChart = null
      }
      if (this.lineChart) {
        this.lineChart.dispose()
        this.lineChart = null
      }
    },

    async loadRange(key) {
      this.loading = true
      try {
        const payload = await this.fetchData(key)
        this.dates = payload.dates
        this.seriesByCat = payload.seriesByCat

        // 默认显示最后一天
        this.activeIndex = this.dates.length ? this.dates.length - 1 : 0

        this.renderLine()
        this.renderPie()
      } finally {
        this.loading = false
      }
    },

    // ✅ 你可以把这里替换成真实接口（axios）
    async fetchData(key) {
      // 示例：真实接口（自行按后端字段改造）
      // const { data } = await axios.get('/api/steel/summary', { params: { range: key } })
      // return data

      // mock：根据范围生成演示数据
      const days = key === '7d' ? 7 : key === '30d' ? 30 : 365
      const end = moment().startOf('day')
      const dates = []
      for (let i = days - 1; i >= 0; i--) {
        dates.push(end.clone().subtract(i, 'days').format('YYYY-MM-DD'))
      }

      const seriesByCat = {}
      this.categories.forEach((cat, ci) => {
        seriesByCat[cat] = dates.map((d, di) => {
          // 让数据更像“堆积趋势”：基础量 + 周期波动 + 类目差异
          const base = 30 + ci * 6
          const wave = 12 * Math.sin((di / Math.max(7, days)) * Math.PI * 2)
          const noise = (Math.random() - 0.5) * 6
          const v = Math.max(0, base + wave + noise)
          return Number(v.toFixed(2))
        })
      })

      return {
        dates,
        seriesByCat,
      }
    },

    renderPie() {
      if (!this.pieChart) return

      const idx = this.activeIndex
      const pieData = this.categories.map(c => {
        const arr = this.seriesByCat[c] || []
        return {
          name: c,
          value: Number(arr[idx] || 0),
        }
      })

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 吨 ({d}%)',
        },
        title: {
          text: this.activeDateLabel,
          left: 'center',
          top: 6,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        legend: {
          bottom: 6,
          type: 'scroll',
        },
        series: [
          {
            name: '当日构成',
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter: '{b}: {c}',
            },
            labelLine: { show: true },
            data: pieData,
          },
        ],
      }

      this.pieChart.setOption(option, true)
    },

    renderLine() {
      if (!this.lineChart) return
      if (!this.dates.length) {
        this.lineChart.clear()
        return
      }

      const series = this.categories.map(c => {
        return {
          name: c,
          type: 'line',
          stack: 'total',
          smooth: true,
          showSymbol: false,
          emphasis: { focus: 'series' },
          data: this.seriesByCat[c] || [],
        }
      })

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'line' },
        },
        legend: {
          top: 6,
          type: 'scroll',
        },
        grid: {
          left: 50,
          right: 20,
          top: 45,
          bottom: 35,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dates,
        },
        yAxis: {
          type: 'value',
          name: '吨',
        },
        series,
      }

      this.lineChart.setOption(option, true)
    },
  },
}
</script>

<style scoped>
/* 外层高度由父容器控制；若需要也可给 steel-summary 设置固定高度 */
.steel-summary {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.row {
  width: 100%;
  box-sizing: border-box;
}

.row-title {
  height: 10%;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.row-actions {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.meta {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}

.meta-item + .meta-item {
  margin-left: 12px;
}

.row-content {
  height: 80%;
  display: flex;
  padding: 0 12px 12px;
  box-sizing: border-box;
}

.chart {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.half {
  width: 50%;
}

.half + .half {
  margin-left: 12px;
}

.chart-title {
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.75);
}

.chart-canvas {
  flex: 1;
  min-height: 0;
}
</style>
