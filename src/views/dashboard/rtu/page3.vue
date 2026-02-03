<template>
  <a-card title="下位机控制配置">
    <a-table :columns="columns" :data-source="deviceList" row-key="id" bordered>
      <span slot="action" slot-scope="text, record">
        <a @click="manualControl(record)">手动控制</a>
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      deviceList: [
        {
          id: 1,
          type: '继电器',
          name: 'R1',
          interface: 'COM1-1',
          status: '关闭',
          boundRule: '低水位报警',
        },
        {
          id: 2,
          type: 'LED屏',
          name: 'L1',
          interface: 'COM2',
          status: '空白',
          boundRule: '中水位显示',
        },
      ],
      columns: [
        {
          title: '设备类型',
          dataIndex: 'type',
        },
        {
          title: '设备名称',
          dataIndex: 'name',
        },
        {
          title: '接口号/ID',
          dataIndex: 'interface',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '触发规则绑定',
          dataIndex: 'boundRule',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    manualControl(record) {
      this.$message.info(`发送手动控制指令到 ${record.name}`)
    },
  },
}
</script>
