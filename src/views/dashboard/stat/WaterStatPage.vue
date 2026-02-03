<template>
  <div>
    <!-- 查询条件区 -->
    <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px">
      <!-- 站点选择 -->
      <a-select
        v-model="filters.station"
        placeholder="选择设备站点"
        allow-clear
        style="width: 200px"
        @change="handleSearch"
      >
        <a-select-option v-for="s in stations" :key="s">{{ s }}</a-select-option>
      </a-select>

      <!-- 日期范围 -->
      <a-range-picker v-model="filters.dateRange" style="width: 280px" @change="handleSearch"/>

      <!-- 查询按钮 -->
      <a-button type="primary" @click="handleSearch">查询</a-button>
      <!-- 重置按钮 -->
      <a-button @click="handleReset">重置</a-button>
    </div>

    <!-- 数据表格 -->
    <a-table
      :columns="columns"
      :data-source="filteredData"
      :row-key="record => record.id"
      bordered
      :pagination="{ pageSize: 5 }"
    />
  </div>
</template>

<script>
export default {
  name: 'DeviceTableWithFilter',
  data() {
    return {
      // 模拟站点数据
      stations: ['Xxx设备监测站', 'Yyy水质监测点', 'Zzz河道观测点'],
      // 查询条件
      filters: {
        station: undefined,
        dateRange: [],
      },
      // 表格字段
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          width: 60,
          align: 'center',
        },
        {
          title: '设备站点',
          dataIndex: 'station',
          key: 'station',
        },
        {
          title: '设备坐标',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: '设备安装时间',
          dataIndex: 'installTime',
          key: 'installTime',
        },
        {
          title: '水位/米',
          dataIndex: 'waterLevel',
          key: 'waterLevel',
        },
        {
          title: '水质',
          dataIndex: 'waterQuality',
          key: 'waterQuality',
        },
        {
          title: '流量/米/S',
          dataIndex: 'flow',
          key: 'flow',
        },
        {
          title: '设备状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '设备故障维率',
          dataIndex: 'faultRate',
          key: 'faultRate',
        },
        {
          title: '设备归属',
          dataIndex: 'belong',
          key: 'belong',
        },
      ],
      // 原始数据
      tableData: [],
      // 过滤后的数据
      filteredData: [],
    }
  },
  created() {
    this.tableData = this.mockData()
    this.filteredData = [...this.tableData]
  },
  methods: {
    // 模拟数据
    mockData() {
      const belongs = ['雨水排水管', '污水', '河道']
      const status = ['正常', '异常']
      const data = []
      for (let i = 1; i <= 20; i++) {
        const year = 2020 + Math.floor(Math.random() * 5)
        const month = 1 + Math.floor(Math.random() * 12)
        const day = 1 + Math.floor(Math.random() * 28)
        data.push({
          id: i,
          station: this.stations[Math.floor(Math.random() * this.stations.length)],
          location: `经度${(120 + Math.random()).toFixed(4)}/纬度${(30 + Math.random()).toFixed(
            4
          )}`,
          installTime: `${year}年${month}月${day}日`,
          waterLevel: status[Math.floor(Math.random() * status.length)],
          waterQuality: status[Math.floor(Math.random() * status.length)],
          flow: Math.random().toFixed(2),
          status: status[Math.floor(Math.random() * status.length)],
          faultRate: `${Math.floor(Math.random() * 50)}%`,
          belong: belongs[Math.floor(Math.random() * belongs.length)],
        })
      }
      return data
    },

    // 查询
    handleSearch() {
      let data = [...this.tableData]
      // 按站点过滤
      if (this.filters.station) {
        data = data.filter(item => item.station === this.filters.station)
      }
      // 按安装时间过滤（简单匹配年份范围）
      if (this.filters.dateRange && this.filters.dateRange.length === 2) {
        const [start, end] = this.filters.dateRange
        data = data.filter(item => {
          const dateStr = item.installTime.replace(/[年月日]/g, '-').replace(/-$/, '')
          const installDate = new Date(dateStr)
          return installDate >= start._d && installDate <= end._d
        })
      }
      this.filteredData = data
    },

    // 重置
    handleReset() {
      this.filters = {
        station: undefined,
        dateRange: [],
      }
      this.filteredData = [...this.tableData]
    },
  },
}
</script>
