<template>
  <div class="main-box">
    <div class="map-info">
      <div class="content">
        <span style="color: #fff">&nbsp;&nbsp;PH值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color: #2db0a8">&nbsp;&nbsp;7.5&nbsp;&nbsp;</span>
        <span style="color: #d0612c">&nbsp;↑&nbsp;</span>
        <span style="color: #d0612c">&nbsp;0.2&nbsp;</span>
      </div>
      <div class="content">
        <span style="color: #fff">&nbsp;&nbsp;氨氮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color: #2db0a8">&nbsp;&nbsp;0.8&nbsp;&nbsp;</span>
        <span style="color: #079ea9">&nbsp;↓&nbsp;</span>
        <span style="color: #079ea9">&nbsp;0.2&nbsp;</span>
      </div>
      <div class="content">
        <span style="color: #fff">&nbsp;&nbsp;电导率&nbsp;&nbsp;</span>
        <span style="color: #2db0a8">&nbsp;&nbsp;123&nbsp;&nbsp;</span>
        <span style="color: #d0612c">&nbsp;↑&nbsp;</span>
        <span style="color: #d0612c">&nbsp;3&nbsp;</span>
      </div>
      <div class="content">
        <span style="color: #fff">&nbsp;&nbsp;溶解氧&nbsp;&nbsp;</span>
        <span style="color: #2db0a8">&nbsp;&nbsp;7.5&nbsp;&nbsp;</span>
        <span style="color: #d0612c">&nbsp;↑&nbsp;</span>
        <span style="color: #d0612c">&nbsp;0.2&nbsp;</span>
      </div>
    </div>
    <div class="map-bottom">
      <div class="tip-info">
        <div class="title">
          <div class="tip1">
            <div class="tip2"></div>
          </div>
          <div class="tip3">
            {{ title1 }}
          </div>
        </div>
        <div class="video-info">
          <div class="left-video"></div>
          <div class="right-video"></div>
          <div class="video-text">发现建筑垃圾3处</div>
          <div class="video-text">发现建筑垃圾3处</div>
        </div>
      </div>
      <div class="tip-info">
        <div class="title">
          <div class="tip1">
            <div class="tip2"></div>
          </div>
          <div class="tip3">
            {{ title2 }}
          </div>
        </div>
        <div ref="chart" class="chart"></div>
        <div class="chart-right">
          <div
            style="
              color: white;
              font-size: 12px;
              background-color: #0a677f;
              margin-bottom: 5px;
              text-align: left;
            "
          >
            &nbsp;疑似污染处&nbsp;
            <span style="color: #30bfb4; font-size: 14px; font-weight: bold">4</span>
            处
          </div>
          <div
            style="
              color: white;
              font-size: 12px;
              background-color: #0a677f;
              margin-bottom: 5px;
              text-align: left;
            "
          >
            &nbsp;水体告誉&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="color: #30bfb4; font-size: 14px; font-weight: bold">4</span>
            处
          </div>
          <div
            style="
              color: white;
              font-size: 12px;
              background-color: #0a677f;
              margin-bottom: 5px;
              text-align: left;
            "
          >
            &nbsp;PH值过高&nbsp;&nbsp;&nbsp;
            <span style="color: #30bfb4; font-size: 14px; font-weight: bold">4</span>
            处
          </div>
        </div>
      </div>
      <div class="tip-info">
        <div class="title">
          <div class="tip1">
            <div class="tip2"></div>
          </div>
          <div class="tip3">
            {{ title3 }}
          </div>
        </div>
        <div ref="wqRadar" class="wq-radar"></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TipCenter',
  data() {
    return {
      title1: '河岸监控',
      title2: '河水监测总数据分支统计',
      title3: '水体健康度雷达图',
      // 业务数据
      items: [
        {
          name: '垃圾倾倒率',
          value: 20,
        },
        {
          name: '堤坝破坏',
          value: 17,
        },
        {
          name: '非法排污',
          value: 18,
        },
        {
          name: '植被破坏',
          value: 45,
        },
      ],
      // 可调样式
      gapWidth: 6, // 扇区之间的“缝隙”宽度
      innerRadiusPct: 50, // 内半径（%）
      outerRadiusPct: 78, // 外半径（%）
      bgColor: '#ffffff', // 作为缝隙颜色（需与容器背景一致）
      centerFill: '#ffffff', // 中心圆颜色
      centerText: '污水来源',
      chart: null,
      radarChart: null,
      // —— 业务数据（示例，可改为父组件传入 props）——
      // 指标含 name 与 max（雷达图需要 max 做刻度归一）
      wqIndicators: [
        {
          name: '溶解氧',
          max: 14,
        }, // mg/L
        {
          name: '电导体',
          max: 2000,
        }, // μS/cm  （如需改成“电导率”，直接改 name）
        {
          name: '氨氮',
          max: 10,
        }, // mg/L
        {
          name: 'PH值',
          max: 14,
        }, // pH 0-14
        {
          name: '浊度',
          max: 100,
        }, // NTU
      ],
      // 两条对比曲线：当前值 vs 参考/历史值（可只保留一条）
      wqSeriesData: [
        {
          name: '当前值',
          value: [7.8, 450, 0.6, 7.2, 15],
        },
        {
          name: '历史均值',
          value: [6.5, 600, 0.8, 7.0, 20],
        },
      ],
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize)
    this.initWqRadar()
    window.addEventListener('resize', this.resizeWqRadar)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) this.chart.dispose()
    window.removeEventListener('resize', this.resizeWqRadar)
    if (this.radarChart) this.radarChart.dispose()
  },
  methods: {
    initChart() {
      if (this.chart) this.chart.dispose()
      this.chart = echarts.init(this.$refs.chart)

      const data = this.items.map(d => ({
        name: d.name,
        value: d.value,
      }))

      const option = {
        backgroundColor: this.bgColor,
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%',
        },
        // 中心圆 + 文本（初始用占位，后面 resize 会精确计算像素半径）
        graphic: [
          {
            type: 'circle',
            left: 'center',
            top: 'middle',
            shape: { r: 40 }, // 会被 handleResize 替换为自适应像素
            style: {
              fill: this.centerFill,
              shadowBlur: 0,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: this.centerText,
              textAlign: 'center',
              textVerticalAlign: 'middle',
              fontSize: 16,
              fontWeight: '600',
              fill: '#fff',
            },
          },
        ],
        series: [
          // 1) 内圈：真正的环图（内部显示百分比）
          {
            name: 'inner-donut',
            type: 'pie',
            radius: [`${this.innerRadiusPct}%`, `${this.outerRadiusPct}%`],
            center: ['50%', '50%'],
            data,
            clockwise: true,
            avoidLabelOverlap: true,
            labelLine: { show: false },
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%',
              fontWeight: 'bold',
              fontSize: 12,
            },
            itemStyle: {
              // 用“边框=背景色”制造扇区间隙
              borderColor: this.bgColor,
              borderWidth: this.gapWidth,
            },
            emphasis: {
              scale: true,
              scaleSize: 4,
            },
          },
          // 2) 外圈：仅用于“外部文字”标签（扇区透明不占视觉）
          {
            name: 'outer-labels',
            type: 'pie',
            radius: [`${this.outerRadiusPct + 2}%`, `${this.outerRadiusPct + 3}%`],
            center: ['50%', '50%'],
            data,
            z: 2,
            silent: true, // 不响应交互
            itemStyle: {
              color: 'transparent',
              borderColor: 'transparent',
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}',
              fontSize: 14,
            },
            labelLine: {
              show: true,
              length: 12,
              length2: 10,
              smooth: 0.2,
            },
          },
        ],
      }

      this.chart.setOption(option)
      this.handleResize()
    },
    handleResize() {
      if (!this.chart) return
      this.chart.resize()

      // 依据容器宽高，按“内半径百分比”的 0.85 倍设置中心圆半径（像素）
      const dom = this.$refs.chart
      const w = dom.clientWidth || 0
      const h = dom.clientHeight || 0
      const minHalf = Math.min(w, h) / 2
      const rInnerPx = minHalf * (this.innerRadiusPct / 100)
      const centerR = Math.max(20, Math.floor(rInnerPx * 0.85))

      this.chart.setOption({
        graphic: [
          {
            id: 'center-circle',
            type: 'circle',
            left: 'center',
            top: 'middle',
            shape: { r: centerR },
            style: { fill: this.centerFill },
          },
          {
            id: 'center-text',
            type: 'text',
            left: 'center',
            top: 'middle',
            style: { text: this.centerText },
          },
        ],
      })
    },
    initWqRadar() {
      if (this.radarChart) this.radarChart.dispose()
      this.radarChart = echarts.init(this.$refs.wqRadar)

      const option = {
        backgroundColor: '#0f172a', // 深色背景，白字更清晰
        title: {
          text: '',
          left: 'center',
          top: 8,
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
          },
        },
        tooltip: {
          trigger: 'item',
          // 自定义提示：逐个维度列出数值/占比
          formatter: params => {
            const vals = params.value
            const inds = this.wqIndicators
            const lines = vals.map((v, i) => `${inds[i].name}：${v} / Max ${inds[i].max}`)
            return `${params.seriesName || params.name || ''}<br/>` + lines.join('<br/>')
          },
        },
        legend: {
          top: 36,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          textStyle: { fontSize: 12 },
          data: this.wqSeriesData.map(s => s.name),
        },
        radar: [
          {
            shape: 'polygon',
            center: ['50%', '58%'],
            radius: '68%',
            startAngle: 90,
            name: {
              // 维度文字（环状外部）
              formatter: n => n,
              textStyle: {
                color: '#fff',
                fontSize: 12,
                fontWeight: 500,
              },
            },
            splitNumber: 5,
            indicator: this.wqIndicators,
            splitLine: {
              lineStyle: { opacity: 0.6 },
            },
            splitArea: {
              show: true,
              areaStyle: {
                // 交替色带，便于对比
                color: ['#f7f9fc', '#edf2f7', '#f7f9fc', '#edf2f7', '#f7f9fc'],
                opacity: 1,
              },
            },
            axisLine: { lineStyle: { opacity: 0.5 } },
          },
        ],
        series: [
          // 一条条雷达数据序列
          {
            name: '水质雷达',
            type: 'radar',
            symbol: 'circle',
            symbolSize: 4,
            emphasis: { focus: 'series' },
            // 使用多数据项，分别对应图例
            data: this.wqSeriesData.map((s, idx) => ({
              value: s.value,
              name: s.name,
              areaStyle: { opacity: idx === 0 ? 0.28 : 0.15 },
              lineStyle: { width: 2 },
              // 给不同序列一点点色彩区分（不手动指定颜色也可以用全局 palette）
              itemStyle: {},
            })),
          },
        ],
      }

      this.radarChart.setOption(option)
    },
    resizeWqRadar() {
      if (this.radarChart) this.radarChart.resize()
    },

    // —— 可选：对外暴露的更新方法（父组件传入新数据时调用）——
    updateRadar(indicators, seriesData) {
      if (indicators) this.wqIndicators = indicators
      if (seriesData) this.wqSeriesData = seriesData
      this.initWqRadar()
    },
  },
}
</script>

<style scoped lang="less">
.main-box {
  width: 100%;
  height: 100%;
  //display: flex;
  //flex-direction: column;
  //background-color: #1D374B;
}

.content {
  flex: 1;
  width: 120px;
  height: 30px;
  border: 1px solid #63b5ba;
  font-size: 12px;
  text-align: left;
  line-height: 30px;
  background-color: #1d374b;
  margin-bottom: 10px;
}

.map-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #132b38;
  width: 50%;
  height: 160px;
}

.tip1 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #97e8e5;
  float: left;
  margin: 5px 5px;
}

.tip2 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 2px;
  margin-left: 2px;
  background-color: #36cfc7;
}

.title {
  width: 100%;
  color: white;
  padding: 5px 5px;
  border-bottom: 1px solid #0b5e75;
  float: left;
}

.tip-info {
  width: 33%;
  height: 100%;
  float: left;
}

.chart {
  width: 60%;
  height: 100px; /* 需要更大可自行调整或用父元素撑开 */
  float: left;
}

.wq-radar {
  width: 100%;
  height: 100px; /* 需要更高可自行调整或由父容器撑开 */
  float: left;
}

.video-info {
  width: 100%;
  height: 150px;
}

.left-video {
  width: 40%;
  background-image: url('~@/assets/v1.png');
  margin: 10px;
  height: 80px;
  float: left;
}

.right-video {
  width: 40%;
  background-image: url('~@/assets/v2.png');
  margin: 10px;
  height: 80px;
  float: left;
}

.video-text {
  width: 40%;
  color: white;
  float: left;
  text-align: center;
  font-size: 12px;
  margin: 0 10px;
}

.chart-right {
  width: 40%;
  float: left;
  text-align: right;
  padding: 5px;
}
</style>
