<template>
  <div class="center-map-container">
    <!-- 顶部告警条 -->
    <div class="warn-bar">
      <div class="warn-icon">⚠</div>
      <div class="warn-text">超水位预警</div>
    </div>

    <div ref="mapRef" class="map-box"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import zhejiang from '@/assets/geo/zhejiang.json'

export default {
  name: 'CenterMap',

  data() {
    return {
      chart: null,

      // 示例点位数据（你可以后端返回真实坐标）
      pointData: {
        rain: [
          {
            name: '雨量站1',
            value: [120.1, 30.2],
          },
          {
            name: '雨量站2',
            value: [120.5, 29.8],
          },
        ],
        water: [
          {
            name: '水位站1',
            value: [119.9, 29.7],
          },
          {
            name: '水位站2',
            value: [121.0, 30.0],
          },
        ],
        camera: [
          {
            name: '监控点1',
            value: [120.3, 29.5],
          },
        ],
        alert: [
          {
            name: '报警点1',
            value: [120.6, 30.1],
          },
        ],
      },
    }
  },

  mounted() {
    this.initMap()
    window.addEventListener('resize', this.resizeChart)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    this.chart && this.chart.dispose()
  },

  methods: {
    resizeChart() {
      this.chart && this.chart.resize()
    },

    initMap() {
      const chartDom = this.$refs.mapRef
      this.chart = echarts.init(chartDom)

      echarts.registerMap('zhejiang', zhejiang)

      const option = {
        backgroundColor: 'transparent',

        geo: {
          map: 'zhejiang',
          roam: true,
          zoom: 1.15,
          label: { show: false },
          itemStyle: {
            borderColor: '#50aaff',
            borderWidth: 1,
            areaColor: '#04305A',
            shadowColor: 'rgba(0, 150, 255, 0.4)',
            shadowBlur: 30,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#06508A',
            },
          },
        },

        tooltip: {
          trigger: 'item',
          formatter: p => p.data?.name || '',
        },

        legend: {
          orient: 'vertical',
          right: 10,
          bottom: 10,
          textStyle: { color: '#E6F7FF' },
          data: ['雨量站', '水位站', '摄像头', '报警点'],
        },

        series: [
          {
            name: '雨量站',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'triangle',
            symbolSize: 14,
            itemStyle: { color: '#3CB371' },
            data: this.pointData.rain,
          },
          {
            name: '水位站',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 12,
            itemStyle: { color: '#4A90E2' },
            data: this.pointData.water,
          },
          {
            name: '摄像头',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'rect',
            symbolSize: 10,
            itemStyle: { color: '#FFA500' },
            data: this.pointData.camera,
          },
          // 闪烁动画的报警点
          {
            name: '报警点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              scale: 3,
              brushType: 'stroke',
            },
            symbolSize: 14,
            itemStyle: { color: '#FF3333' },
            data: this.pointData.alert,
          },
        ],
      }

      this.chart.setOption(option)
    },
  },
}
</script>

<style scoped>
.center-map-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent;
}

/* 顶部告警条 */
.warn-bar {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 36px;
  background: linear-gradient(90deg, transparent, rgba(255, 80, 80, 0.9), transparent);
  border: 1px solid rgba(255, 120, 120, 0.9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffecec;
  font-size: 16px;
  letter-spacing: 2px;
}

.warn-icon {
  margin-right: 8px;
  font-size: 20px;
}

.map-box {
  width: 100%;
  height: 100%;
  margin-top: 40px; /* 给告警条留空间 */
}
</style>
