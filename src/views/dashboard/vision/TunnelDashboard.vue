<template>
  <div class="tunnel-dashboard">
    <!-- 南向隧道 -->
    <div class="tunnel-container" style="margin-bottom: 20px">
      <div class="tunnel-header">灵溪岭隧道（南向）</div>
      <div class="tunnel-body">
        <tunnel-lane
          v-for="(lane, index) in southLanes"
          :key="index"
          :direction="'left'"
          :signal-left="lane.signalLeft"
          :vehicles="lane.vehicles"
          :arrow-direction="'←'"
        />
      </div>
    </div>

    <!-- 北向隧道 -->
    <div class="tunnel-container">
      <div class="tunnel-header">灵溪岭隧道（北向）</div>
      <div class="tunnel-body">
        <tunnel-lane
          v-for="(lane, index) in northLanes"
          :key="index"
          :direction="'right'"
          :signal-left="lane.signalLeft"
          :vehicles="lane.vehicles"
          :arrow-direction="'→'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TunnelLane from '@/views/dashboard/vision/TunnelLane.vue'

export default {
  name: 'TunnelDashboard',
  components: {
    TunnelLane,
  },
  data() {
    return {
      southLanes: [
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'car',
              icon: require('@/assets/car.png'),
              left: 100,
              top: 10,
            },
            {
              type: 'ambulance',
              icon: require('@/assets/ambulance.png'),
              left: 300,
              top: 10,
            },
          ],
        },
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'car',
              icon: require('@/assets/car.png'),
              left: 200,
              top: 10,
            },
          ],
        },
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'truck',
              icon: require('@/assets/truck.png'),
              left: 400,
              top: 10,
            },
          ],
        },
      ],
      northLanes: [
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'car',
              icon: require('@/assets/car.png'),
              left: 100,
              top: 10,
            },
            {
              type: 'ambulance',
              icon: require('@/assets/ambulance.png'),
              left: 300,
              top: 10,
            },
          ],
        },
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'car',
              icon: require('@/assets/car.png'),
              left: 200,
              top: 10,
            },
          ],
        },
        {
          signalLeft: 50,
          vehicles: [
            {
              type: 'truck',
              icon: require('@/assets/truck.png'),
              left: 400,
              top: 10,
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.tunnel-dashboard {
  background-color: #0c0c1e;
  color: #fff;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tunnel-container {
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid #00aaff;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.tunnel-header {
  font-size: 20px;
  font-weight: bold;
  color: #00aaff;
  text-align: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 10;
}

.tunnel-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 5;
}

/* 水印文字 */
.watermark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="60" fill="rgba(255,255,255,0.1)" text-anchor="middle" dominant-baseline="middle" transform="rotate(-15)">灵溪岭隧道</text></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  pointer-events: none;
  z-index: 1;
}
</style>