<template>
  <div>
    <!-- 打开按钮 -->
    <a-button type="primary" @click="openModal" style="margin-bottom: 10px;">添加管线</a-button>

    <a-modal
      title="添加管线"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :destroyOnClose="true"
      width="800px"
    >
      <a-form :form="form">
        <a-row :gutter="16">
          <!-- 管线编号 -->
          <a-col :span="12">
            <a-form-item label="管线编号" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input
                v-decorator="[
                  'pipeCode',
                  { rules: [{ required: true, message: '请输入管线编号' }] },
                ]"
                placeholder="请输入管线编号"
              />
            </a-form-item>
          </a-col>

          <!-- 管线名称 -->
          <a-col :span="12">
            <a-form-item label="管线名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input
                v-decorator="[
                  'pipeName',
                  { rules: [{ required: true, message: '请输入管线名称' }] },
                ]"
                placeholder="请输入管线名称"
              />
            </a-form-item>
          </a-col>

          <!-- 管线类别 -->
          <a-col :span="12">
            <a-form-item label="管线类别" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-select v-decorator="['pipeType']" placeholder="请选择管线类别">
                <a-select-option value="给水">给水</a-select-option>
                <a-select-option value="排水">排水</a-select-option>
                <a-select-option value="燃气">燃气</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- 所属分区 -->
          <a-col :span="12">
            <a-form-item label="所属分区" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-select v-decorator="['region']" placeholder="请选择所属分区">
                <a-select-option value="区域1">区域1</a-select-option>
                <a-select-option value="区域2">区域2</a-select-option>
                <a-select-option value="区域3">区域3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- 起点管井 -->
          <a-col :span="12">
            <a-form-item label="起点管井" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['startWell']" placeholder="请输入起点管井编号/名称" />
            </a-form-item>
          </a-col>

          <!-- 终点管井 -->
          <a-col :span="12">
            <a-form-item label="终点管井" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['endWell']" placeholder="请输入终点管井编号/名称" />
            </a-form-item>
          </a-col>

          <!-- 管径 -->
          <a-col :span="12">
            <a-form-item label="管径" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['diameter']" placeholder="请输入管径 (mm)" />
            </a-form-item>
          </a-col>

          <!-- 材质 -->
          <a-col :span="12">
            <a-form-item label="材质" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['material']" placeholder="请输入管材质" />
            </a-form-item>
          </a-col>

          <!-- 年份 -->
          <a-col :span="12">
            <a-form-item label="建设年份" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['year']" placeholder="请输入建设年份" />
            </a-form-item>
          </a-col>

          <!-- 长度 -->
          <a-col :span="12">
            <a-form-item label="长度(m)" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['length']" placeholder="请输入管线长度" />
            </a-form-item>
          </a-col>
        </a-row>
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
      visible: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    openModal() {
      this.visible = true
      this.form.resetFields()
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
