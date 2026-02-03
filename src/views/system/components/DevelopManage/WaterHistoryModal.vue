<!--<template>-->
<!--  <a-modal-->
<!--    v-model="visible"-->
<!--    title="历史数据分析"-->
<!--    width="80%"-->
<!--    :footer="null"-->
<!--    @afterVisibleChange="onAfterVisibleChange"-->
<!--  >-->
<!--    <div class="modal-content">-->
<!--      &lt;!&ndash; 上：历史过程 &ndash;&gt;-->
<!--      <div class="top-section">-->
<!--        <h3>历史过程</h3>-->
<!--        <div ref="chart" style="width: 100%; height: 300px"></div>-->
<!--      </div>-->

<!--      &lt;!&ndash; 下：统计详情 &ndash;&gt;-->
<!--      <div class="bottom-section">-->
<!--        <h3>统计详情</h3>-->
<!--        <a-row :gutter="16" type="flex" class="grid-section">-->
<!--          <a-col v-for="(item, index) in gridData" :key="index" :span="8" class="grid-item">-->
<!--            <div class="cell">{{ item.label }}：{{ item.value }}</div>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-modal>-->
<!--</template>-->

<!--<script>-->
<!--import * as echarts from 'echarts'-->
<!--import 'echarts-liquidfill/src/liquidFill.js'-->
<!--import { install as LiquidFillChart } from 'echarts-liquidfill'-->
<!--// 注册 LiquidFill 插件-->
<!--echarts.use(LiquidFillChart)-->
<!--export default {-->
<!--  name: 'HistoryModal',-->
<!--  data() {-->
<!--    return {-->
<!--      visible: false,-->
<!--      chartInstance: null,-->
<!--      waterData: null,-->
<!--      gridData: [-->
<!--        {-->
<!--          label: '参数1',-->
<!--          value: '123',-->
<!--        },-->
<!--        {-->
<!--          label: '参数2',-->
<!--          value: '456',-->
<!--        },-->
<!--        {-->
<!--          label: '参数3',-->
<!--          value: '789',-->
<!--        },-->
<!--        {-->
<!--          label: '参数4',-->
<!--          value: '101',-->
<!--        },-->
<!--        {-->
<!--          label: '参数5',-->
<!--          value: '112',-->
<!--        },-->
<!--        {-->
<!--          label: '参数6',-->
<!--          value: '131',-->
<!--        },-->
<!--        {-->
<!--          label: '参数7',-->
<!--          value: '415',-->
<!--        },-->
<!--        {-->
<!--          label: '参数8',-->
<!--          value: '161',-->
<!--        },-->
<!--        {-->
<!--          label: '参数9',-->
<!--          value: '718',-->
<!--        },-->
<!--        {-->
<!--          label: '参数10',-->
<!--          value: '192',-->
<!--        },-->
<!--        {-->
<!--          label: '参数11',-->
<!--          value: '212',-->
<!--        },-->
<!--        {-->
<!--          label: '参数12',-->
<!--          value: '223',-->
<!--        },-->
<!--      ],-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    visible(val) {-->
<!--      if (val) {-->
<!--        this.$nextTick(() => {-->
<!--          setTimeout(() => {-->
<!--            const chartDom = this.$refs.chart-->
<!--            if (chartDom && chartDom.offsetHeight > 0) {-->
<!--              this.initChart()-->
<!--            }-->
<!--          }, 300)-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    onAfterVisibleChange(val) {-->
<!--      if (val) {-->
<!--        this.$nextTick(() => {-->
<!--          // 等 modal 动画真正展开完再执行（动画约 300ms）-->
<!--          setTimeout(() => {-->
<!--            this.initChart()-->
<!--          }, 300)-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    open() {-->
<!--      this.visible = true-->
<!--    },-->
<!--    initChart() {-->
<!--      const dataStr =-->
<!--        '[{"recordTime":"2025-07-25 00:00","channelCorrValue":"50.64"},{"recordTime":"2025-07-25 00:05","channelCorrValue":"65.61"},{"recordTime":"2025-07-25 00:10","channelCorrValue":"73.33"},{"recordTime":"2025-07-25 00:15","channelCorrValue":"59.45"},{"recordTime":"2025-07-25 00:20","channelCorrValue":"32.89"},{"recordTime":"2025-07-25 00:25","channelCorrValue":"47.35"},{"recordTime":"2025-07-25 00:30","channelCorrValue":"29.94"},{"recordTime":"2025-07-25 00:35","channelCorrValue":"61.82"},{"recordTime":"2025-07-25 00:40","channelCorrValue":"42.26"},{"recordTime":"2025-07-25 00:45","channelCorrValue":"50.06"},{"recordTime":"2025-07-25 00:50","channelCorrValue":"51.14"},{"recordTime":"2025-07-25 00:55","channelCorrValue":"39.19"},{"recordTime":"2025-07-25 01:00","channelCorrValue":"58.68"},{"recordTime":"2025-07-25 01:05","channelCorrValue":"43.16"},{"recordTime":"2025-07-25 01:10","channelCorrValue":"39.94"},{"recordTime":"2025-07-25 01:15","channelCorrValue":"51.55"},{"recordTime":"2025-07-25 01:20","channelCorrValue":"42.31"},{"recordTime":"2025-07-25 01:25","channelCorrValue":"64.10"},{"recordTime":"2025-07-25 01:30","channelCorrValue":"52.28"},{"recordTime":"2025-07-25 01:35","channelCorrValue":"27.70"},{"recordTime":"2025-07-25 01:40","channelCorrValue":"37.89"},{"recordTime":"2025-07-25 01:45","channelCorrValue":"43.05"},{"recordTime":"2025-07-25 01:50","channelCorrValue":"55.42"},{"recordTime":"2025-07-25 01:55","channelCorrValue":"52.72"},{"recordTime":"2025-07-25 02:00","channelCorrValue":"59.38"},{"recordTime":"2025-07-25 02:05","channelCorrValue":"57.29"},{"recordTime":"2025-07-25 02:10","channelCorrValue":"53.86"},{"recordTime":"2025-07-25 02:15","channelCorrValue":"42.80"},{"recordTime":"2025-07-25 02:20","channelCorrValue":"49.98"},{"recordTime":"2025-07-25 02:25","channelCorrValue":"44.35"},{"recordTime":"2025-07-25 02:30","channelCorrValue":"38.19"},{"recordTime":"2025-07-25 02:35","channelCorrValue":"54.16"},{"recordTime":"2025-07-25 02:40","channelCorrValue":"45.05"},{"recordTime":"2025-07-25 02:45","channelCorrValue":"46.18"},{"recordTime":"2025-07-25 02:50","channelCorrValue":"46.37"},{"recordTime":"2025-07-25 02:55","channelCorrValue":"43.57"},{"recordTime":"2025-07-25 03:00","channelCorrValue":"54.43"},{"recordTime":"2025-07-25 03:05","channelCorrValue":"60.40"},{"recordTime":"2025-07-25 03:10","channelCorrValue":"49.30"},{"recordTime":"2025-07-25 03:15","channelCorrValue":"59.09"},{"recordTime":"2025-07-25 03:20","channelCorrValue":"55.81"},{"recordTime":"2025-07-25 03:25","channelCorrValue":"60.48"},{"recordTime":"2025-07-25 03:30","channelCorrValue":"40.87"},{"recordTime":"2025-07-25 03:35","channelCorrValue":"47.23"},{"recordTime":"2025-07-25 03:40","channelCorrValue":"48.81"},{"recordTime":"2025-07-25 03:45","channelCorrValue":"50.37"},{"recordTime":"2025-07-25 03:50","channelCorrValue":"59.68"},{"recordTime":"2025-07-25 03:55","channelCorrValue":"49.25"},{"recordTime":"2025-07-25 04:00","channelCorrValue":"82.83"},{"recordTime":"2025-07-25 04:05","channelCorrValue":"39.12"},{"recordTime":"2025-07-25 04:10","channelCorrValue":"61.92"},{"recordTime":"2025-07-25 04:15","channelCorrValue":"67.19"},{"recordTime":"2025-07-25 04:20","channelCorrValue":"61.13"},{"recordTime":"2025-07-25 04:25","channelCorrValue":"69.69"},{"recordTime":"2025-07-25 04:30","channelCorrValue":"46.75"},{"recordTime":"2025-07-25 04:35","channelCorrValue":"52.33"},{"recordTime":"2025-07-25 04:40","channelCorrValue":"53.24"},{"recordTime":"2025-07-25 04:45","channelCorrValue":"42.52"},{"recordTime":"2025-07-25 04:50","channelCorrValue":"37.99"},{"recordTime":"2025-07-25 04:55","channelCorrValue":"73.07"},{"recordTime":"2025-07-25 05:00","channelCorrValue":"71.52"},{"recordTime":"2025-07-25 05:05","channelCorrValue":"79.42"},{"recordTime":"2025-07-25 05:10","channelCorrValue":"56.07"},{"recordTime":"2025-07-25 05:15","channelCorrValue":"37.94"},{"recordTime":"2025-07-25 05:20","channelCorrValue":"47.79"},{"recordTime":"2025-07-25 05:25","channelCorrValue":"59.07"},{"recordTime":"2025-07-25 05:30","channelCorrValue":"52.30"},{"recordTime":"2025-07-25 05:35","channelCorrValue":"58.30"},{"recordTime":"2025-07-25 05:40","channelCorrValue":"42.65"},{"recordTime":"2025-07-25 05:45","channelCorrValue":"55.74"},{"recordTime":"2025-07-25 05:50","channelCorrValue":"46.93"},{"recordTime":"2025-07-25 05:55","channelCorrValue":"48.34"},{"recordTime":"2025-07-25 06:00","channelCorrValue":"65.82"},{"recordTime":"2025-07-25 06:05","channelCorrValue":"41.42"},{"recordTime":"2025-07-25 06:10","channelCorrValue":"40.36"},{"recordTime":"2025-07-25 06:15","channelCorrValue":"53.79"},{"recordTime":"2025-07-25 06:20","channelCorrValue":"46.73"},{"recordTime":"2025-07-25 06:25","channelCorrValue":"45.44"},{"recordTime":"2025-07-25 06:30","channelCorrValue":"45.57"},{"recordTime":"2025-07-25 06:35","channelCorrValue":"20.06"},{"recordTime":"2025-07-25 06:40","channelCorrValue":"39.60"},{"recordTime":"2025-07-25 06:45","channelCorrValue":"55.58"},{"recordTime":"2025-07-25 06:50","channelCorrValue":"42.84"},{"recordTime":"2025-07-25 06:55","channelCorrValue":"43.06"},{"recordTime":"2025-07-25 07:00","channelCorrValue":"43.21"},{"recordTime":"2025-07-25 07:05","channelCorrValue":"61.01"},{"recordTime":"2025-07-25 07:10","channelCorrValue":"43.80"},{"recordTime":"2025-07-25 07:15","channelCorrValue":"53.66"},{"recordTime":"2025-07-25 07:20","channelCorrValue":"44.55"},{"recordTime":"2025-07-25 07:25","channelCorrValue":"31.90"},{"recordTime":"2025-07-25 07:30","channelCorrValue":"45.28"},{"recordTime":"2025-07-25 07:35","channelCorrValue":"28.17"},{"recordTime":"2025-07-25 07:40","channelCorrValue":"48.90"},{"recordTime":"2025-07-25 07:45","channelCorrValue":"39.14"},{"recordTime":"2025-07-25 07:50","channelCorrValue":"40.90"},{"recordTime":"2025-07-25 07:55","channelCorrValue":"42.08"},{"recordTime":"2025-07-25 08:00","channelCorrValue":"74.17"},{"recordTime":"2025-07-25 08:05","channelCorrValue":"54.91"},{"recordTime":"2025-07-25 08:10","channelCorrValue":"36.79"},{"recordTime":"2025-07-25 08:15","channelCorrValue":"48.77"},{"recordTime":"2025-07-25 08:20","channelCorrValue":"52.29"},{"recordTime":"2025-07-25 08:25","channelCorrValue":"44.55"},{"recordTime":"2025-07-25 08:30","channelCorrValue":"23.97"},{"recordTime":"2025-07-25 08:35","channelCorrValue":"55.23"},{"recordTime":"2025-07-25 08:40","channelCorrValue":"29.58"},{"recordTime":"2025-07-25 08:45","channelCorrValue":"78.49"},{"recordTime":"2025-07-25 08:50","channelCorrValue":"50.28"},{"recordTime":"2025-07-25 08:55","channelCorrValue":"52.26"},{"recordTime":"2025-07-25 09:00","channelCorrValue":"48.97"},{"recordTime":"2025-07-25 09:05","channelCorrValue":"60.18"},{"recordTime":"2025-07-25 09:10","channelCorrValue":"75.57"},{"recordTime":"2025-07-25 09:15","channelCorrValue":"51.46"},{"recordTime":"2025-07-25 09:20","channelCorrValue":"51.43"},{"recordTime":"2025-07-25 09:25","channelCorrValue":"47.25"},{"recordTime":"2025-07-25 09:30","channelCorrValue":"38.57"},{"recordTime":"2025-07-25 09:35","channelCorrValue":"40.80"},{"recordTime":"2025-07-25 09:40","channelCorrValue":"57.48"},{"recordTime":"2025-07-25 09:45","channelCorrValue":"66.24"},{"recordTime":"2025-07-25 09:50","channelCorrValue":"51.03"},{"recordTime":"2025-07-25 09:55","channelCorrValue":"48.77"},{"recordTime":"2025-07-25 10:00","channelCorrValue":"38.58"},{"recordTime":"2025-07-25 10:05","channelCorrValue":"49.04"},{"recordTime":"2025-07-25 10:10","channelCorrValue":"41.61"},{"recordTime":"2025-07-25 10:15","channelCorrValue":"60.72"},{"recordTime":"2025-07-25 10:20","channelCorrValue":"38.44"},{"recordTime":"2025-07-25 10:25","channelCorrValue":"49.70"},{"recordTime":"2025-07-25 10:30","channelCorrValue":"42.13"},{"recordTime":"2025-07-25 10:35","channelCorrValue":"55.98"},{"recordTime":"2025-07-25 10:40","channelCorrValue":"51.90"},{"recordTime":"2025-07-25 10:45","channelCorrValue":"50.91"},{"recordTime":"2025-07-25 10:50","channelCorrValue":"68.72"},{"recordTime":"2025-07-25 10:55","channelCorrValue":"44.86"},{"recordTime":"2025-07-25 11:00","channelCorrValue":"53.57"},{"recordTime":"2025-07-25 11:05","channelCorrValue":"56.98"},{"recordTime":"2025-07-25 11:10","channelCorrValue":"51.96"},{"recordTime":"2025-07-25 11:15","channelCorrValue":"77.75"},{"recordTime":"2025-07-25 11:20","channelCorrValue":"56.67"},{"recordTime":"2025-07-25 11:25","channelCorrValue":"57.09"},{"recordTime":"2025-07-25 11:30","channelCorrValue":"36.05"},{"recordTime":"2025-07-25 11:35","channelCorrValue":"47.77"},{"recordTime":"2025-07-25 11:40","channelCorrValue":"48.20"},{"recordTime":"2025-07-25 11:45","channelCorrValue":"44.97"},{"recordTime":"2025-07-25 11:50","channelCorrValue":"50.64"},{"recordTime":"2025-07-25 11:55","channelCorrValue":"63.08"},{"recordTime":"2025-07-25 12:00","channelCorrValue":"55.10"},{"recordTime":"2025-07-25 12:05","channelCorrValue":"58.78"},{"recordTime":"2025-07-25 12:10","channelCorrValue":"54.66"},{"recordTime":"2025-07-25 12:15","channelCorrValue":"49.46"},{"recordTime":"2025-07-25 12:20","channelCorrValue":"49.25"},{"recordTime":"2025-07-25 12:25","channelCorrValue":"56.90"},{"recordTime":"2025-07-25 12:30","channelCorrValue":"47.13"},{"recordTime":"2025-07-25 12:35","channelCorrValue":"35.53"},{"recordTime":"2025-07-25 12:40","channelCorrValue":"54.59"},{"recordTime":"2025-07-25 12:45","channelCorrValue":"34.05"},{"recordTime":"2025-07-25 12:50","channelCorrValue":"57.62"},{"recordTime":"2025-07-25 12:55","channelCorrValue":"47.59"},{"recordTime":"2025-07-25 13:00","channelCorrValue":"49.58"},{"recordTime":"2025-07-25 13:05","channelCorrValue":"42.06"},{"recordTime":"2025-07-25 13:10","channelCorrValue":"70.37"},{"recordTime":"2025-07-25 13:15","channelCorrValue":"60.98"},{"recordTime":"2025-07-25 13:20","channelCorrValue":"40.12"},{"recordTime":"2025-07-25 13:25","channelCorrValue":"75.52"},{"recordTime":"2025-07-25 13:30","channelCorrValue":"50.58"},{"recordTime":"2025-07-25 13:35","channelCorrValue":"64.54"},{"recordTime":"2025-07-25 13:40","channelCorrValue":"40.01"},{"recordTime":"2025-07-25 13:45","channelCorrValue":"44.39"},{"recordTime":"2025-07-25 13:50","channelCorrValue":"44.15"},{"recordTime":"2025-07-25 13:55","channelCorrValue":"36.69"},{"recordTime":"2025-07-25 14:00","channelCorrValue":"51.71"},{"recordTime":"2025-07-25 14:05","channelCorrValue":"45.80"},{"recordTime":"2025-07-25 14:10","channelCorrValue":"53.03"},{"recordTime":"2025-07-25 14:15","channelCorrValue":"67.02"},{"recordTime":"2025-07-25 14:20","channelCorrValue":"42.27"},{"recordTime":"2025-07-25 14:25","channelCorrValue":"51.12"},{"recordTime":"2025-07-25 14:30","channelCorrValue":"44.34"},{"recordTime":"2025-07-25 14:35","channelCorrValue":"37.94"},{"recordTime":"2025-07-25 14:40","channelCorrValue":"45.52"},{"recordTime":"2025-07-25 14:45","channelCorrValue":"39.88"},{"recordTime":"2025-07-25 14:50","channelCorrValue":"37.75"},{"recordTime":"2025-07-25 14:55","channelCorrValue":"52.61"},{"recordTime":"2025-07-25 15:00","channelCorrValue":"42.51"},{"recordTime":"2025-07-25 15:05","channelCorrValue":"42.22"},{"recordTime":"2025-07-25 15:10","channelCorrValue":"41.60"},{"recordTime":"2025-07-25 15:15","channelCorrValue":"35.28"},{"recordTime":"2025-07-25 15:20","channelCorrValue":"42.73"},{"recordTime":"2025-07-25 15:25","channelCorrValue":"45.13"},{"recordTime":"2025-07-25 15:30","channelCorrValue":"51.60"},{"recordTime":"2025-07-25 15:35","channelCorrValue":"58.53"},{"recordTime":"2025-07-25 15:40","channelCorrValue":"73.71"},{"recordTime":"2025-07-25 15:45","channelCorrValue":"56.68"},{"recordTime":"2025-07-25 15:50","channelCorrValue":"56.68"},{"recordTime":"2025-07-25 15:55","channelCorrValue":"51.84"},{"recordTime":"2025-07-25 16:00","channelCorrValue":"52.56"},{"recordTime":"2025-07-25 16:05","channelCorrValue":"43.48"},{"recordTime":"2025-07-25 16:10","channelCorrValue":"25.51"},{"recordTime":"2025-07-25 16:15","channelCorrValue":"47.72"},{"recordTime":"2025-07-25 16:20","channelCorrValue":"51.20"},{"recordTime":"2025-07-25 16:25","channelCorrValue":"39.63"},{"recordTime":"2025-07-25 16:30","channelCorrValue":"62.17"},{"recordTime":"2025-07-25 16:35","channelCorrValue":"31.45"},{"recordTime":"2025-07-25 16:40","channelCorrValue":"48.18"},{"recordTime":"2025-07-25 16:45","channelCorrValue":"57.17"},{"recordTime":"2025-07-25 16:50","channelCorrValue":"53.87"},{"recordTime":"2025-07-25 16:55","channelCorrValue":"39.76"},{"recordTime":"2025-07-25 17:00","channelCorrValue":"40.67"},{"recordTime":"2025-07-25 17:05","channelCorrValue":"46.49"},{"recordTime":"2025-07-25 17:10","channelCorrValue":"41.03"},{"recordTime":"2025-07-25 17:15","channelCorrValue":"36.02"},{"recordTime":"2025-07-25 17:20","channelCorrValue":"49.17"},{"recordTime":"2025-07-25 17:25","channelCorrValue":"38.67"},{"recordTime":"2025-07-25 17:30","channelCorrValue":"45.82"},{"recordTime":"2025-07-25 17:35","channelCorrValue":"41.37"},{"recordTime":"2025-07-25 17:40","channelCorrValue":"43.51"},{"recordTime":"2025-07-25 17:45","channelCorrValue":"35.62"},{"recordTime":"2025-07-25 17:50","channelCorrValue":"43.23"},{"recordTime":"2025-07-25 17:55","channelCorrValue":"47.74"},{"recordTime":"2025-07-25 18:00","channelCorrValue":"66.19"},{"recordTime":"2025-07-25 18:05","channelCorrValue":"58.26"},{"recordTime":"2025-07-25 18:10","channelCorrValue":"48.29"},{"recordTime":"2025-07-25 18:15","channelCorrValue":"32.70"},{"recordTime":"2025-07-25 18:20","channelCorrValue":"43.42"},{"recordTime":"2025-07-25 18:25","channelCorrValue":"70.27"},{"recordTime":"2025-07-25 18:30","channelCorrValue":"44.45"},{"recordTime":"2025-07-25 18:35","channelCorrValue":"37.03"},{"recordTime":"2025-07-25 18:40","channelCorrValue":"48.13"},{"recordTime":"2025-07-25 18:45","channelCorrValue":"53.35"},{"recordTime":"2025-07-25 18:50","channelCorrValue":"78.25"},{"recordTime":"2025-07-25 18:55","channelCorrValue":"58.10"},{"recordTime":"2025-07-25 19:00","channelCorrValue":"52.43"},{"recordTime":"2025-07-25 19:05","channelCorrValue":"49.77"},{"recordTime":"2025-07-25 19:10","channelCorrValue":"51.24"},{"recordTime":"2025-07-25 19:15","channelCorrValue":"52.14"},{"recordTime":"2025-07-25 19:20","channelCorrValue":"51.10"},{"recordTime":"2025-07-25 19:25","channelCorrValue":"55.38"},{"recordTime":"2025-07-25 19:30","channelCorrValue":"46.78"},{"recordTime":"2025-07-25 19:35","channelCorrValue":"41.25"},{"recordTime":"2025-07-25 19:40","channelCorrValue":"43.07"},{"recordTime":"2025-07-25 19:45","channelCorrValue":"53.25"},{"recordTime":"2025-07-25 19:50","channelCorrValue":"61.82"},{"recordTime":"2025-07-25 19:55","channelCorrValue":"55.60"},{"recordTime":"2025-07-25 20:00","channelCorrValue":"46.49"},{"recordTime":"2025-07-25 20:05","channelCorrValue":"55.01"},{"recordTime":"2025-07-25 20:10","channelCorrValue":"58.69"},{"recordTime":"2025-07-25 20:15","channelCorrValue":"47.34"},{"recordTime":"2025-07-25 20:20","channelCorrValue":"57.94"},{"recordTime":"2025-07-25 20:25","channelCorrValue":"55.00"},{"recordTime":"2025-07-25 20:30","channelCorrValue":"56.50"},{"recordTime":"2025-07-25 20:35","channelCorrValue":"38.97"},{"recordTime":"2025-07-25 20:40","channelCorrValue":"72.68"},{"recordTime":"2025-07-25 20:45","channelCorrValue":"35.58"},{"recordTime":"2025-07-25 20:50","channelCorrValue":"49.04"},{"recordTime":"2025-07-25 20:55","channelCorrValue":"40.42"},{"recordTime":"2025-07-25 21:00","channelCorrValue":"35.24"},{"recordTime":"2025-07-25 21:05","channelCorrValue":"23.70"},{"recordTime":"2025-07-25 21:10","channelCorrValue":"35.80"},{"recordTime":"2025-07-25 21:15","channelCorrValue":"35.73"},{"recordTime":"2025-07-25 21:20","channelCorrValue":"57.90"},{"recordTime":"2025-07-25 21:25","channelCorrValue":"60.21"},{"recordTime":"2025-07-25 21:30","channelCorrValue":"29.92"},{"recordTime":"2025-07-25 21:35","channelCorrValue":"54.55"},{"recordTime":"2025-07-25 21:40","channelCorrValue":"54.80"},{"recordTime":"2025-07-25 21:45","channelCorrValue":"37.12"},{"recordTime":"2025-07-25 21:50","channelCorrValue":"45.20"},{"recordTime":"2025-07-25 21:55","channelCorrValue":"42.26"},{"recordTime":"2025-07-25 22:00","channelCorrValue":"67.24"},{"recordTime":"2025-07-25 22:05","channelCorrValue":"53.71"},{"recordTime":"2025-07-25 22:10","channelCorrValue":"39.44"},{"recordTime":"2025-07-25 22:15","channelCorrValue":"54.37"},{"recordTime":"2025-07-25 22:20","channelCorrValue":"65.94"},{"recordTime":"2025-07-25 22:25","channelCorrValue":"58.50"},{"recordTime":"2025-07-25 22:30","channelCorrValue":"55.05"},{"recordTime":"2025-07-25 22:35","channelCorrValue":"34.19"},{"recordTime":"2025-07-25 22:40","channelCorrValue":"49.69"},{"recordTime":"2025-07-25 22:45","channelCorrValue":"46.03"},{"recordTime":"2025-07-25 22:50","channelCorrValue":"53.36"},{"recordTime":"2025-07-25 22:55","channelCorrValue":"55.72"},{"recordTime":"2025-07-25 23:00","channelCorrValue":"41.98"},{"recordTime":"2025-07-25 23:05","channelCorrValue":"43.00"},{"recordTime":"2025-07-25 23:10","channelCorrValue":"57.88"},{"recordTime":"2025-07-25 23:15","channelCorrValue":"42.04"},{"recordTime":"2025-07-25 23:20","channelCorrValue":"69.00"},{"recordTime":"2025-07-25 23:25","channelCorrValue":"41.70"},{"recordTime":"2025-07-25 23:30","channelCorrValue":"47.07"},{"recordTime":"2025-07-25 23:35","channelCorrValue":"57.43"},{"recordTime":"2025-07-25 23:40","channelCorrValue":"53.42"},{"recordTime":"2025-07-25 23:45","channelCorrValue":"54.52"},{"recordTime":"2025-07-25 23:50","channelCorrValue":"43.99"},{"recordTime":"2025-07-25 23:55","channelCorrValue":"38.90"}]'-->
<!--      this.waterData = JSON.parse(dataStr)-->
<!--      const chartDom = this.$refs.chart-->
<!--      if (!chartDom || chartDom.offsetHeight === 0) return-->

<!--      if (this.chartInstance) {-->
<!--        this.chartInstance.dispose()-->
<!--      }-->

<!--      this.chartInstance = echarts.init(chartDom, 'macarons')-->
<!--      this.chartInstance.setOption(this.init3DOption(this.waterData))-->

<!--      // 正确绑定 resize 事件-->
<!--      window.addEventListener('resize', this.handleResize)-->
<!--    },-->
<!--    handleResize() {-->
<!--      if (this.chartInstance) {-->
<!--        this.chartInstance.resize()-->
<!--      }-->
<!--    },-->
<!--    init3DOption(dataList) {-->
<!--      const xData = []-->
<!--      const yData1 = []-->
<!--      const yData2 = []-->
<!--      const yData3 = []-->
<!--      const qd = new Date(new Date().setDate(new Date().getDate() - 2)).getDate()-->
<!--      const zd = new Date(new Date().setDate(new Date().getDate() - 1)).getDate()-->
<!--      const jd = new Date().getDate()-->
<!--      const dataJO = {}-->
<!--      for (const c in dataList) {-->
<!--        const data = dataList[c]-->
<!--        const time = new Date(data.recordTime)-->
<!--        dataJO[time.getDate() + '-' + time.getHours() + '-' + time.getMinutes()] =-->
<!--          data.channelCorrValue-->
<!--      }-->
<!--      const channelName = '近24小时水位水深过程线'-->
<!--      for (let h = 0; h < 23; h++) {-->
<!--        for (let m = 0; m < 60; m++) {-->
<!--          xData[xData.length] = h + ':' + m-->
<!--          yData1[yData1.length] = dataJO[qd + '-' + h + '-' + m]-->
<!--          yData2[yData2.length] = dataJO[zd + '-' + h + '-' + m]-->
<!--          yData3[yData3.length] = dataJO[jd + '-' + h + '-' + m]-->
<!--          m = m + 4-->
<!--        }-->
<!--      }-->
<!--      return {-->
<!--        tooltip: {-->
<!--          trigger: 'axis',-->
<!--          axisPointer: {-->
<!--            type: 'cross',-->
<!--            label: {-->
<!--              backgroundColor: '#6a7985',-->
<!--            },-->
<!--          },-->
<!--        },-->
<!--        title: {-->
<!--          top: '0px',-->
<!--          left: '3%',-->
<!--          text: channelName,-->
<!--          textStyle: {-->
<!--            fontSize: '12px',-->
<!--            fontWeight: 'normal',-->
<!--          },-->
<!--        },-->
<!--        legend: {-->
<!--          top: 10,-->
<!--          right: 20,-->
<!--          textStyle: {-->
<!--            color: '#666',-->
<!--          },-->
<!--          itemGap: 20,-->
<!--          itemWidth: 10,-->
<!--          data: ['前天', '昨天', '今天'],-->
<!--        },-->
<!--        toolbox: {-->
<!--          feature: {},-->
<!--        },-->
<!--        xAxis: [-->
<!--          {-->
<!--            type: 'category',-->
<!--            boundaryGap: false,-->
<!--            data: xData,-->
<!--            axisLabel: {-->
<!--              show: true,-->
<!--              rotate: 0,-->
<!--              margin: 8,-->
<!--              textStyle: {-->
<!--                color: '#666',-->
<!--                fontSize: '12',-->
<!--              },-->
<!--            },-->
<!--            axisLine: {-->
<!--              lineStyle: {-->
<!--                color: '#dfe6ff',-->
<!--                width: 1,-->
<!--              },-->
<!--            },-->
<!--          },-->
<!--        ],-->
<!--        yAxis: [-->
<!--          {-->
<!--            type: 'value',-->
<!--            textStyle: {-->
<!--              color: '#666',-->
<!--              fontSize: '12',-->
<!--            },-->
<!--          },-->
<!--        ],-->
<!--        series: [-->
<!--          {-->
<!--            name: '前天',-->
<!--            type: 'line',-->
<!--            itemStyle: {-->
<!--              color: 'rgba(245,10,10,1)',-->
<!--            },-->
<!--            symbolSize: 2,-->
<!--            areaStyle: {-->
<!--              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [-->
<!--                {-->
<!--                  offset: 0,-->
<!--                  color: 'rgba(245,10,10,0.2)',-->
<!--                },-->
<!--                {-->
<!--                  offset: 1,-->
<!--                  color: 'rgba(245,10,10,0.01)',-->
<!--                },-->
<!--              ]),-->
<!--            },-->
<!--            data: yData1,-->
<!--          },-->
<!--          {-->
<!--            name: '昨天',-->
<!--            type: 'line',-->
<!--            itemStyle: {-->
<!--              color: 'rgba(58,150,253,1)',-->
<!--            },-->
<!--            areaStyle: {-->
<!--              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [-->
<!--                {-->
<!--                  offset: 0,-->
<!--                  color: 'rgba(58,150,253,0.2)',-->
<!--                },-->
<!--                {-->
<!--                  offset: 1,-->
<!--                  color: 'rgba(58,77,233,0.01)',-->
<!--                },-->
<!--              ]),-->
<!--            },-->
<!--            data: yData2,-->
<!--          },-->
<!--          {-->
<!--            name: '今天',-->
<!--            type: 'line',-->
<!--            itemStyle: {-->
<!--              color: 'rgba(160,101,251,1)',-->
<!--            },-->
<!--            symbolSize: 2,-->
<!--            areaStyle: {-->
<!--              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [-->
<!--                {-->
<!--                  offset: 0,-->
<!--                  color: 'rgba(160,101,251,0.2)',-->
<!--                },-->
<!--                {-->
<!--                  offset: 1,-->
<!--                  color: 'rgba(160,101,251,0.01)',-->
<!--                },-->
<!--              ]),-->
<!--            },-->
<!--            data: yData3,-->
<!--          },-->
<!--        ],-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (this.chartInstance) {-->
<!--      window.removeEventListener('resize', this.handleResize)-->
<!--      this.chartInstance.dispose()-->
<!--      this.chartInstance = null-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.modal-content {-->
<!--  height: 60vh;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.top-section {-->
<!--  height: 70%;-->
<!--}-->

<!--.chart-container {-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--}-->

<!--.bottom-section {-->
<!--  height: 30%;-->
<!--  overflow-y: auto;-->
<!--  padding-top: 8px;-->
<!--}-->

<!--.grid-section {-->
<!--  margin-top: 8px;-->
<!--}-->

<!--.grid-item {-->
<!--  padding: 8px;-->
<!--}-->

<!--.cell {-->
<!--  border: 1px solid #d9d9d9;-->
<!--  padding: 10px;-->
<!--  border-radius: 4px;-->
<!--  text-align: center;-->
<!--  background-color: #fafafa;-->
<!--}-->
<!--</style>-->
