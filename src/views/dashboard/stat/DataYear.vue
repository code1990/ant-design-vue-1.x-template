<template>
  <div style="padding:16px">
    <!-- 年度告警统计 -->
    <a-card title="年度告警统计 (2023 / 2024 / 2025)" style="margin-bottom:24px">
      <div ref="yearChart" style="height:280px"></div>
    </a-card>

    <!-- 月度告警统计 -->
    <a-card title="月度告警统计">
      <div style="margin-bottom:12px">
        <a-select v-model="yearSelected" style="width:120px" @change="onYearChange">
          <a-select-option v-for="y in yearList" :key="y" :value="y">{{y}}</a-select-option>
        </a-select>
      </div>
      <div ref="monthChart" style="height:280px"></div>
    </a-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name:'AlarmStatPage',
  data(){
    return {
      yearList:['2023','2024','2025'],
      yearSelected:'2025',
      yearData:{
        years:['2023','2024','2025'],
        remind:[120,150,180],
        warn:[140,160,190],
        alarm:[90,110,135]
      },
      monthMock:{
        '2023':{remind:[5,6,8,9,12,11,10,9,8,7,6,5], warn:[7,9,8,10,11,12,13,14,13,11,10,9], alarm:[10,12,7,9,8,7,9,12,12,11,11,12]},
        '2024':{remind:[6,7,8,9,10,9,11,12,11,10,9,8], warn:[8,10,12,13,12,11,10,12,14,13,12,11], alarm:[11,9,9,10,9,10,11,12,11,13,12,14]},
        '2025':{remind:[7,9,8,11,10,9,10,12,10,9,11,12], warn:[9,11,10,13,12,11,12,13,14,13,12,13], alarm:[12,10,7,16,13,8,10,11,10,7,15,17]}
      },
      yearChartInstance:null,
      monthChartInstance:null
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.renderYearChart()
      this.renderMonthChart()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize)
    this.yearChartInstance && this.yearChartInstance.dispose()
    this.monthChartInstance && this.monthChartInstance.dispose()
  },
  methods:{
    handleResize(){
      this.yearChartInstance && this.yearChartInstance.resize()
      this.monthChartInstance && this.monthChartInstance.resize()
    },
    renderYearChart(){
      if(this.yearChartInstance) this.yearChartInstance.dispose()
      this.yearChartInstance = echarts.init(this.$refs.yearChart)
      this.yearChartInstance.setOption({
        tooltip:{trigger:'axis'},
        legend:{data:['提醒','预警','报警']},
        xAxis:{type:'category',data:this.yearData.years},
        yAxis:{type:'value'},
        series:[
          {name:'提醒',type:'bar',data:this.yearData.remind,itemStyle:{color:'#4781DD'}},
          {name:'预警',type:'bar',data:this.yearData.warn,itemStyle:{color:'#F0AD4E'}},
          {name:'报警',type:'bar',data:this.yearData.alarm,itemStyle:{color:'#F2394C'}}
        ]
      })
    },
    renderMonthChart(){
      if(this.monthChartInstance) this.monthChartInstance.dispose()
      this.monthChartInstance = echarts.init(this.$refs.monthChart)
      const monthData = this.monthMock[this.yearSelected]
      this.monthChartInstance.setOption({
        tooltip:{trigger:'axis'},
        legend:{data:['提醒','预警','报警']},
        xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']},
        yAxis:{type:'value'},
        series:[
          {name:'提醒',type:'bar',data:monthData.remind,itemStyle:{color:'#4781DD'}},
          {name:'预警',type:'bar',data:monthData.warn,itemStyle:{color:'#F0AD4E'}},
          {name:'报警',type:'bar',data:monthData.alarm,itemStyle:{color:'#F2394C'}}
        ]
      })
    },
    onYearChange(){
      this.renderMonthChart()
    }
  }
}
</script>

<style scoped></style>
