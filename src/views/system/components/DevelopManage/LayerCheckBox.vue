<template>
  <div>
    <!-- 触发按钮 -->
    <a-button @click="visible = true">选择图层</a-button>

    <!-- 模拟下拉选择框 -->
    <a-modal
      v-model="visible"
      :mask="false"
      title="选择图层"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleConfirm"
      @cancel="handleCancel"
      wrapClassName="custom-left-modal"
    >
      <a-checkbox-group v-model="selectedValues" style="display: flex; flex-direction: column">
        <a-checkbox value="1">河湖水系图层</a-checkbox>
        <a-checkbox value="2">雨水管线图层</a-checkbox>
        <a-checkbox value="3">污水管线图层</a-checkbox>
      </a-checkbox-group>
    </a-modal>

    <!-- 展示结果 -->
    <div style="margin-top: 12px">已选择：{{ displayText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      selectedValues: [],
      displayText: '',
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    handleConfirm() {
      this.displayText = this.selectedValues.join(', ')
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
<style scoped>
::v-deep .custom-left-modal {
  display: flex;
  justify-content: flex-start;
}

::v-deep .custom-left-modal .ant-modal {
  top: 20px;
  left: 20px;
  margin: 0;
}
</style>
