<template>
  <div>
    <!-- 打开按钮 -->
    <a-button type="primary" @click="openModal" style="margin-bottom: 10px;">添加阀门</a-button>

    <!-- 弹窗表单 -->
    <a-modal
      title="添加闸门"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :destroyOnClose="true"
    >
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <!-- 阀门编号 -->
        <a-form-item label="阀门编号">
          <a-input v-decorator="['valveCode']" placeholder="请输入阀门编号" />
        </a-form-item>

        <!-- 阀门名称（必填） -->
        <a-form-item label="阀门名称">
          <a-input
            v-decorator="[
              'valveName',
              { rules: [{ required: true, message: '阀门名称不能为空' }] },
            ]"
            placeholder="请输入阀门名称"
          />
        </a-form-item>

        <!-- 阀门类别 -->
        <a-form-item label="阀门类别">
          <a-select v-decorator="['valveType']" placeholder="请选择阀门类别">
            <a-select-option value="类别1">类别1</a-select-option>
            <a-select-option value="类别2">类别2</a-select-option>
            <a-select-option value="类别3">类别3</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 所属管线（必填） -->
        <a-form-item label="所属管线">
          <a-select
            v-decorator="['pipeline', { rules: [{ required: true, message: '所属管线不能为空' }] }]"
            placeholder="请选择管线"
          >
            <a-select-option value="管线1">管线1</a-select-option>
            <a-select-option value="管线2">管线2</a-select-option>
            <a-select-option value="管线3">管线3</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 安装时间 -->
        <a-form-item label="安装时间">
          <a-date-picker
            v-decorator="['installDate']"
            placeholder="请选择安装日期"
            format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>

        <!-- 位置描述 -->
        <a-form-item label="位置描述">
          <a-input v-decorator="['locationDesc']" placeholder="请输入位置描述" />
        </a-form-item>

        <!-- 阀门描述 -->
        <a-form-item label="阀门描述">
          <a-textarea
            v-decorator="['valveDesc', { rules: [{ max: 200, message: '最多输入200字' }] }]"
            placeholder="请输入阀门描述（最多200字）"
            :rows="3"
          />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <div style="text-align: center;">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleOk" style="margin-left: 16px;">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false, // 初始不显示
      form: this.$form.createForm(this),
    }
  },
  methods: {
    openModal() {
      this.visible = true
      this.form.resetFields() // 打开前清空
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交数据:', values)
          this.visible = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
