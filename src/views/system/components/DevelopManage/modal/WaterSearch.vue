<template>
  <a-modal v-model="visible" title="管线查询" width="900px" @cancel="handleCancel">
    <!-- 查询表单 -->
    <a-form layout="inline">
      <!-- 第1行 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="图层名称">
            <a-input v-model="form.layerName" placeholder="请输入图层名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="管网子类">
            <a-input v-model="form.pipeSubType" placeholder="请输入管网子类" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第2行 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="查询字段">
            <a-input v-model="form.queryField" placeholder="请输入查询字段" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="关键字">
            <a-input v-model="form.keyword" placeholder="请输入关键字" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第3行：左单选 + 右多选 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="查询范围">
            <a-radio-group v-model="form.range">
              <a-radio value="all">全图</a-radio>
              <a-radio value="current">当前范围</a-radio>
              <a-radio value="custom">指定范围</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="查询选项">
            <a-checkbox-group v-model="form.options" :options="checkboxOptions" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 第4行：按钮 -->
      <a-row type="flex" justify="start" :gutter="16">
        <a-col>
          <a-button type="primary" icon="search" @click="handleSearch">查询</a-button>
        </a-col>
        <a-col>
          <a-button icon="download" @click="handleExport">导出</a-button>
        </a-col>
      </a-row>

      <!-- 第5行：分割线 -->
      <a-divider />

      <!-- 表格 + 分页 -->
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        row-key="id"
        bordered
      >
        <template #emptyText>暂无数据</template>
      </a-table>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        layerName: '',
        pipeSubType: '',
        queryField: '',
        keyword: '',
        range: 'all',
        options: [],
      },
      checkboxOptions: [
        {
          label: '模糊匹配',
          value: 'fuzzy',
        },
        {
          label: '空间位置',
          value: 'spatial',
        },
      ],
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`,
        onChange: page => this.fetchData(page),
      },
      columns: [
        {
          title: '图上点号',
          dataIndex: 'pointNumber',
          key: 'pointNumber',
        },
        {
          title: '管线子类型',
          dataIndex: 'pipeSubType',
          key: 'pipeSubType',
        },
        {
          title: '特征',
          dataIndex: 'feature',
          key: 'feature',
        },
        {
          title: '附属物',
          dataIndex: 'attachment',
          key: 'attachment',
        },
        {
          title: '道路名称',
          dataIndex: 'roadName',
          key: 'roadName',
        },
        {
          title: '地面高程',
          dataIndex: 'elevation',
          key: 'elevation',
        },
      ],
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleSearch() {
      // 模拟查询逻辑
      this.pagination.total = 2
      this.tableData = [
        {
          id: 1,
          pointNumber: 'P001',
          pipeSubType: '污水管',
          feature: '主干',
          attachment: '检查井',
          roadName: '人民路',
          elevation: '25.3',
        },
        {
          id: 2,
          pointNumber: 'P002',
          pipeSubType: '雨水管',
          feature: '支管',
          attachment: '阀门',
          roadName: '解放路',
          elevation: '24.8',
        },
      ]
    },
    handleExport() {
      this.$message.success('导出成功（模拟）')
    },
    fetchData(page) {
      this.pagination.current = page
      this.handleSearch()
    },
  },
}
</script>

<style scoped></style>
