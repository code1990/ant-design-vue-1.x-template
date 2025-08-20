<template>
  <div class="dashboard">
    <div class="dashboard-title">汇总看板</div>
    <a-row :gutter="10" type="flex" align="stretch" style="margin-bottom: 10px;">
      <a-col :span="4" v-for="(item, idx) in cards" :key="idx" style="width: 20%">
        <a-card :title="item.title" bordered :style="{ backgroundColor: item.bgColor, height: '100%', borderRadius: '15px',color:'white' }">
          <p v-for="(val, i) in item.content" :key="i">{{ val }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'SummaryBoard',
  data() {
    return {
      cards: [
        {
          title: '原水',
          bgColor: '#58A3F7',
          content: ['今日取水量：84,312.3m³', '今日保库：364kt', '今日采样合格率：75%'],
        },
        {
          title: '水厂',
          bgColor: '#FEC03D',
          content: ['今日供水量：538.2kt', '今日能耗：6,262.1kW-h', '今日药耗：516.0kg'],
        },
        {
          title: '管网',
          bgColor: '#52C1F5',
          content: ['压力合格率：82%', '管网检漏合格率：85%', '管道长度：476.5km'],
        },
        {
          title: '二次供水',
          bgColor: '#8167F5',
          content: ['泵房托管率：88%', '泵房在线数：579', '水质达标率：89%'],
        },
        {
          title: '预警',
          bgColor: '#FB6260',
          content: ['水质报警：17', '设备报警：2', '闯入报警：1', '超压报警：3'],
        },
      ],
    }
  },
}
</script>

<style scoped>
.dashboard {
  padding: 10px;
  background-color: white;
}

.dashboard-title {
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #EDF2FA;
  margin-bottom: 25px;
}

::v-deep .ant-card-head-title {
  color: white;
}
</style>
