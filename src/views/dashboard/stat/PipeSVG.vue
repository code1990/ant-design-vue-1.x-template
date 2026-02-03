<template>
  <a-card style="height: 300px;">
    <svg width="100%" height="200" viewBox="0 0 200 200">
      <defs>
        <!-- 沙子填充 -->
        <pattern id="patternSand" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#d2b48c" />
        </pattern>

        <!-- 波浪水纹 -->
        <pattern id="patternWater" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q5 0, 10 5 T20 5" stroke="#87ceeb" stroke-width="1" fill="none"/>
        </pattern>
      </defs>

      <!-- 背景长方形 -->
      <rect x="0" y="0" width="200" height="200" fill="url(#patternSand)" stroke="saddlebrown" stroke-width="2" />

      <!-- 管井筒：宽度翻倍 (80px)，居中 -->
      <rect x="60" y="0" width="80" height="133" fill="white" stroke="sienna" stroke-width="3" />

      <!-- 裁剪区：井筒内部 -->
      <clipPath id="wellClip">
        <rect x="60" y="0" width="80" height="133" />
      </clipPath>

      <!-- 水位填充（限制在井内） -->
      <rect x="60" :y="mapWaterLevel" width="80" :height="133-mapWaterLevel"
            fill="url(#patternWater)" clip-path="url(#wellClip)" />

      <!-- 水位线 -->
      <line :y1="mapWaterLevel" :y2="mapWaterLevel" x1="60" x2="140"
            stroke="skyblue" stroke-width="2" stroke-dasharray="6,4" />

      <!-- 水位文字 -->
      <text x="150" :y="mapWaterLevel - 5" fill="skyblue" font-size="14">
        水位 {{ waterLevel }}m
      </text>
    </svg>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      waterLevel: 3 // 当前水位（米）
    };
  },
  computed: {
    // 将水位映射到井深 (0~6m → SVG 高度 133px)
    mapWaterLevel() {
      const maxH = 6;     // 井深 (米)
      const svgH = 133;   // 井筒高度
      return (this.waterLevel / maxH) * svgH;
    }
  }
};
</script>
