<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      bordered
      row-key="id"
      style="overflow-x: auto"
    />
  </div>
</template>

<script>
export default {
  name: "PipelineDeviceTable",
  data() {
    return {
      // 固定列头
      columns: [
        { title: "管网名称", dataIndex: "name", width: 150 },
        { title: "长度(km)", dataIndex: "length", width: 100 },
        { title: "起点坐标", dataIndex: "start", width: 120 },
        { title: "终点坐标", dataIndex: "end", width: 120 },
        { title: "测试类型1", dataIndex: "type1", width: 180 },
        { title: "测试类型2", dataIndex: "type2", width: 180 },
        { title: "测试类型3", dataIndex: "type3", width: 180 },
        { title: "测试类型4", dataIndex: "type4", width: 180 },
        { title: "测试类型5", dataIndex: "type5", width: 180 },
        { title: "监测种类", dataIndex: "monitorTypes", width: 180 },
        { title: "安装时间", dataIndex: "installDate", width: 120 },
        { title: "上报时间", dataIndex: "reportTime", width: 160 },
        { title: "当前运行", dataIndex: "status", width: 100 },
        { title: "告警次数", dataIndex: "alarmCount", width: 100 },
        { title: "上月上报率", dataIndex: "reportRate", width: 120 }
      ],

      // 原始数据（后端返回）
      rawData: [
        {
          id: 1,
          name: "XXX排水管",
          length: "12.560",
          start: "1112/0.111",
          end: "1234/1252",
          devices: [
            { label: "雨量站", count: 10 },
            { label: "河道水位站", count: 5 },
            { label: "水质站", count: 2 }
          ],
          monitorTypes: "COD, NH3, TP",
          installDate: "2023-01-10",
          reportTime: "2025-09-02 14:30",
          status: "正常",
          alarmCount: 2,
          reportRate: "98%"
        },
        {
          id: 2,
          name: "YYY管道",
          length: "8.320",
          start: "2222/0.222",
          end: "3333/0.333",
          devices: [
            { label: "视频站", count: 1 },
            { label: "液位站", count: 3 }
          ],
          monitorTypes: "水位",
          installDate: "2024-03-15",
          reportTime: "2025-09-02 12:20",
          status: "异常",
          alarmCount: 5,
          reportRate: "90%"
        }
      ]
    };
  },
  computed: {
    // 转换数据：把 devices 填到 type1~type5
    tableData() {
      return this.rawData.map(row => {
        const result = { ...row };
        row.devices.slice(0, 5).forEach((dev, i) => {
          result[`type${i + 1}`] = `${dev.label}（${dev.count}台）`;
        });
        return result;
      });
    }
  }
};
</script>
