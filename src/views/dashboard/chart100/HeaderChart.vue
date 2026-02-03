<template>
  <header class="screen-header">
    <!-- 左侧：logo / 系统名称 -->
    <div class="header-left">
      <div class="logo-box">
        <!-- 这里可以放 svg / img，现在先占位 -->
        <span class="logo-dot" />
      </div>
      <div class="sys-name">
        广东省水文信息管理系统
      </div>
    </div>

    <!-- 中间：主标题 -->
    <div class="header-center">
      <div class="title-main">广东省水文综合监测大屏看板</div>
      <div class="title-subline" />
    </div>

    <!-- 右侧：天气 + 时间 -->
    <div class="header-right">
      <div class="weather-block">
        <span class="weather-icon">☀️</span>
        <div class="weather-text">
          <div class="weather-status">晴转多云</div>
          <div class="weather-temp">20.7℃</div>
        </div>
      </div>

      <div class="time-block">
        <div class="time-main">{{ timeStr }}</div>
        <div class="time-sub">
          {{ dateStr }}&nbsp;&nbsp;{{ weekStr }}
        </div>
      </div>

      <a-button
        type="primary"
        size="small"
        ghost
        class="btn-fullscreen"
        @click="onToggleFullScreen"
      >
        全屏显示
      </a-button>
    </div>
  </header>
</template>

<script>
export default {
  name: "ScreenHeader",

  data() {
    return {
      timer: null,
      timeStr: "",
      dateStr: "",
      weekStr: ""
    };
  },

  mounted() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  },

  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },

  methods: {
    updateTime() {
      const now = new Date();

      // 时间：HH:mm:ss
      const pad = n => (n < 10 ? "0" + n : "" + n);
      this.timeStr = `${pad(now.getHours())}:${pad(
        now.getMinutes()
      )}:${pad(now.getSeconds())}`;

      // 日期：YYYY-MM-DD
      const y = now.getFullYear();
      const m = pad(now.getMonth() + 1);
      const d = pad(now.getDate());
      this.dateStr = `${y}-${m}-${d}`;

      // 星期
      const weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      this.weekStr = weekMap[now.getDay()];
    },

    onToggleFullScreen() {
      const doc = window.document;
      const docEl = doc.documentElement;

      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;

      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen && requestFullScreen.call(docEl);
      } else {
        cancelFullScreen && cancelFullScreen.call(doc);
      }
    }
  }
};
</script>

<style scoped>
.screen-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  background: radial-gradient(circle at top, #164f92 0%, #020b1f 70%);
  border-bottom: 1px solid rgba(0, 180, 255, 0.3);
  color: #e6f7ff;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}

/* 左侧 */
.header-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 260px;
}

.logo-box {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(64, 158, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.logo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, #40e9ff, #1677ff);
}

.sys-name {
  font-size: 14px;
  color: #a0cfff;
}

/* 中间标题 */
.header-center {
  flex: 1.6;
  text-align: center;
}

.title-main {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
  background-image: linear-gradient(to bottom, #ffffff, #7ad9ff);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
}

.title-subline {
  width: 260px;
  height: 3px;
  margin: 6px auto 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(64, 224, 255, 0.9),
    transparent
  );
  border-radius: 3px;
}

/* 右侧 */
.header-right {
  flex: 1;
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.weather-block {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.weather-icon {
  font-size: 20px;
  margin-right: 8px;
}

.weather-text {
  line-height: 1.2;
}

.weather-status {
  font-size: 13px;
  color: #a0cfff;
}

.weather-temp {
  font-size: 14px;
  font-weight: 600;
  color: #ffd666;
}

.time-block {
  text-align: right;
  margin-right: 16px;
}

.time-main {
  font-size: 18px;
  font-weight: 600;
  color: #e6f7ff;
}

.time-sub {
  font-size: 12px;
  color: #a0cfff;
}

.btn-fullscreen {
  border-radius: 16px;
  border-color: rgba(64, 169, 255, 0.8);
}
</style>
