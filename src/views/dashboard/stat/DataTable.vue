<template>
  <div style="width: 450px; overflow-x: auto;">
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" rowKey="id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 动态水质指标（可从接口获取）
      qualityList: ['水质1', '水质2'],
      // 动态日期组
      dayList: ['前天', '昨天', '今天'],

      // 表格列定义
      columns: [],

      // 示例数据
      data: [
        {
          id: 1,
          date: '2022-10-10 1:01',
          前天: {
            水质1: 1.1,
            水质2: '',
          },
          昨天: {
            水质1: '',
            水质2: '',
          },
          今天: {
            水质1: '',
            水质2: '',
          },
        },
        {
          id: 2,
          date: '2022-10-10 1:01',
          前天: {
            水质1: 2.3,
            水质2: '',
          },
          昨天: {
            水质1: '',
            水质2: '',
          },
          今天: {
            水质1: '',
            水质2: '',
          },
        },
        {
          id: 3,
          date: '2022-10-10 1:01',
          前天: {
            水质1: 3.3,
            水质2: '',
          },
          昨天: {
            水质1: '',
            水质2: '',
          },
          今天: {
            水质1: '',
            水质2: '',
          },
        },
      ],
    }
  },
  created() {
    // 构建表头
    this.columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      ...this.dayList.map(day => ({
        title: day,
        children: this.qualityList.map(q => ({
          title: q,
          key: `${day}-${q}`,
          customRender: (text, record) => record[day]?.[q] ?? '',
        })),
      })),
    ]
  },
}
</script>
