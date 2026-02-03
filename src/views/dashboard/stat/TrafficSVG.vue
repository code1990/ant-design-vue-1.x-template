<template>
  <a-card  style="height: 300px;">
    <svg width="100%" height="300" viewBox="0 0 400 300">
      <defs>
        <!-- 土层沙子填充 -->
        <pattern id="patternSand" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#d2b48c" />
        </pattern>

        <!-- 积水波浪 -->
        <pattern id="patternWater" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q5 0, 10 5 T20 5" stroke="#87ceeb" stroke-width="1" fill="none"/>
        </pattern>
      </defs>

      <!-- 背景土层 -->
      <rect x="0" y="0" width="400" height="300"
            fill="url(#patternSand)" stroke="saddlebrown" stroke-width="2" />

      <!-- 地面道路 -->
      <rect x="0" y="0" width="400" height="50"
            fill="#666" stroke="black" stroke-width="2" />

      <!-- 文字放在道路矩形的正上方居中 -->
      <text x="200" y="-5" font-size="14" fill="black" text-anchor="middle">
        地面道路
      </text>

      <!-- 隧道矩形槽体 (顶边与道路底边对齐) -->
      <rect x="100" y="50" width="200" height="150"
            fill="white" stroke="black" stroke-width="3" />

      <!-- 裁剪区：隧道内部 -->
      <clipPath id="tunnelClip">
        <rect x="100" y="50" width="200" height="150" />
      </clipPath>

      <!-- 积水 (裁剪到隧道内部) -->
      <rect x="100" :y="mapWaterLevel" width="200" :height="200-mapWaterLevel"
            fill="url(#patternWater)" clip-path="url(#tunnelClip)" />

      <!-- 积水水位线 -->
      <line :y1="mapWaterLevel" :y2="mapWaterLevel" x1="100" x2="300"
            stroke="skyblue" stroke-width="2" stroke-dasharray="6,4" />

      <!-- 水位文字 -->
      <text x="310" :y="mapWaterLevel - 5" fill="skyblue" font-size="14">
        积水 {{ waterLevel }}m
      </text>
    </svg>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      waterLevel: 1.5 // 积水高度 (米)
    };
  },
  computed: {
    // 映射积水 (0~5m → 150px 高度)
    mapWaterLevel() {
      const maxH = 5;     // 最大积水深度 (米)
      const svgH = 150;   // 隧道高度 (px)
      const bottom = 200; // 隧道底部 y 坐标 (50 + 150)
      return bottom - (this.waterLevel / maxH) * svgH;
    }
  }
};
</script>
