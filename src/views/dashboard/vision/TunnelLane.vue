<template>
  <div class="lane">
    <!-- 车道背景 -->
    <div class="lane-bg"></div>

    <!-- 车辆图标 -->
    <div v-for="(vehicle, index) in vehicles" :key="index" class="vehicle" :style="{ left: vehicle.left + 'px', top: vehicle.top + 'px' }">
      <img :src="vehicle.icon" :alt="vehicle.type" width="30" height="30" />
    </div>

    <!-- 信号灯 -->
    <div class="signal-light" :style="{ left: signalLeft + 'px' }">
      <div class="red-x">X</div>
      <div class="green-arrow">{{ arrowDirection }}</div>
    </div>

    <!-- 虚线分隔线 -->
    <div class="dashed-line"></div>
  </div>
</template>

<script>
export default {
  name: 'TunnelLane',
  props: {
    direction: String, // 'left' or 'right'
    signalLeft: Number,
    vehicles: Array,
    arrowDirection: String // '←' or '→'
  }
}
</script>

<style scoped>
.lane {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
}

.lane-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #0a1a4a, #0d2b6a, #0a1a4a);
  z-index: 0;
}

.vehicle {
  position: absolute;
  z-index: 1;
  transition: all 0.3s ease;
}

.signal-light {
  position: absolute;
  top: 10px;
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 2;
}

.red-x {
  color: red;
  margin-right: 5px;
}

.green-arrow {
  color: green;
}

.dashed-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px dashed #ccc;
  z-index: 1;
}
</style>