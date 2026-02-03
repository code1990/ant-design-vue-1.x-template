<template>
  <div id="chart" style="width: 500px; height: 500px;"></div>
</template>

<script>
import * as echarts from 'echarts'

// 颜色变亮
function lighten(color, amount) {
  return echarts.color.modifyHSL(color, 0, 0, amount * 100)
}
// 颜色变暗
function darken(color, amount) {
  return echarts.color.modifyHSL(color, 0, 0, -amount * 100)
}

// 构造一块 3D 扇形（上表面 + 侧面）
function get3DSector(outerR, innerR, startAngle, endAngle, height, color) {
  return {
    type: 'group',
    children: [
      // 上表面
      {
        type: 'sector',
        shape: {
          cx: 0,
          cy: -height, // 往上抬一点，模拟高度
          r: outerR,
          r0: innerR,
          startAngle,
          endAngle,
        },
        style: {
          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: lighten(color, 0.3) },
            { offset: 1, color: color },
          ]),
        },
      },
      // 侧面（底部）
      {
        type: 'sector',
        shape: {
          cx: 0,
          cy: 0,
          r: outerR,
          r0: innerR,
          startAngle,
          endAngle,
        },
        style: {
          fill: darken(color, 0.4),
        },
      },
    ],
  }
}

export default {
  name: 'index',
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.chart && this.chart.resize()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))

      // 数据：三个纵向“瓦片”，按 value 控制高度
      const data = [
        { name: 'A', value: 45, color: '#ff6b6b' },
        { name: 'B', value: 30, color: '#4ecdc4' },
        { name: 'C', value: 20, color: '#45b7d1' },
        // 如果你就想要三块，D 可以删掉
        // { name: 'D', value: 10, color: '#f7fff7' },
      ]

      const total = data.reduce((sum, item) => sum + item.value, 0)

      const outerR = 140 // 外半径
      const innerR = 80  // 内半径（控制中间挖空大小）
      const heightScale = 1.2 // 控制高度整体比例

      const option = {
        animation: true,
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter(params) {
            const d = params.data && params.data._raw
            return d ? `${d.name}: ${d.value}` : ''
          },
        },
        series: [
          {
            type: 'custom',
            coordinateSystem: null, // 使用绝对坐标
            renderItem: (params, api) => {
              const centerX = api.getWidth() / 2
              const centerY = api.getHeight() / 2 + 40 // 往下偏一点
              let startAngle = -Math.PI / 2 // 从正上方开始

              const children = []

              data.forEach((item) => {
                const angle = (item.value / total) * Math.PI * 2
                const endAngle = startAngle + angle
                const height = item.value * heightScale

                const sector = get3DSector(
                  outerR,
                  innerR,
                  startAngle,
                  endAngle,
                  height,
                  item.color
                )

                // 给 tooltip 用的数据
                sector.info = item

                children.push(sector)
                startAngle = endAngle
              })

              return {
                type: 'group',
                x: centerX,
                y: centerY,
                children,
              }
            },
            data: data.map((d) => ({ _raw: d })), // 给 tooltip 用
          },
        ],
      }

      this.chart.setOption(option)
    },
  },
}
</script>

<style scoped lang="less"></style>
