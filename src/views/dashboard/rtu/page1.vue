<template>
  <a-card title="采集配置">
    <a-table :columns="columns" :data-source="sensorList" row-key="id" bordered>
      <span slot="action" slot-scope="text, record">
        <a @click="editSensor(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="testSensor(record)">测试</a>
      </span>
    </a-table>

    <a-modal v-model="editModalVisible" title="编辑采集配置" @ok="saveSensor">
      <a-form :form="form">
        <a-form-item label="传感器名称">
          <a-input v-decorator="['name', { initialValue: editRecord.name }]" />
        </a-form-item>
        <a-form-item label="RS485端口">
          <a-select v-decorator="['port', { initialValue: editRecord.port }]">
            <a-select-option value="COM1">COM1</a-select-option>
            <a-select-option value="COM2">COM2</a-select-option>
            <a-select-option value="COM3">COM3</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="采集频率(秒)">
          <a-input-number v-decorator="['freq', { initialValue: editRecord.freq }]" :min="1" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      sensorList: [
        {
          id: 1,
          name: 'S1',
          port: 'COM1',
          freq: 10,
        },
        {
          id: 2,
          name: 'S2',
          port: 'COM2',
          freq: 10,
        },
      ],
      columns: [
        {
          title: '传感器名称',
          dataIndex: 'name',
        },
        {
          title: 'RS485端口',
          dataIndex: 'port',
        },
        {
          title: '采集频率(秒)',
          dataIndex: 'freq',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      editModalVisible: false,
      editRecord: {},
    }
  },
  methods: {
    editSensor(record) {
      this.editRecord = { ...record }
      this.editModalVisible = true
    },
    testSensor(record) {
      this.$message.info(`发送采集测试指令给 ${record.name}`)
    },
    saveSensor() {
      const index = this.sensorList.findIndex(s => s.id === this.editRecord.id)
      if (index >= 0) this.sensorList.splice(index, 1, this.editRecord)
      this.editModalVisible = false
      this.$message.success('保存成功')
    },
  },
}
</script>
