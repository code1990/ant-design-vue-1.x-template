<template>
  <div class="rightBox">
    <div style="">
      <!-- 标题和按钮 -->
      <div
        style="display: flex; justify-content: space-between; align-items: center; padding: 10px"
      >
        <div style="font-size: 18px; font-weight: bold; text-align: center">工单统计</div>
        <div>
          <a-button-group>
            <a-button
              v-for="item in ranges"
              :key="item.value"
              :type="item.value === activeRange ? 'primary' : 'default'"
              @click="changeRange(item.value)"
            >
              {{ item.label }}
            </a-button>
          </a-button-group>
        </div>
      </div>

      <!-- 环状图 -->
      <div ref="chartRef" style="width: 80%; height: 150px"></div>
    </div>
    <div>
      <div style="font-size: 18px; font-weight: bold; text-align: left; padding: 10px">
        实时工单
      </div>
      <div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          rowKey="id"
          bordered
          :scroll="{ x: '22%', y: 100 }"
          :pagination="false"
        />
      </div>
    </div>
    <div>
      <!-- 标题行 -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        "
      >
        <div style="font-size: 20px; font-weight: bold;padding: 10px;">实时视频</div>
        <a @click="toggleMore" style="font-size: 14px; cursor: pointer">
          {{ showMore ? '收起' : '查看更多' }}
        </a>
      </div>

      <!-- 视频区 -->
      <div class="video-content">
        <div
          v-for="(item, index) in videos"
          :key="index"
          :style="{
            backgroundImage: `url(${item})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120px',
            borderRadius: '6px',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      activeRange: 'today',
      showMore: false,
      videos: [
        // 模拟8个图片
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
        require('@/assets/video.png'),
      ],
      ranges: [
        {
          label: '今日',
          value: 'today',
        },
        {
          label: '本周',
          value: 'week',
        },
        {
          label: '本月',
          value: 'month',
        },
        {
          label: '本年',
          value: 'year',
        },
      ],
      chart: null,
      data: [
        {
          name: '设备类型1',
          value: 135,
        },
        {
          name: '设备类型2',
          value: 12,
        },
        {
          name: '设备类型3',
          value: 13,
        },
        {
          name: '设备类型4',
          value: 14,
        },
      ],
      // 表头定义
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          width: 80,
          align: 'center',
        },
        {
          title: '工单名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '派单形式',
          dataIndex: 'dispatchType',
          key: 'dispatchType',
        },
        {
          title: '工单状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '处理人',
          dataIndex: 'handler',
          key: 'handler',
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
        },
      ],

      // 模拟数据
      dataSource: [
        {
          id: 1,
          name: '水泵检修工单',
          dispatchType: '自动派单',
          status: '已完成',
          handler: '张三',
          phone: '13800000001',
        },
        {
          id: 2,
          name: '阀门巡检工单',
          dispatchType: '人工派单',
          status: '处理中',
          handler: '李四',
          phone: '13800000002',
        },
        {
          id: 3,
          name: '供水异常工单',
          dispatchType: '自动派单',
          status: '待处理',
          handler: '王五',
          phone: '13800000003',
        },
        {
          id: 4,
          name: '管网维护工单',
          dispatchType: '人工派单',
          status: '已完成',
          handler: '赵六',
          phone: '13800000004',
        },
        {
          id: 5,
          name: '设备巡检工单',
          dispatchType: '自动派单',
          status: '待处理',
          handler: '孙七',
          phone: '13800000005',
        },
      ],
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    toggleMore() {
      this.showMore = !this.showMore
    },
    changeRange(val) {
      this.activeRange = val
      // 模拟切换不同区间的数据
      this.data = this.mockData(val)
      this.updateChart()
    },
    mockData(range) {
      // 模拟不同区间的数据
      if (range === 'today') {
        return [
          {
            name: '设备类型1',
            value: 135,
          },
          {
            name: '设备类型2',
            value: 12,
          },
          {
            name: '设备类型3',
            value: 13,
          },
          {
            name: '设备类型4',
            value: 14,
          },
        ]
      }
      if (range === 'week') {
        return [
          {
            name: '设备类型1',
            value: 200,
          },
          {
            name: '设备类型2',
            value: 40,
          },
          {
            name: '设备类型3',
            value: 80,
          },
          {
            name: '设备类型4',
            value: 35,
          },
        ]
      }
      if (range === 'month') {
        return [
          {
            name: '设备类型1',
            value: 500,
          },
          {
            name: '设备类型2',
            value: 120,
          },
          {
            name: '设备类型3',
            value: 150,
          },
          {
            name: '设备类型4',
            value: 90,
          },
        ]
      }
      if (range === 'year') {
        return [
          {
            name: '设备类型1',
            value: 1500,
          },
          {
            name: '设备类型2',
            value: 400,
          },
          {
            name: '设备类型3',
            value: 600,
          },
          {
            name: '设备类型4',
            value: 300,
          },
        ]
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chartRef)
      this.updateChart()
    },
    updateChart() {
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          formatter: name => {
            const item = this.data.find(d => d.name === name)
            return `${name}：${item.value}个`
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'], // 环状
            center: ['35%', '50%'], // 左边显示
            data: this.data,
            label: { show: false },
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
}
</script>

<style scoped lang="less">
.rightBox {
  width: 22%;
  height: calc(100vh - 180px);
  position: absolute;
  top: 180px;
  opacity: 1; /* 保持文字完全不透明 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景透明 */
  z-index: 99;
  margin-top: 10px;
  right: 0;
}

::v-deep .ant-table {
  background: transparent !important;
  color: #000;
  font-size: 8px;
}

::v-deep .ant-table-thead > tr > th {
  background: transparent !important;
  color: #000 !important;
  font-size: 8px;
}

::v-deep .ant-table-tbody > tr > td {
  background: transparent !important;
  color: #000 !important;
  font-size: 8px;
}

/* 滚动内容和头部的白底去掉 */
::v-deep .ant-table-body,
::v-deep .ant-table-header {
  background: transparent !important;
}

.video-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 横向2列 */
  grid-gap: 10px; /* 网格间距 */
  height: 280px;
  overflow-y: auto; /* 开启纵向滚动 */
  border: 1px solid #e8e8e8;
  padding: 8px;
}
</style>
