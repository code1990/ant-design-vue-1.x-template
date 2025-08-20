<template>
  <div>
    <!-- 打开按钮 -->
    <a-button type="primary" @click="openModal" style="margin-bottom: 10px">添加管井</a-button>

    <a-modal
      title="添加管井"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :destroyOnClose="true"
      width="800px"
    >
      <a-form :form="form">
        <a-row :gutter="16">
          <!-- 管井编号 -->
          <a-col :span="12">
            <a-form-item label="管井编号" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['wellCode']" placeholder="请输入管井编号" />
            </a-form-item>
          </a-col>

          <!-- 管井名称 -->
          <a-col :span="12">
            <a-form-item label="管井名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['wellName']" placeholder="请输入管井名称" />
            </a-form-item>
          </a-col>

          <!-- 管井附屋物 -->
          <a-col :span="12">
            <a-form-item label="管井附屋物" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['wellBuilding']" placeholder="请输入管井附屋物" />
            </a-form-item>
          </a-col>

          <!-- 管井底标高 -->
          <a-col :span="12">
            <a-form-item label="管井底标高" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['wellElevation']" placeholder="请输入管井底标高" />
            </a-form-item>
          </a-col>

          <!-- 所在路名 -->
          <a-col :span="12">
            <a-form-item label="所在路名" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['roadName']" placeholder="请输入所在路名" />
            </a-form-item>
          </a-col>

          <!-- 管井埋深 -->
          <a-col :span="12">
            <a-form-item label="管井埋深" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['depth']" placeholder="请输入管井埋深" />
            </a-form-item>
          </a-col>

          <!-- 年份 -->
          <a-col :span="12">
            <a-form-item label="年份" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['year']" placeholder="请输入年份" />
            </a-form-item>
          </a-col>

          <!-- 材质 -->
          <a-col :span="12">
            <a-form-item label="材质" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['material']" placeholder="请输入材质" />
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

          <!-- 管井性质 -->
          <a-col :span="12">
            <a-form-item label="管井性质" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['property']" placeholder="请输入管井性质" />
            </a-form-item>
          </a-col>

          <!-- 经度 -->
          <a-col :span="12">
            <a-form-item label="经度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['longitude']" placeholder="请输入经度" />
            </a-form-item>
          </a-col>

          <!-- 纬度 -->
          <a-col :span="12">
            <a-form-item label="纬度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
              <a-input v-decorator="['latitude']" placeholder="请输入纬度" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <template slot="footer">
        <div style="text-align: center">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleOk" style="margin-left: 16px">确定</a-button>
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
