<template>
  <div>
    <!-- 筛选条件 -->
    <div style="margin-bottom: 16px; display: flex; gap: 12px">
      <!-- 设备选择 -->
      <a-select v-model="selectedDevice" style="width: 180px" @change="handleSearch">
        <a-select-option value="all">全部设备</a-select-option>
        <a-select-option v-for="d in devices" :key="d" :value="d">{{ d }}</a-select-option>
      </a-select>

      <!-- 要素选择 -->
      <a-select v-model="selectedFactor" style="width: 180px" @change="handleSearch">
        <a-select-option value="all">全部要素</a-select-option>
        <a-select-option v-for="f in factors" :key="f" :value="f">{{ f }}</a-select-option>
      </a-select>

      <!-- 统计维度 -->
      <a-select v-model="selectedDim" style="width: 160px" @change="handleSearch">
        <a-select-option value="5">5 min</a-select-option>
        <a-select-option value="10">10 min</a-select-option>
        <a-select-option value="60">1 小时</a-select-option>
      </a-select>

      <!-- 月份选择 -->
      <a-month-picker v-model="selectedMonth" style="width: 180px" @change="handleSearch" />
    </div>

    <!-- 表格 -->
    <a-table :columns="tableColumns" :data-source="tableData" rowKey="id" bordered />
  </div>
</template>

<script>
export default {
  data() {
    return {
      devices: ['设备A', '设备B', '设备C'],
      factors: ['PH', 'COD', 'NH3-N'],

      selectedDevice: 'all',
      selectedFactor: 'all',
      selectedDim: '5', // 默认 5min
      selectedMonth: null,

      rawData: [],
      tableData: [],
    }
  },
  computed: {
    tableColumns() {
      let cols = [
        {
          title: '设备名称',
          dataIndex: 'device',
          key: 'device',
          fixed: 'left',
        },
        {
          title: '月份',
          dataIndex: 'month',
          key: 'month',
        },
        {
          title: '要素',
          dataIndex: 'factor',
          key: 'factor',
        },
      ]

      // 固定 1-31 天
      for (let d = 1; d <= 31; d++) {
        cols.push({
          title: `${d}日`,
          key: `d${d}`,
          dataIndex: ['values', d],
        })
      }

      // 数据上报率
      cols.push({
        title: '数据上报率',
        key: 'rate',
        dataIndex: 'rate',
        customRender: text => `${(text * 100).toFixed(1)}%`,
      })

      return cols
    },
  },
  created() {
    this.mockData()
    this.handleSearch()
  },
  methods: {
    // 模拟生成：每天最多 288 包，随机丢包
    mockData() {
      const list = []
      const today = new Date()
      const monthStr = today.toISOString().slice(0, 7) // YYYY-MM
      let id = 1
      this.devices.forEach(d => {
        this.factors.forEach(f => {
          let values = {}
          for (let day = 1; day <= 31; day++) {
            values[day] = Math.floor(Math.random() * 289) // 0~288
          }
          list.push({
            id: id++,
            device: d,
            month: monthStr,
            factor: f,
            values,
          })
        })
      })
      this.rawData = list
    },

    // 筛选 + 上报率计算
    handleSearch() {
      let result = this.rawData

      if (this.selectedDevice !== 'all') {
        result = result.filter(r => r.device === this.selectedDevice)
      }
      if (this.selectedFactor !== 'all') {
        result = result.filter(r => r.factor === this.selectedFactor)
      }
      if (this.selectedMonth) {
        const monthStr = this.selectedMonth.format('YYYY-MM')
        result = result.filter(r => r.month === monthStr)
      }

      // 计算上报率
      result = result.map(r => {
        const days = 31
        const total = Object.values(r.values).reduce((a, b) => a + b, 0)
        const rate = total / (days * 288)
        return {
          ...r,
          rate,
        }
      })

      this.tableData = result
    },
  },
}
</script>
