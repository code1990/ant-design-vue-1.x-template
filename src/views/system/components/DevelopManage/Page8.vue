<template>
  <a-modal
    v-model="visible"
    title="河湖水系选择"
    width="800px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div style="margin-bottom: 16px">
      <a-input
        v-model="filterText"
        placeholder="过滤表单"
        @input="handleFilter"
        style="width: 40%; margin-right: 2%"
      />
      <a-input
        v-model="mapSearchText"
        placeholder="地图搜索"
        @input="handleMapSearch"
        style="width: 40%"
      />
      <a-auto-complete style="width: 200px" placeholder="input here" @search="handleSearch">
        <template slot="dataSource">
          <a-select-option v-for="email in result" :key="email">
            {{ email }}
          </a-select-option>
        </template>
      </a-auto-complete>
      <a-button
        type="primary"
        icon="environment"
        @click="startPickLocation"
        style="margin-right: 2%; width: 14%"
      >
        拾取地点
      </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="filteredData"
      row-key="id"
      :row-selection="rowSelection"
      :pagination="{ pageSize: 10 }"
      bordered
    >
      <template slot="action" slot-scope="text, record">
        <a @click="viewOnMap(record)">查看地图</a>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      filterText: '',
      mapSearchText: '',
      selectedRowKeys: [],
      result: [],
      selectedRows: [],
      pickedLocations: [], // 表单数据中追加的位置列表
      rowSelection: {
        selectedRowKeys: [],
        onChange: () => {},
        selections: []
      },
      isPicking: false,
      allData: [
        {
          id: 1,
          name: '珠江',
          location: '广州',
        },
        {
          id: 2,
          name: '汉江',
          location: '武汉',
        },
        {
          id: 3,
          name: '松花江',
          location: '哈尔滨',
        },
        // 可填入真实数据
      ],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '位置',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  mounted() {
    this.initRowSelection()
  },
  methods: {
    handleSearch(value) {
      let result;
      if (!value || value.indexOf('@') >= 0) {
        result = [];
      } else {
        result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
      }
      this.result = result;
    },
    initRowSelection() {
      this.rowSelection = {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (keys, rows) => {
          this.selectedRowKeys = keys
          this.selectedRows = rows
        },
        selections: [
          {
            key: 'all',
            text: '全选当前页',
            onSelect: () => {
              const keys = this.filteredData.map(item => item.id)
              this.selectedRowKeys = keys
              this.selectedRows = this.filteredData
            },
          },
          {
            key: 'clear',
            text: '清空选择',
            onSelect: () => {
              this.selectedRowKeys = []
              this.selectedRows = []
            },
          }
        ]
      }
    },
    startPickLocation() {
      this.isPicking = true
      this.$message.info('请点击地图选择一个位置')
      if (this.map && this.map.addEventListener) {
        this.map.addEventListener('click', this.handleMapClick)
      }
    },
    async handleMapClick(e) {
      if (!this.isPicking) return

      const lng = e.lnglat.lng
      const lat = e.lnglat.lat
      const coord = {
        lng,
        lat,
      }

      // 👇 使用天地图的地理编码服务（反查地址）
      const url = `https://api.tianditu.gov.cn/geocoder?postStr={"lon":${lng},"lat":${lat},"ver":1}&type=geocode&tk=你的天地图Key`

      try {
        const res = await fetch(url)
        const data = await res.json()
        const address = data?.result?.formatted_address || '未知位置'

        this.pickedLocations.push({
          lng,
          lat,
          address,
        })

        this.$message.success(`已添加：${address}`)
      } catch (err) {
        console.error('反查地址失败', err)
        this.$message.error('地址反查失败')
      } finally {
        this.isPicking = false
        if (this.map && this.map.removeEventListener) {
          this.map.removeEventListener('click', this.handleMapClick)
        }
      }
    },
    handleFilter() {
      // 可加入额外逻辑
    },
    handleMapSearch() {
      // 触发地图搜索
    },
    viewOnMap(row) {
      console.log('在地图上查看:', row)
      // 触发地图跳转或高亮逻辑
    },
    handleOk() {
      console.log('✅ 已选择数据：', this.selectedRows)
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
