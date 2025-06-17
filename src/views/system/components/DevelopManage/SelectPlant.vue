<template>
  <div>
    <a-card title="区域管理" bordered>
      <a-button type="primary" icon="plus" @click="handleAdd" style="margin-bottom: 16px">
        新增区域
      </a-button>

      <a-table
        :columns="columns"
        :data-source="regionList"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      />
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'SelectPlant',
  data() {
    return {
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          width: '20%'
        },
        {
          title: '区域名称',
          dataIndex: 'name',
          key: 'name',
          width: '40%'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '40%'
        }
      ],
      regionList: [
        {
          id: 1,
          name: '天河区'
        },
        {
          id: 2,
          name: '海珠区'
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.$message.info('点击了新增区域')
    },
    handleEdit(record) {
      this.$message.info(`编辑区域：${record.name}`)
    },
    handleDelete(record) {
      this.$message.warning(`删除区域：${record.name}`)
    }
  }
}
</script>

<style scoped></style>
