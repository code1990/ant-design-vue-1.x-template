<template>
  <div class="main-layer-wrapper">
    <!-- 父 checkbox -->
    <a-checkbox v-model="checked2" class="absolute-checkbox" @change="onSewageSystemChange">
      所在污水系统
    </a-checkbox>

    <!-- 弹窗：选择污水系统值 -->
    <a-modal
      v-model:visible="sewageModalVisible"
      title="选择污水系统"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      width="500px"
    >
      <!-- 顶部搜索 -->
      <a-input
        v-model="searchKeyword"
        placeholder="搜索污水系统"
        allowClear
        @input="filterTableData"
        style="margin-bottom: 10px"
      />

      <!-- 表格 -->
      <a-table
        rowKey="value"
        :columns="columns"
        :data-source="filteredOptions"
        :row-selection="{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          onChange: onSelectChange,
        }"
        :pagination="false"
        size="small"
      />
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      checked2: false,
      sewageModalVisible: false,
      sewageOptions: [], // 原始下拉值
      filteredOptions: [], // 搜索过滤后的
      selectedKeys: [], // 用户选择的值
      searchKeyword: '',

      columns: [
        {
          title: '污水系统',
          dataIndex: 'value',
          key: 'value',
        },
      ],
    }
  },
  methods: {
    onSewageSystemChange(checked) {
      if (checked) {
        this.fetchSewageOptions()
        this.sewageModalVisible = true
      } else {
        this.selectedKeys = []
      }
    },

    async fetchSewageOptions() {
      try {
        const res = await axios.get('/api/sewage-options') // 后端返回格式: ["A系统", "B系统"]
        this.sewageOptions = res.data.map(item => ({ value: item }))
        this.filteredOptions = [...this.sewageOptions]
      } catch (e) {
        this.$message.error('获取污水系统失败')
      }
    },

    filterTableData() {
      const kw = this.searchKeyword.trim().toLowerCase()
      if (!kw) {
        this.filteredOptions = [...this.sewageOptions]
        return
      }
      this.filteredOptions = this.sewageOptions.filter(item =>
        item.value.toLowerCase().includes(kw)
      )
    },

    onSelectChange(selectedRowKeys) {
      this.selectedKeys = selectedRowKeys
    },

    handleModalOk() {
      this.sewageModalVisible = false
      this.$message.success(`已选择：${this.selectedKeys.join(', ')}`)
      // TODO: 你可以将选中值写入 Vuex、发送事件、发起查询等
    },

    handleModalCancel() {
      this.sewageModalVisible = false
      this.checked2 = false
    },
  },
}
</script>

<style scoped lang="less"></style>
