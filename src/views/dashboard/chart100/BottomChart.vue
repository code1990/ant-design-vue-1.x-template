<template>
  <div class="bottom-panel">

    <!-- 标题 -->
    <div class="bottom-title">
      <span class="title-icon"></span>
      <span class="title-text">最新监测数据</span>
    </div>

    <!-- 内容区域 -->
    <div class="scroll-wrapper" ref="scrollBox" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
      <ul class="scroll-list" :style="{ top: scrollTop + 'px' }">
        <li v-for="(item, idx) in displayList" :key="idx" class="scroll-item">
          <div class="col site-name">{{ item.name }}</div>
          <div class="col site-type">{{ item.type }}</div>
          <div class="col site-value">{{ item.value }}</div>
          <div class="col site-time">{{ item.time }}</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "BottomPanel",

  data() {
    return {
      scrollTop: 0,
      timer: null,

      // 示例数据，你可以从 API 替换
      list: [
        { name: "温州·瓯海水位站", type: "水位", value: "3.21 m", time: "12:21:03" },
        { name: "绍兴·上虞雨量站", type: "雨量", value: "8.3 mm", time: "12:20:50" },
        { name: "金华·兰溪摄像头", type: "视频", value: "正常", time: "12:20:40" },
        { name: "丽水·莲都水位站", type: "水位", value: "2.95 m", time: "12:19:55" },
        { name: "杭州·滨江雨量站", type: "雨量", value: "5.1 mm", time: "12:18:32" },
        { name: "台州·路桥报警点", type: "报警", value: "超水位", time: "12:17:11" }
      ]
    };
  },

  computed: {
    // 复制一份用于无缝滚动
    displayList() {
      return [...this.list, ...this.list];
    }
  },

  mounted() {
    this.startScroll();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    startScroll() {
      const itemHeight = 38; // 每行高度
      const totalHeight = this.list.length * itemHeight;

      this.timer = setInterval(() => {
        this.scrollTop -= 1;
        if (Math.abs(this.scrollTop) >= totalHeight) {
          this.scrollTop = 0;
        }
      }, 40);
    },

    pauseScroll() {
      clearInterval(this.timer);
    },

    resumeScroll() {
      this.startScroll();
    }
  }
};
</script>

<style scoped>
.bottom-panel {
  width: 100%;
  height: 240px;
  background: rgba(4, 32, 70, 0.85);
  border-top: 1px solid rgba(0, 180, 255, 0.2);
  padding: 10px;
  box-sizing: border-box;
  color: #e6f7ff;
}

/* 标题条 */
.bottom-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.title-icon {
  width: 6px;
  height: 18px;
  background: #40e9ff;
  border-radius: 3px;
  margin-right: 8px;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
}

/* 滚动区域 */
.scroll-wrapper {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.scroll-list {
  position: absolute;
  width: 100%;
}

.scroll-item {
  height: 38px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(64, 158, 255, 0.1);
  font-size: 14px;
}

.col {
  flex: 1;
}

.site-name {
  color: #ffffff;
  font-weight: 500;
}

.site-type {
  color: #40e9ff;
}

.site-value {
  color: #ffd666;
}

.site-time {
  color: #a0cfff;
  text-align: right;
}
</style>
