<template>
  <a-card title="上报平台配置">
    <a-table :columns="columns" :data-source="platformList" row-key="id" bordered>
      <span slot="action" slot-scope="text, record">
        <a @click="editPlatform(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deletePlatform(record)">删除</a>
        <a-divider type="vertical" />
        <a @click="testConnection(record)">测试连接</a>
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      platformList: [
        {
          id: 1,
          name: '平台1',
          protocol: 'MQTT',
          host: '192.168.1.10:1883',
          topic: 'water/level',
          user: 'user1',
          status: '✅',
        },
        {
          id: 2,
          name: '平台2',
          protocol: 'SL651',
          host: '192.168.1.20:4000',
          topic: '-',
          user: '-',
          status: '❌',
        },
      ],
      columns: [
        {
          title: '平台名称',
          dataIndex: 'name',
        },
        {
          title: '协议类型',
          dataIndex: 'protocol',
        },
        {
          title: 'IP/Port',
          dataIndex: 'host',
        },
        {
          title: 'Topic/节点',
          dataIndex: 'topic',
        },
        {
          title: '用户名',
          dataIndex: 'user',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    editPlatform(record) {
      this.$message.info(`编辑 ${record.name}`)
    },
    deletePlatform(record) {
      this.platformList = this.platformList.filter(r => r.id !== record.id)
    },
    testConnection(record) {
      this.$message.info(`测试连接 ${record.name}`)
    },
  },
}
</script>
