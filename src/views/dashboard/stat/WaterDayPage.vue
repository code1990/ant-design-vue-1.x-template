<template>
  <div>
    <!-- 筛选条件 -->
    <div style="margin-bottom: 16px; display: flex; gap: 12px">
      <a-select v-model="selectedDevice" style="width: 180px" @change="handleSearch">
        <a-select-option value="all">全部设备</a-select-option>
        <a-select-option v-for="d in devices" :key="d" :value="d">{{ d }}</a-select-option>
      </a-select>

      <a-select v-model="selectedFactor" style="width: 180px" @change="handleSearch">
        <a-select-option value="all">全部要素</a-select-option>
        <a-select-option v-for="f in factors" :key="f" :value="f">{{ f }}</a-select-option>
      </a-select>

      <a-select v-model="selectedDim" style="width: 160px" @change="handleSearch">
        <a-select-option value="1">1 / 小时</a-select-option>
        <a-select-option value="2">2 / 小时</a-select-option>
      </a-select>

      <a-date-picker v-model="selectedDate" style="width: 180px" @change="handleSearch" />
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
      selectedDim: '1', // 默认 1/小时
      selectedDate: null,

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
          title: '时间',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '要素',
          dataIndex: 'factor',
          key: 'factor',
        },
      ]

      let step = this.selectedDim === '2' ? 2 : 1
      for (let h = step; h <= 24; h += step) {
        cols.push({
          title: `${h}时`,
          key: `h${h}`,
          dataIndex: ['values', h],
        })
      }

      // 最后一列：数据上报率
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
    // 模拟生成数据：每小时 0~12 个整数
    mockData() {
      const list = []
      const today = new Date().toISOString().slice(0, 10)
      let id = 1
      this.devices.forEach(d => {
        this.factors.forEach(f => {
          let values = {}
          for (let h = 1; h <= 24; h++) {
            values[h] = Math.floor(Math.random() * 13) // 0~12 随机
          }
          list.push({
            id: id++,
            device: d,
            date: today,
            factor: f,
            values,
          })
        })
      })
      this.rawData = list
    },

    // 筛选 + 计算上报率
    handleSearch() {
      let result = this.rawData

      if (this.selectedDevice !== 'all') {
        result = result.filter(r => r.device === this.selectedDevice)
      }
      if (this.selectedFactor !== 'all') {
        result = result.filter(r => r.factor === this.selectedFactor)
      }
      if (this.selectedDate) {
        const dateStr = this.selectedDate.format('YYYY-MM-DD')
        result = result.filter(r => r.date === dateStr)
      }

      // 如果是 2/小时，合并值
      if (this.selectedDim === '2') {
        result = result.map(r => {
          let newValues = {}
          for (let h = 2; h <= 24; h += 2) {
            newValues[h] = r.values[h - 1] + r.values[h]
          }
          return {
            ...r,
            values: newValues,
          }
        })
      }

      // 计算上报率
      result = result.map(r => {
        const total = Object.values(r.values).reduce((a, b) => a + b, 0)
        const rate = total / (24 * 12) // 分母固定 288
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
