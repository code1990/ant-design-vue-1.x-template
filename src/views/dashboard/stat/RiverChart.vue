<template>
  <div style="padding:16px;">
    <!-- 顶部标题 + 下拉选择 -->
    <a-row type="flex" justify="space-between" align="middle" style="margin-bottom: 16px;">
      <a-col>
        <h3 style="margin:0;">水位监测</h3>
      </a-col>
      <a-col>
        <a-select v-model="selectedView" style="width:180px;">
          <a-select-option value="PipeSVG">管道剖面</a-select-option>
          <a-select-option value="RiverSVG">河道剖面</a-select-option>
          <a-select-option value="TrafficSVG">交通断面</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <!-- 下方左右布局 -->
    <a-row :gutter="16">
      <!-- 左侧 SVG 组件 -->
      <a-col :span="10">
        <a-card title="剖面示意" style="height: 400px;">
          <component :is="selectedView"
                     :waterLevel="waterLevel"
                     style="width:100%; height:330px;margin-top: -20px;border:none;" />
        </a-card>
      </a-col>

      <!-- 右侧 ECharts 曲线图 -->
      <a-col :span="14">
        <a-card title="最近三天水位水深曲线" style="height: 400px;">
          <div ref="levelChart" style="width: 100%; height: 350px;"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import RiverSVG from '@/views/dashboard/stat/RiverSVG.vue'
import PipeSVG from '@/views/dashboard/stat/PipeSVG.vue'
import TrafficSVG from '@/views/dashboard/stat/TrafficSVG.vue'

export default {
  components: { PipeSVG, RiverSVG, TrafficSVG },
  data() {
    return {
      selectedView: "RiverSVG", // 默认显示河道
      waterLevel: 3.5 // 当前水位（米）
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.levelChart);
      chart.setOption({
        tooltip: { trigger: "axis" },
        legend: { data: ["前天", "昨天", "今天"] },
        xAxis: { type: "category", data: ["0时","6时","12时","18时","24时"] },
        yAxis: { type: "value", name: "水位(m)" },
        series: [
          { name: "前天", type: "line", data: [3.1,3.3,3.5,3.4,3.2] },
          { name: "昨天", type: "line", data: [3.2,3.4,3.6,3.3,3.1] },
          { name: "今天", type: "line", data: [3.0,3.1,3.4,3.6,3.3] }
        ]
      });
    }
  }
};
</script>
