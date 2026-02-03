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
      originQty: 2, // 原始持仓数量（手）
      addPrice: 73.46, // 加仓价格
      addQty: 0, // 本次加仓数量（手）
      maxAddQty: 50, // 曲线最大加仓手数
    }
  },
  computed: {
    isSingleValid() {
      return this.originCost > 0 && this.originQty > 0 && this.addPrice > 0 && this.addQty > 0
    },
    totalQty() {
      if (!this.isSingleValid) return 0
      return this.originQty + this.addQty
    },
    newCost() {
      if (!this.isSingleValid) return 0
      const totalCost = this.originCost * this.originQty + this.addPrice * this.addQty
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
    // 亏损百分比数据：从 1 手加到 maxAddQty 手，计算每个点的亏损百分比
    lossData() {
      const result = []
      if (this.originCost <= 0 || this.originQty <= 0 || this.addPrice <= 0) {
        return result
      }
      const maxQ = this.maxAddQty > 0 ? this.maxAddQty : 1

      // 从 0 手开始：0 手 = 不加仓
      for (let q = 0; q <= maxQ; q++) {
        const totalQty = this.originQty + q
        const totalCost = this.originCost * this.originQty + this.addPrice * q
        const newCost = totalCost / totalQty

        // 亏损百分比：当前综合成本相对加仓价的折价比例
        const lossPct = Number((((newCost - this.addPrice) / newCost) * 100).toFixed(2))

        result.push({
          addQty: q,    // q=0 时表示不加仓
          lossPct,
        })
      }

      return result
    },
  },
  watch: {
    lossData(newData) {
      this.renderLossChart(newData)
    },
  },
  mounted() {
    // 初始化时渲染图表
    this.renderLossChart(this.lossData)
  },
  methods: {
    // 渲染亏损百分比曲线图
    // 渲染亏损百分比曲线图
    renderLossChart(data) {
      const dom = document.getElementById('lossChart')
      if (!dom) return

      const chart = echarts.init(dom)

      if (!data || !data.length) {
        chart.clear()
        return
      }

      const yMax = Math.max(...data.map(item => item.lossPct))
      const option = {
        title: {
          text: '亏损百分比曲线',
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
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
          max: yMax > 0 ? yMax : 0,
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
          },
        ],
      }
      chart.setOption(option)
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
