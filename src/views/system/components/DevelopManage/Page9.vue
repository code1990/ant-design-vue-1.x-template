<template>
  <div>
    <a-button type="primary" @click="modalVisible = true">打开管网弹窗</a-button>

    <a-modal
      v-model="modalVisible"
      title="管网管理"
      width="800px"
      @cancel="handleCancel"
      :footer="null"
    >
      <!-- 切换按钮 -->
      <div style="margin-bottom: 16px;">
        <a-button
          type="primary"
          :ghost="currentTab !== 'sewage'"
          @click="switchTab('sewage')"
          style="margin-right: 8px"
        >
          污水管网
        </a-button>
        <a-button
          type="primary"
          :ghost="currentTab !== 'rainwater'"
          @click="switchTab('rainwater')"
        >
          雨水管网
        </a-button>
      </div>

      <!-- 过滤输入 -->
      <a-input
        v-model="filterText"
        placeholder="请输入关键词过滤"
        allowClear
        style="margin-bottom: 16px"
      />

      <!-- 表格 -->
      <a-table
        :columns="columnsWithSelection"
        :dataSource="filteredData"
        rowKey="id"
        :pagination="{ pageSize: 5 }"
        :rowSelection="rowSelection"
      />

      <!-- 你可以根据需要加个批量操作按钮 -->
      <div style="margin-top: 12px;">
        <a-button type="danger" :disabled="selectedRowKeys.length === 0" @click="handleDeleteSelected">
          删除选中项
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      currentTab: 'sewage',
      filterText: '',
      selectedRowKeys: [], // 存储已选中行id
      columns: [
        { title: '管网名称', dataIndex: 'name', key: 'name' },
        { title: '管道长度(m)', dataIndex: 'length', key: 'length' },
      ],
      sewageData: [
        { id: 1, name: '污水管1', length: 120 },
        { id: 2, name: '污水管2', length: 150 },
        { id: 3, name: '污水管3', length: 80 },
      ],
      rainwaterData: [
        { id: 11, name: '雨水管1', length: 100 },
        { id: 12, name: '雨水管2', length: 130 },
      ],
    };
  },
  computed: {
    filteredData() {
      let data = this.currentTab === 'sewage' ? this.sewageData : this.rainwaterData;
      if (!this.filterText) return data;
      const keyword = this.filterText.toLowerCase();
      return data.filter(item => item.name.toLowerCase().includes(keyword));
    },
    columnsWithSelection() {
      // 原columns前面加复选框列
      return this.columns;
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedKeys) => {
          this.selectedRowKeys = selectedKeys;
        },
        // 可选：全选时控制部分选中状态
        // onSelectAll: (selected, selectedRows, changeRows) => { ... }
      };
    },
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
      this.filterText = '';
      this.selectedRowKeys = []; // 切换时清空选中
    },
    handleCancel() {
      this.modalVisible = false;
      this.filterText = '';
      this.currentTab = 'sewage';
      this.selectedRowKeys = [];
    },
    handleDeleteSelected() {
      // 删除选中的项（只是示范，实际需要接口或数据变更）
      const dataList = this.currentTab === 'sewage' ? this.sewageData : this.rainwaterData;
      const newData = dataList.filter(item => !this.selectedRowKeys.includes(item.id));
      if (this.currentTab === 'sewage') {
        this.sewageData = newData;
      } else {
        this.rainwaterData = newData;
      }
      this.selectedRowKeys = [];
    },
  },
};
</script>
