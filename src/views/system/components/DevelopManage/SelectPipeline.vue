<template>
  <div>
    <a-form :layout="formLayout">
      <a-form-item
        label="行政区域"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-tree-select
          v-model="value"
          style="width: 100%"
          :tree-data="treeData"
          :tree-checkable="true"
          placeholder="请选择区域"
          :show-checked-strategy="showCheckedStrategy"
          search-placeholder="请选择区域"
          @change="handleFormLayoutChange"
        />
      </a-form-item>
      <a-form-item
        label="管线类别"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver1" placeholder="请选择管线类别" style="">
          <a-select-option v-for="(river, index) in rivers1" :key="index" :value="river">
            {{ river }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="管线等级"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver2" placeholder="请选择管线等级" style="">
          <a-select-option v-for="(river, index) in rivers2" :key="index" :value="river">
            {{ river }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="管线材质"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver3" placeholder="请选择管线等级" style="">
          <a-select-option v-for="(river, index) in rivers3" :key="index" :value="river">
            {{ river }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="管线直径"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver4" placeholder="请选择管线等级" style="">
          <a-select-option v-for="(river, index) in rivers4" :key="index" :value="river">
            {{ river }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="设备类型"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <div style="float: left; margin-left: 1%; margin-top: 4px">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            全选
          </a-checkbox>
        </div>
        <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" style="width: 400px;"/>
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol" style="text-align: center">
        <a-button type="" @click="cancelAll">取消</a-button>
        <a-button type="primary" style="margin-left: 10px;">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'

export default {
  data() {
    return {
      value: ['440112'],
      size: 'default',
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      formLayout: 'vertical',
      selectedRiver1: ['污水管'],
      selectedRiver2: ['主干管'],
      selectedRiver3: ['PVC'],
      selectedRiver4: ['1500'],
      rivers1: [
        '污水管',
        '雨水管'
      ],
      rivers2: [
        '主干管',
        '枝干管'
      ],
      rivers3: [
        'PVC',
        '铸铁',
        '砖砌'
      ],
      rivers4: [
        '1500',
        '1200',
        '800'
      ],
      plainOptions: [
        '雨量站',
        '蒸发站',
        '潮位站',
        '河道水文站',
        '河道水位站',
        '水质站',
        '水库水文站',
        '水库水位站',
        '气象站',
        '墒情站',
        '堰闸水文站',
        '地下水站',
        '分洪水位站',
        '海洋监测站',
        '管网站',
        '液位站',
        '泵站',
        '视频站',
        '图像站',
        '临时站'
      ],
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      treeData: []
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          wrapperCol: {
            span: 14,
            offset: 4
          }
        }
        : {}
    }
  },
  created() {
    fetch('/city.json')
      .then(res => res.json())
      .then(data => {
        this.treeData = data
      })
      .catch(err => {
        console.error('加载 city.json 失败:', err)
      })
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    },
    handleChange(value) {
      console.log(`Selected: ${value}`)
    },
    popupScroll() {
      console.log('popupScroll')
    },
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length
      this.checkAll = checkedList.length === this.plainOptions.length
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    cancelAll() {
      this.value = []
      this.selectedRiver1 = []
      this.selectedRiver2 = []
      this.selectedRiver3 = []
      this.selectedRiver4 = []
      this.checkedList = []
    }
  }
}
</script>

<style scoped></style>
