<template>
  <div class="right-panel">

    <!-- 1. 雨情监测统计 -->
    <a-card class="panel-card" :body-style="{ padding: '10px' }" :bordered="false">
      <div class="panel-title">雨情监测统计</div>

      <!-- 顶部数字 -->
      <div class="top-numbers">
        <div class="num-item">
          <div class="num-value">6893</div>
          <div class="num-label">当前接入站点数</div>
        </div>
        <div class="num-item">
          <div class="num-value">295</div>
          <div class="num-label">昨日降雨站点数</div>
        </div>
        <div class="num-item">
          <div class="num-value">16.3 mm</div>
          <div class="num-label">当前平均雨量</div>
        </div>
      </div>

      <div ref="rainLine" class="chart-box"></div>
    </a-card>


    <!-- 2. 当前最大降雨量站点 -->
    <a-card class="panel-card" :body-style="{ padding: '10px' }" :bordered="false">
      <div class="panel-title">当前最大降雨量站点</div>

      <div ref="rainPie" class="chart-box"></div>

      <div class="legend-list">
        <div class="legend-item">1-15mm：123个</div>
        <div class="legend-item">16-50mm：96个</div>
        <div class="legend-item">51-100mm：43个</div>
        <div class="legend-item">100mm以上：21个</div>
      </div>
    </a-card>


    <!-- 3. 水情监测统计 -->
    <a-card class="panel-card" :body-style="{ padding: '10px' }" :bordered="false">
      <div class="panel-title">水情监测统计</div>

      <div class="top-numbers">
        <div class="num-item">
          <div class="num-value">19005</div>
          <div class="num-label">当前接入站点数</div>
        </div>
        <div class="num-item">
          <div class="num-value">302</div>
          <div class="num-label">超报警水位站点</div>
        </div>
        <div class="num-item">
          <div class="num-value">5</div>
          <div class="num-label">超保证水位站点</div>
        </div>
      </div>

      <div ref="waterLine" class="chart-box"></div>
    </a-card>


    <!-- 4. 站点分析统计（右下角彩色地图） -->
    <a-card class="panel-card" :body-style="{ padding: '10px' }" :bordered="false">
      <div class="panel-title">站点分析统计</div>

      <div ref="miniMap" class="chart-box-small"></div>

      <div class="legend-percent">
        <div>蓝：46%</div>
        <div>绿：32%</div>
        <div>紫：12%</div>
        <div>干旱：10%</div>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RightPanel",

  data() {
    return {
      charts: []
    };
  },

  mounted() {
    this.drawRainLine();
    this.drawRainPie();
    this.drawWaterLine();
    this.drawMiniMap();

    window.addEventListener("resize", this.resizeCharts);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCharts);
    this.charts.forEach(c => c && c.dispose());
  },

  methods: {
    resizeCharts() {
      this.charts.forEach(c => c && c.resize());
    },

    // 1. 雨情折线图
    drawRainLine() {
      const chart = echarts.init(this.$refs.rainLine);
      this.charts.push(chart);

      chart.setOption({
        tooltip: { trigger: "axis" },
        grid: { left: 40, right: 20, top: 30, bottom: 25 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          axisLabel: { color: "#A0CFF9" }
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#A0CFF9" },
          splitLine: { lineStyle: { color: "rgba(120,160,200,0.3)" } }
        },
        series: [
          {
            type: "line",
            data: Array.from({ length: 24 }, () => Math.floor(20 + Math.random() * 10)),
            smooth: true,
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.15 }
          }
        ]
      });
    },

    // 2. 当前最大降雨量站点 - 饼图
    drawRainPie() {
      const chart = echarts.init(this.$refs.rainPie);
      this.charts.push(chart);

      chart.setOption({
        tooltip: { trigger: "item" },
        series: [
          {
            type: "pie",
            radius: ["40%", "65%"],
            label: { color: "#E6F7FF" },
            data: [
              { name: "1-15mm", value: 123 },
              { name: "16-50mm", value: 96 },
              { name: "51-100mm", value: 43 },
              { name: "100mm以上", value: 21 }
            ]
          }
        ]
      });
    },

    // 3. 水情折线图
    drawWaterLine() {
      const chart = echarts.init(this.$refs.waterLine);
      this.charts.push(chart);

      chart.setOption({
        tooltip: { trigger: "axis" },
        grid: { left: 40, right: 20, top: 30, bottom: 25 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          axisLabel: { color: "#A0CFF9" }
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#A0CFF9" },
          splitLine: { lineStyle: { color: "rgba(120,160,200,0.3)" } }
        },
        series: [
          {
            type: "line",
            smooth: true,
            data: Array.from({ length: 24 }, () => Math.floor(10 + Math.random() * 20)),
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.15 }
          }
        ]
      });
    },

    // 4. 右下角小地图（用扇形代替）
    drawMiniMap() {
      const chart = echarts.init(this.$refs.miniMap);
      this.charts.push(chart);

      chart.setOption({
        series: [
          {
            type: "pie",
            radius: ["45%", "75%"],
            label: { show: false },
            data: [
              { value: 46, name: "蓝" },
              { value: 32, name: "绿" },
              { value: 12, name: "紫" },
              { value: 10, name: "干旱" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.right-panel {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.panel-card {
  margin-bottom: 10px;
  background: rgba(6, 30, 60, 0.85);
  border-radius: 10px;
  color: #fff;
}

.panel-title {
  color: #E6F7FF;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 6px;
}

/* 顶部三块数字 */
.top-numbers {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.num-item {
  text-align: center;
}
.num-value {
  font-size: 20px;
  font-weight: bold;
  color: #40E9FF;
}
.num-label {
  font-size: 12px;
  color: #A0CFF9;
}

/* 图表区 */
.chart-box {
  width: 100%;
  height: 220px;
}
.chart-box-small {
  width: 100%;
  height: 180px;
}

/* 饼图右侧图例 */
.legend-list {
  margin-top: 6px;
  font-size: 12px;
  color: #A0CFF9;
}
.legend-item {
  margin-bottom: 2px;
}

.legend-percent {
  margin-top: 8px;
  font-size: 12px;
  color: #A0CFF9;
}
</style>
