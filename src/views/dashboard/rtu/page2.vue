<template>
  <a-card title="自动化规则配置">
    <a-table :columns="columns" :data-source="ruleList" row-key="id" bordered>
      <span slot="action" slot-scope="text, record">
        <a @click="editRule(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteRule(record)">删除</a>
      </span>
    </a-table>

    <a-modal v-model="editModalVisible" title="编辑规则" @ok="saveRule">
      <a-form :form="form">
        <a-form-item label="规则名称">
          <a-input v-decorator="['name', { initialValue: editRecord.name }]" />
        </a-form-item>
        <a-form-item label="水位范围">
          <a-input
            v-decorator="['range', { initialValue: editRecord.range }]"
            placeholder="0.05~0.07"
          />
        </a-form-item>
        <a-form-item label="触发条件">
          <a-select v-decorator="['condition', { initialValue: editRecord.condition }]">
            <a-select-option value="lt">小于</a-select-option>
            <a-select-option value="gt">大于</a-select-option>
            <a-select-option value="range">范围</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="执行动作类型">
          <a-select v-decorator="['actionType', { initialValue: editRecord.actionType }]">
            <a-select-option value="relay">继电器控制</a-select-option>
            <a-select-option value="led">LED显示</a-select-option>
            <a-select-option value="report">数据上报</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="动作参数">
          <a-input v-decorator="['actionParam', { initialValue: editRecord.actionParam }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      ruleList: [
        {
          id: 1,
          name: '低水位报警',
          range: '<0.05',
          condition: 'lt',
          actionType: 'relay',
          actionParam: '继电器1开',
        },
        {
          id: 2,
          name: '中水位',
          range: '0.05~0.07',
          condition: 'range',
          actionType: 'led',
          actionParam: '注意水位',
        },
      ],
      columns: [
        {
          title: '规则名称',
          dataIndex: 'name',
        },
        {
          title: '数据范围',
          dataIndex: 'range',
        },
        {
          title: '触发条件',
          dataIndex: 'condition',
        },
        {
          title: '动作参数',
          dataIndex: 'actionType',
        },
        {
          title: '动作描述',
          dataIndex: 'actionParam',
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
    editRule(record) {
      this.editRecord = { ...record }
      this.editModalVisible = true
    },
    deleteRule(record) {
      this.ruleList = this.ruleList.filter(r => r.id !== record.id)
    },
    saveRule() {
      const index = this.ruleList.findIndex(r => r.id === this.editRecord.id)
      if (index >= 0) this.ruleList.splice(index, 1, this.editRecord)
      this.editModalVisible = false
      this.$message.success('保存成功')
    },
  },
}
</script>
