<template>
  <div>
    <a-checkbox-group v-model="selectedCharts" @change="updateCharts">
      <a-checkbox value="chart1">图表 1</a-checkbox>
      <a-checkbox value="chart2">图表 2</a-checkbox>
      <a-checkbox value="chart3">图表 3</a-checkbox>
    </a-checkbox-group>

    <a-checkbox-group v-model="selectedColumns" @change="updateColumns" style="margin-top: 12px;">
      <a-checkbox value="name">姓名</a-checkbox>
      <a-checkbox value="age">年龄</a-checkbox>
      <a-checkbox value="address">地址</a-checkbox>
    </a-checkbox-group>

    <div v-for="(chart, index) in chartList" :key="index" style="height: 300px; margin-top: 20px;">
      <v-chart :option="getChartOption(chart)" autoresize />
    </div>

    <a-table
      :columns="tableColumns"
      :dataSource="tableData"
      rowKey="id"
      style="margin-top: 20px;"
      bordered
    />
  </div>
</template>
