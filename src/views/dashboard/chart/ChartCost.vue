<template>
  <div class="t-calculator">
    <h2>T 成本计算器</h2>

    <!-- 输入区 -->
    <div class="form-row">
      <label>原始成本价：</label>
      <input v-model.number="originCost" type="number" step="0.01" />
    </div>

    <div class="form-row">
      <label>原始持仓数量：</label>
      <input v-model.number="originQty" type="number" step="1" />
    </div>

    <div class="form-row">
      <label>加仓价格：</label>
      <input v-model.number="addPrice" type="number" step="0.01" />
    </div>

    <div class="form-row">
      <label>本次加仓数量：</label>
      <input v-model.number="addQty" type="number" step="1" />
    </div>

    <div class="form-row">
      <label>曲线最大加仓手数：</label>
      <input v-model.number="maxAddQty" type="number" step="1" />
    </div>

    <hr />

    <!-- 单点计算结果 -->
    <div v-if="isSingleValid" class="result-block">
      <h3>本次加仓结果</h3>
      <p>加仓后总持仓：{{ totalQty }} 手</p>
      <p>加仓后新成本价：{{ newCost.toFixed(2) }}</p>
      <p>成本降低：{{ costDrop.toFixed(4) }}</p>
      <p>成本降低百分比：{{ costDropPct.toFixed(2) }}%</p>
    </div>
    <div v-else class="result-block">
      <p>请先输入合理的 原成本价 / 持仓 / 加仓价格 / 加仓数量。</p>
    </div>

    <!-- 推荐加仓参考 -->
    <div class="result-block" v-if="lossData.length">
      <h3>推荐加仓参考（基于边际成本下降）</h3>
      <template v-if="recommendAddQty > 0">
        <p>推荐加仓手数（上限）：{{ recommendAddQty }} 手</p>
        <p>
          加到 {{ recommendAddQty }} 手后，新成本价约：
          {{ recommendNewCost.toFixed(2) }}
        </p>
        <p class="tip">
          说明：每多加 1 手带来的成本下降幅度低于第 1 手的约
          {{ (thresholdRatio * 100).toFixed(0) }}% 时，认为继续加仓性价比明显下降。
        </p>
      </template>
      <template v-else>
        <p>当前价位不建议在此基础上加仓（可能加仓价 ≥ 原始成本价，或边际收益太低）。</p>
      </template>
    </div>

    <hr />

    <!-- 亏损百分比曲线图 -->
    <div v-if="lossData.length">
      <h3>亏损百分比曲线（按加仓手数变化）</h3>
      <div id="lossChart" style="height: 400px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TCalculator',
  data() {
    return {
      originCost: 76.8799, // 原始成本价
      originQty: 2,        // 原始持仓数量（手）
      addPrice: 73.46,     // 加仓价格
      addQty: 0,           // 本次加仓数量（手）
      maxAddQty: 50,       // 曲线最大加仓手数
      thresholdRatio: 0.3, // 边际成本下降阈值比例（相对第一手）
      chart: null,         // echarts 实例
    }
  },
  computed: {
    isSingleValid() {
      return (
        this.originCost > 0 &&
        this.originQty > 0 &&
        this.addPrice > 0 &&
        this.addQty > 0
      )
    },
    totalQty() {
      if (!this.isSingleValid) return 0
      return this.originQty + this.addQty
    },
    newCost() {
      if (!this.isSingleValid) return 0
      const totalCost =
        this.originCost * this.originQty +
        this.addPrice * this.addQty
      return totalCost / this.totalQty
    },
    costDrop() {
      if (!this.isSingleValid) return 0
      return this.originCost - this.newCost
    },
    costDropPct() {
      if (!this.isSingleValid || this.originCost <= 0) return 0
      return (this.costDrop / this.originCost) * 100
    },
    // 亏损百分比数据：从 0 手加到 maxAddQty 手
    // 0 手 = 不加仓
    lossData() {
      const result = []
      if (
        this.originCost <= 0 ||
        this.originQty <= 0 ||
        this.addPrice <= 0
      ) {
        return result
      }
      const maxQ = this.maxAddQty > 0 ? this.maxAddQty : 1

      for (let q = 0; q <= maxQ; q++) {
        const totalQty = this.originQty + q
        const totalCost =
          this.originCost * this.originQty + this.addPrice * q
        const newCost = totalCost / totalQty

        // 以“综合成本相对当前加仓价”的亏损百分比作为 Y 值
        const lossPct = Number(
          (((newCost - this.addPrice) / newCost) * 100).toFixed(2)
        )

        result.push({
          addQty: q,
          lossPct,
        })
      }

      return result
    },
    // 推荐加仓手数：边际成本下降低于首手一定比例时，认为不划算
    recommendAddQty() {
      if (
        this.originCost <= 0 ||
        this.originQty <= 0 ||
        this.addPrice <= 0
      ) {
        return 0
      }

      // 加仓价 >= 原成本价，加仓只会抬高成本
      if (this.addPrice >= this.originCost) {
        return 0
      }

      const maxQ = this.maxAddQty > 0 ? this.maxAddQty : 1

      // 计算某个加仓手数下的成本降低
      const costDropAt = q => {
        const totalQty = this.originQty + q
        const totalCost =
          this.originCost * this.originQty + this.addPrice * q
        const newCost = totalCost / totalQty
        return this.originCost - newCost
      }

      const costDrop0 = costDropAt(0) // = 0
      const costDrop1 = costDropAt(1)
      const firstDelta = costDrop1 - costDrop0

      // 第一手都没降低成本，直接不推荐加仓
      if (firstDelta <= 0) return 0

      const threshold = firstDelta * this.thresholdRatio

      let prevDrop = costDrop0
      let bestQ = 0

      for (let q = 1; q <= maxQ; q++) {
        const currDrop = costDropAt(q)
        const delta = currDrop - prevDrop // 第 q 手单独贡献的成本下降

        if (delta < threshold) {
          // 第 q 手开始性价比明显变差，推荐加到 q-1 手
          bestQ = q - 1
          break
        }

        bestQ = q
        prevDrop = currDrop
      }

      return bestQ
    },
    // 推荐加仓后的新成本价，方便展示
    recommendNewCost() {
      if (this.recommendAddQty <= 0) return this.originCost
      const totalQty = this.originQty + this.recommendAddQty
      const totalCost =
        this.originCost * this.originQty +
        this.addPrice * this.recommendAddQty
      return totalCost / totalQty
    },
  },
  watch: {
    lossData(newData) {
      this.renderLossChart(newData)
    },
  },
  mounted() {
    this.renderLossChart(this.lossData)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize()
    },
    // 渲染亏损百分比曲线图
    renderLossChart(data) {
      const dom = document.getElementById('lossChart')
      if (!dom) return

      if (!this.chart) {
        this.chart = echarts.init(dom)
      }

      if (!data || !data.length) {
        this.chart.clear()
        return
      }

      const yMax = Math.max(...data.map(item => item.lossPct))

      const option = {
        title: {
          text: '亏损百分比曲线',
        },
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            const p = params[0]
            const isZero = Number(p.axisValue) === 0
            const title = isZero ? '不加仓' : `加仓 ${p.axisValue} 手`
            return `${title}<br/>亏损百分比：${p.data}%`
          },
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.addQty),
          name: '加仓手数',
          axisLabel: {
            interval: 5,
          },
        },
        yAxis: {
          type: 'value',
          name: '亏损百分比',
          min: 0,
          max: yMax > 0 ? yMax : undefined, // 没有正值时走默认
          axisLabel: {
            formatter: '{value}%',
          },
        },
        series: [
          {
            data: data.map(item => item.lossPct),
            type: 'line',
            smooth: true,
            name: '亏损百分比',
            itemStyle: {
              color: '#ff6347',
            },
            lineStyle: {
              width: 2,
            },
            symbol: 'circle',
            symbolSize: 8,
            // 在曲线上标出推荐加仓手数
            markLine:
              this.recommendAddQty > 0
                ? {
                  symbol: 'none',
                  lineStyle: {
                    type: 'dashed',
                  },
                  data: [
                    {
                      xAxis: this.recommendAddQty,
                      name: '推荐加仓',
                      label: {
                        formatter: `推荐加仓: ${this.recommendAddQty} 手`,
                        position: 'end',
                      },
                    },
                  ],
                }
                : undefined,
          },
        ],
      }

      this.chart.setOption(option)
    },
  },
}
</script>

<style scoped>
.t-calculator {
  max-width: 600px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 14px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.form-row label {
  width: 130px;
  color: #555;
}

.form-row input {
  flex: 1;
  padding: 4px 8px;
  box-sizing: border-box;
}

.result-block {
  margin: 12px 0;
}

.result-block .tip {
  font-size: 12px;
  color: #888;
}

.curve-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.curve-table th,
.curve-table td {
  border: 1px solid #ddd;
  padding: 4px 6px;
  text-align: center;
}

.curve-table thead {
  background: #f7f7f7;
}
</style>
