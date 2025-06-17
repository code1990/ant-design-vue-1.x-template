<template>
  <div>
    <a-form :layout="formLayout">
      <a-form-item
        label="区域"
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
        label="流域"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver1" placeholder="请选择流域" style="">
          <a-select-option v-for="(river, index) in rivers1" :key="index" :value="river">
            {{ river }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="河涌"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select mode="multiple" v-model="selectedRiver2" placeholder="请选择河涌" style="">
          <a-select-option v-for="(river, index) in rivers2" :key="index" :value="river">
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
      selectedRiver1: ['珠江'],
      selectedRiver2: ['凤凰河'],
      rivers1: [
        '珠江',
        '潭江',
        '增江',
        '梅江',
        '东江',
        '武江',
        '西江',
        '漠阳江',
        '北江',
        '锦江',
        '滨江',
        '沙琅江',
        '罗定江',
        '韩江'
      ],
      rivers2: [
        '香基河',
        '天沙河',
        '江门河',
        '大燕河',
        '芦苞涌',
        '香基河',
        '佛山涌',
        '松岗河',
        '水头涌',
        '谢边涌',
        '大榄河',
        '新城涌',
        '迳口河',
        '官山涌',
        '机场涌',
        '兴顺河',
        '山背涌',
        '南柳河',
        '那龙河',
        '石榴岗河',
        '黄冈河',
        '天沐河',
        '富祥河',
        '鹤子坦支涌',
        '新街河',
        '南北大涌',
        '隔坑河',
        '秦村河',
        '黄岗河',
        '水尾河',
        '三夹河',
        '朝陽河',
        '淡水涌',
        '竇口涌',
        '联和涌',
        '聯和河',
        '草尾河',
        '汶村運河',
        '茭簕河',
        '乌涌',
        '东滘涌',
        '深井河',
        '那扶河',
        '凤凰河',
        '北亭大滘涌',
        '马坝河',
        '新开河',
        '德胜河',
        '大江罗联涌',
        '鱼窝头涌',
        '谷河',
        '东平河'
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
      this.checkedList = []
    }
  }
}
</script>

<style scoped></style>
