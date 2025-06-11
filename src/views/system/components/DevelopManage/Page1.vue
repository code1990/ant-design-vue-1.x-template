<template>
  <div>
    <!--    <a-select-->
    <!--      mode="tags"-->
    <!--      :size="size"-->
    <!--      placeholder="事件分析"-->
    <!--      v-model="value"-->
    <!--      style="width: 120px;height: 20px;"-->
    <!--      @change="handleChange"-->
    <!--    >-->
    <!--      <a-select-option v-for="(item, index) in device.channels" :key="index" :value="item.channelType">-->
    <!--        {{ item.channelName }}-->
    <!--      </a-select-option>-->
    <!--    </a-select>-->

    <a-select
      mode="multiple"
      style="width: 400px; margin-bottom: 20px"
      placeholder="请选择显示的列"
      v-model="selectedFields"
      @change="handleColumnChange"
    >
      <a-select-option v-for="field in allFields" :key="field.key" :value="field.key">
        {{ field.title }}
      </a-select-option>
    </a-select>
    <a-button type="" @click="showDrawer">
      <a-icon type="" />
      确定
    </a-button>

    <a-modal
      v-model="visible"
      title="事件分析"
      on-ok="handleOk"
      :footer="null"
      width="600"
      :bodyStyle="{ height: '400px', overflowY: 'auto' }"
    >
      <div class="leftBox">
        <div class="" style="padding: 20px; background: white; height: 100%">
          <a-table :columns="columnsData" :data-source="tableData" rowKey="id" bordered />
        </div>
      </div>
      <div class="rightBox">
        <div style="max-height: 100%; overflow-y: auto">
          <div
            v-for="(field, index) in selectedFields"
            :key="field"
            style="width: 100%; height: 300px; margin-bottom: 20px; border: 1px solid #ddd"
            :ref="'chart' + index"
          />
        </div>
      </div>
      <p>
        <a-button type="dashed" @click="showChat">提交deepseek分析</a-button>
      </p>
      <div class="chatBox" v-if="isChat">
        <p>我是聊天机器人</p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      size: 'small',
      value: [],
      isChat: false,
      visible: false,
      selectedFields: ['name', 'age'], // 默认显示
      allFields: [
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '性别',
          key: 'gender',
        },
        {
          title: '地址',
          key: 'address',
        },
        {
          title: '邮箱',
          key: 'email',
        },
      ],
      tableData: [
        {
          id: 1,
          name: '张三',
          age: 25,
          gender: '男',
          address: '上海',
          email: 'zhang@example.com',
        },
        {
          id: 2,
          name: '李四',
          age: 30,
          gender: '女',
          address: '北京',
          email: 'li@example.com',
        },
        {
          id: 3,
          name: '王五',
          age: 22,
          gender: '男',
          address: '深圳',
          email: 'wang@example.com',
        },
      ],
      columnsData: [],
      device: {
        channels: [
          {
            channelName: '电池电压',
            channelType: '1',
          },
          {
            channelName: '水位水深',
            channelType: '2',
          },
          {
            channelName: '雨量信息',
            channelType: '3',
          },
        ],
      },
    }
  },
  methods: {
    handleColumnChange(selectedKeys) {
      // 动态构建列
      this.columnsData = selectedKeys.map(key => {
        const field = this.allFields.find(f => f.key === key)
        return {
          title: field.title,
          dataIndex: key,
          key,
        }
      })
    },
    showChat() {
      this.isChat = true
      this.$nextTick(() => {
        // 再等一个 tick，确保 chatBox 出现在 DOM 中
        setTimeout(() => {
          const modalBody = this.$el.querySelector('.ant-modal-body')
          if (modalBody) {
            modalBody.scrollTop = modalBody.scrollHeight
          }
        })
      }, 100)
    },
    showDrawer() {
      this.handleColumnChange(this.selectedFields) // ✅ 添加这一行
      this.visible = true
      this.$nextTick(() => {
        this.renderCharts()
      })
    },
    renderCharts() {
      this.selectedFields.forEach((fieldKey, index) => {
        const chartDom = this.$refs['chart' + index]
        const dom = Array.isArray(chartDom) ? chartDom[0] : chartDom
        if (!dom) return

        // 清除之前的图表实例（避免重复 init）
        echarts.dispose(dom)

        const myChart = echarts.init(dom)

        const xData = this.tableData.map(item => item.name)
        const yData = this.tableData.map(item => item[fieldKey])

        const fieldInfo = this.allFields.find(f => f.key === fieldKey)

        const option = {
          title: {
            text: fieldInfo ? fieldInfo.title : fieldKey,
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: fieldKey,
              type: 'line',
              data: yData,
            },
          ],
        }

        myChart.setOption(option)
      })
    },
    handleChange(value) {
      console.error(`selected ${value}`)
    },
  },
}
</script>

<style scoped>
.leftBox {
  width: 50%;
  height: 300px;
  background: #00a8ff;
  float: left;
}

.rightBox {
  width: 50%;
  height: 300px;
  background: pink;
  float: left;
}

.chatBox {
  width: 100%;
  height: 300px;
  background: pink;
}
</style>
