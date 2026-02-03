<template>
  <div class="dashboard">
    <div class="header">
      <header-chart></header-chart>
    </div>
    <div class="main">
      <div class="top-box">
        <div class="title">
          <div class="count">
            45
            <span style="font-size: 14px; color: #d6dbe4">辆</span>
          </div>
          <div class="desc">当前现场</div>
        </div>
        <div class="vehicle-card" v-for="item in vehicleList" :key="item.id">
          <div class="vehicle-img">
            <img :src="item.img" />
          </div>
          <div class="vehicle-info">
            <div class="plate">{{ item.plate }}</div>
            <div class="type">{{ item.type }}</div>
            <div class="location">{{ item.inlocation }}</div>
            <div class="time">{{ item.inTime }}</div>
            <div class="location">{{ item.outlocation }}</div>
            <div class="time">{{ item.outTime }}</div>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <!-- 标题栏 -->
        <div class="bottom-header">
          <div class="left">
            <span class="title-text">今日未备案车辆</span>
            <span class="count">{{ unFiledCount }}</span>
            <span class="title-text">辆</span>
          </div>

          <div class="right" @click="toggleMore">
            <span class="more-text">{{ showMore ? '收起' : '更多' }}</span>
          </div>
        </div>

        <!-- 卡片区域：默认不滚动，点击更多后可纵向滚动 -->
        <div class="card-wrap" :class="{ scrollable: showMore }">
          <div class="card-list">
            <div class="car-card" v-for="item in list" :key="item.id">
              <div class="card-title">
                <span class="plate">{{ item.plate }}</span>
                <span class="status">{{ item.status }}</span>
              </div>

              <div class="card-img">
                <img :src="item.img" alt="" />
              </div>

              <div class="card-row">
                <span class="label">入口名称</span>
                <span class="value">{{ item.inName }}</span>
              </div>
              <div class="card-row">
                <span class="label">入场时间</span>
                <span class="value">{{ item.inTime }}</span>
              </div>
              <div class="card-row" style="border-bottom: 2px solid #00D5FF">
              </div>
              <div class="card-row">
                <span class="label">出口名称</span>
                <span class="value">{{ item.outName }}</span>
              </div>
              <div class="card-row">
                <span class="label">出场时间</span>
                <span class="value">{{ item.outTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderChart from '@/views/wise/HeaderChart.vue'

export default {
  components: {
    HeaderChart,
  },
  name: 'index',
  data() {
    return {
      showMore: false,
      unFiledCount: 10,
      list: [
        {
          id: 1,
          plate: '粤C·582Y6',
          status: '未备案',
          img: require('@/assets/error_car.png'),
          inName: '北大门口',
          inTime: '2020-05-21 14:25:36',
          outName: '北大门口',
          outTime: '2020-05-21 14:25:36',
        },
        {
          id: 1,
          plate: '粤C·582Y6',
          status: '未备案',
          img: require('@/assets/error_car.png'),
          inName: '北大门口',
          inTime: '2020-05-21 14:25:36',
          outName: '北大门口',
          outTime: '2020-05-21 14:25:36',
        },
        {
          id: 1,
          plate: '粤C·582Y6',
          status: '未备案',
          img: require('@/assets/error_car.png'),
          inName: '北大门口',
          inTime: '2020-05-21 14:25:36',
          outName: '北大门口',
          outTime: '2020-05-21 14:25:36',
        },
        {
          id: 1,
          plate: '粤C·582Y6',
          status: '未备案',
          img: require('@/assets/error_car.png'),
          inName: '北大门口',
          inTime: '2020-05-21 14:25:36',
          outName: '北大门口',
          outTime: '2020-05-21 14:25:36',
        },
        {
          id: 1,
          plate: '粤C·582Y6',
          status: '未备案',
          img: require('@/assets/error_car.png'),
          inName: '北大门口',
          inTime: '2020-05-21 14:25:36',
          outName: '北大门口',
          outTime: '2020-05-21 14:25:36',
        },
        // ...多来几条，点击更多后才能纵向滚动看到更多
      ],
      vehicleList: [
        {
          img: require('@/assets/wise_car.png'),
          plate: '粤C·582Y6',
          type: '渣土车辆',
          inlocation: '北大门',
          outlocation: '北大门',
          inTime: '2020-05-2814:25:24',
          outTime: '2020-05-28 16:25:30',
        },
        {
          img: require('@/assets/wise_car.png'),
          plate: '粤C·582Y6',
          type: '渣土车辆',
          inlocation: '北大门',
          outlocation: '北大门',
          inTime: '2020-05-2814:25:24',
          outTime: '2020-05-28 16:25:30',
        },
        {
          img: require('@/assets/wise_car.png'),
          plate: '粤C·582Y6',
          type: '渣土车辆',
          inlocation: '北大门',
          outlocation: '北大门',
          inTime: '2020-05-2814:25:24',
          outTime: '2020-05-28 16:25:30',
        }
      ],
    }
  },
  methods: {
    toggleMore() {
      this.showMore = !this.showMore
    },
  },
}
</script>

<style scoped lang="less">
.dashboard {
  width: 100%;
  height: 100%;
  background: #172a67; // 推荐大屏深色背景
  display: flex;
  flex-direction: column;

  // 顶部区域
  .header {
    height: 130px; // 可按 HeaderChart 的高度调整
    flex-shrink: 0;
  }

  // 主体区域 - 采用三栏布局
  .main {
    height: 100%; // ⚠️ 必须有明确高度（或父级有高度）
    display: flex;
    flex-direction: column;
    overflow: hidden;

    // 上面 30%
    .top-box {
      height: 33%;
      padding: 15px;
      overflow-y: hidden;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    // 下面 70%
    .bottom-box {
      height: 65%;
      padding: 15px;
      margin: 15px;
      box-sizing: border-box;
      overflow: auto;
      border:2px solid #1C337F;
    }
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  width: 9%;
  background-color: #18295c;
  border: 2px solid #1c337f;

  .count {
    color: #00eaff;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    margin-top: 50%;
  }

  .desc {
    font-size: 14px;
    color: #ccc;
    text-align: center;
  }
}

.vehicle-list {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 10px;
}

.vehicle-card {
  display: flex;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  color: #fff;
  width: 29.3%;
}

.vehicle-img {
  width: 300px;
  height: 230px;
  margin-right: 8px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.vehicle-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.4;
  width: 40%;

  .plate {
    font-size: 24px;
    font-weight: bold;
    color: #d6dbe4;
    text-align: center;
  }

  .type {
    color: #d6dbe4;
    text-align: left;
    margin-top: 5%;
    margin-left: 15%;
  }

  .location {
    color: #d6dbe4;
    text-align: left;
    margin-top: 5%;
    margin-left: 15%;
  }

  .time {
    color: #d6dbe4;
    text-align: left;
    margin-top: 5%;
    margin-left: 15%;
  }
}

//.bottom-box {
//  padding: 12px;
//  background: #0f172a;
//  border-radius: 12px;
//  color: #e5e7eb;
//}

/* 标题栏 */
.bottom-box .bottom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.bottom-box .bottom-header .left {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 10px;
  border:2px solid #1C337F;
}

.bottom-box .title-text {
  font-size: 14px;
  font-weight: 200;
  color: #d6dbe4;
}

.bottom-box .count {
  font-size: 20px;
  font-weight: bold;
  opacity: 0.9;
  color: #00D4FE;
}

.bottom-box .bottom-header .right {
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  opacity: 0.95;
  color: #d6dbe4;
}

/* 外层：控制“默认不滚动 / 点击更多可纵向滚动” */
.bottom-box .card-wrap {
  /* 默认：固定高度 + 禁止滚动（不出现滚动条，也不能滚动） */
  //height: 420px;              /* 你可按UI调整：默认显示区域高度 */
  overflow-y: hidden;
  color: #d6dbe4;
}

/* 点击更多后：允许纵向滚动 */
.bottom-box .card-wrap.scrollable {
  overflow-y: auto;
  color: #d6dbe4;
}

/* 内层：水平放 5 个卡片 */
.bottom-box .card-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
}

/* 卡片：固定宽度，5个一排（按容器宽度微调） */
.bottom-box .car-card {
  width: 19.4%;               /* 关键：固定宽度，决定能放几张 */
  flex: 0 0 auto;
  background: #253770;
  padding: 12px;
  box-sizing: border-box;
  border:2px solid #1D3581;
}

/* 卡片标题 */
.bottom-box .card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #00D5FF;
}

.bottom-box .plate {
  font-size: 16px;
  font-weight: 700;
  color:#00D4FE;
}

.bottom-box .status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  color: #ABCFF6;
}

/* 图片 */
.bottom-box .card-img {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #d6dbe4;
  margin-bottom: 10px;
  background-size: 100%;
}

.bottom-box .card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 信息行 */
.bottom-box .card-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.6;
  margin-top: 4px;
  padding-top: 10px;
}

.bottom-box .label {
  opacity: 0.75;
}

.bottom-box .value {
  margin-left: 10px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
</style>
