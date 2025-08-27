<template>
  <div class="leftBox">
    <div>
      <div class="title">设备总览</div>
      <div style="display: flex; flex-direction: column; align-items: center">
        <!-- 第1个环状饼图 -->
        <div id="chart1" style="width: 100%; height: 100px"></div>
        <!-- 第2个环状饼图 -->
        <div id="chart2" style="width: 100%; height: 100px"></div>
        <!-- 第3个环状饼图 -->
        <div id="chart3" style="width: 100%; height: 100px"></div>
      </div>
      <div class="title">设备巡检情况
        <a-select
          v-model="dateType"
          placeholder="请选择"
          style="width: 50px"
        >
          <a-select-option value="day">日</a-select-option>
          <a-select-option value="month">月</a-select-option>
          <a-select-option value="year">年</a-select-option>
        </a-select>
      </div>
      <div class="content">
        <!-- 左侧 -->
        <div class="left">
          <div class="left-item">需巡检任务：23个</div>
        </div>

        <!-- 右侧 -->
        <div class="right">
          <div class="right-item">已巡检任务：14个</div>
          <div class="right-item">进行中巡检任务：2个</div>
          <div class="right-item">未巡检任务：7个</div>
        </div>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        row-key="id"
        style="overflow-x: auto;"
        bordered

        :style="{ background: 'transparent', color: '#fff' }"
        :pagination="false"
      >
        <!-- 操作列 -->
        <template slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)" style="color: #1890ff; cursor: pointer;">详情</a>
        </template>
      </a-table>
    </div>

  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      dateType: ['day'],
      columns: [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '套户单位名称', dataIndex: 'unitName', key: 'unitName' },
        { title: '巡检任务', dataIndex: 'task', key: 'task' },
        { title: '巡检人', dataIndex: 'inspector', key: 'inspector' },
        { title: '巡检状态', dataIndex: 'status', key: 'status' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
      ],
      data: [
        { id: 1, unitName: 'XX小区', task: '消防巡检', inspector: '张三', status: '已完成' },
        { id: 2, unitName: 'YY写字楼', task: '电梯巡检', inspector: '李四', status: '进行中' },
        { id: 3, unitName: 'ZZ厂区', task: '供电巡检', inspector: '王五', status: '未开始' },
        { id: 4, unitName: 'AA大厦', task: '给排水巡检', inspector: '赵六', status: '已完成' },
        { id: 5, unitName: 'BB商城', task: '消防巡检', inspector: '钱七', status: '进行中' },
        { id: 6, unitName: 'CC社区', task: '电梯巡检', inspector: '孙八', status: '未开始' }
      ]
    };
  },
  mounted() {
    this.drawChart1()
    this.drawChart2()
    this.drawChart3()
  },
  methods: {
    drawChart1() {
      const chart = echarts.init(document.getElementById('chart1'))
      chart.setOption({
        title: {
          text: '  200\n设备总数',
          left: '23%', // 中间文字偏右
          top: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
            color: 'white'
          },
        },
        legend: {
          orient: 'vertical',
          left: '45%', // 图例在左侧
          top: 'center',
          formatter: name => {
            const dataMap = {
              在线数量: 189,
              离线数量: 11,
              异常设备: 22,
            }
            return `${name}：${dataMap[name]}个`
          },
          textStyle: {
            fontSize: 14,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'], // 饼图偏右
            label: { show: false }, // 隐藏扇区上的文字
            data: [
              {
                value: 189,
                name: '在线数量',
              },
              {
                value: 11,
                name: '离线数量',
              },
              {
                value: 22,
                name: '异常设备',
              },
            ],
          },
        ],
      })
    },
    drawChart2() {
      const chart = echarts.init(document.getElementById('chart2'))
      chart.setOption({
        title: {
          text: '23个\n需要更换\n设备',
          left: '23%', // 中间文字偏右
          top: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
            color: 'white'
          },
        },
        legend: {
          orient: 'vertical',
          left: '45%', // 图例在左侧
          top: 'center',
          formatter: name => {
            const dataMap = {
              设备类型1: 23,
              设备类型2: 11,
              设备类型3: 22,
            }
            return `${name}：${dataMap[name]}个`
          },
          textStyle: {
            fontSize: 14,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'], // 饼图偏右
            label: { show: false }, // 隐藏扇区上的文字
            data: [
              {
                value: 23,
                name: '设备类型1',
              },
              {
                value: 21,
                name: '设备类型2',
              },
              {
                value: 13,
                name: '设备类型3',
              },
            ],
          },
        ],
      })
    },
    drawChart3() {
      const chart = echarts.init(document.getElementById('chart3'))
      chart.setOption({
        title: {
          text: '23个\n累计运维\n设备数量',
          left: '23%', // 中间文字偏右
          top: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
            color: 'white'
          },
        },
        legend: {
          orient: 'vertical',
          left: '45%', // 图例在左侧
          top: 'center',
          formatter: name => {
            const dataMap = {
              设备类型1: 23,
              设备类型2: 11,
              设备类型3: 22,
              设备类型4: 22,
            }
            return `${name}：${dataMap[name]}个`
          },
          textStyle: {
            fontSize: 14,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'], // 饼图偏右
            label: { show: false }, // 隐藏扇区上的文字
            data: [
              {
                value: 135,
                name: '设备类型1',
              },
              {
                value: 12,
                name: '设备类型2',
              },
              {
                value: 13,
                name: '设备类型3',
              },
              {
                value: 14,
                name: '设备类型4',
              },
            ],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="less">
.leftBox {
  width: 20%;
  height: calc(100vh - 50px);
  float: left;
  background-color: purple; /* 背景透明 */
}

.title {
  width: calc(100% - 10px);
  height: 20px;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: bold;
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

.content {
  display: flex;
  width: 100%;
  height: 100px; /* 可以按需要调整 */
}

.left, .right {
  flex: 1; /* 左右等分 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  border: 1px solid #E6E6E4;
}

.right {
  justify-content: space-between; /* 垂直等间距 */
}

.left-item, .right-item {
  font-size: 14px;
  color: #000;
}
.right-item {
  border: 1px solid #E6E6E4;
  width: 100%;
  height: 33.2%;
  text-align: center;
  line-height: 30px;
}

::v-deep .ant-select-selection{
  background: transparent !important;
  color: #000;
  opacity: 1;
  border: none;
}
</style>
