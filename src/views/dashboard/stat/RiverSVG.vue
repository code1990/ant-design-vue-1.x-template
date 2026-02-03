<template>
  <a-card style="height: 300px;">
    <svg width="100%" height="200" viewBox="0 0 400 100">
      <defs>
        <!-- 沙子填充 -->
        <pattern id="patternSand" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#d2b48c" />
        </pattern>

        <!-- 波浪水纹 -->
        <pattern id="patternWater" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q5 0, 10 5 T20 5" stroke="#87ceeb" stroke-width="1" fill="none"/>
        </pattern>

        <!-- 河道梯形 (保持 70px 高度) -->
        <path id="riverShape" d="M 100 0 L 150 70 L 250 70 L 300 0 Z" />
      </defs>

      <!-- 背景矩形高度改为 100px -->
      <rect x="0" y="0" width="400" height="100" fill="url(#patternSand)" stroke="saddlebrown" stroke-width="2" />

      <!-- 河道区域 -->
      <use xlink:href="#riverShape" fill="white" stroke="sienna" stroke-width="2" />

      <!-- 水位填充（裁剪到河道内） -->
      <rect x="100" :y="mapWaterLevel" width="200" :height="70-mapWaterLevel"
            fill="url(#patternWater)" clip-path="url(#riverClip)" />

      <!-- 水位线 -->
      <line :y1="mapWaterLevel" :y2="mapWaterLevel" x1="100" x2="300"
            stroke="skyblue" stroke-width="2" stroke-dasharray="6,4" />

      <!-- 水位文字 -->
      <text x="310" :y="mapWaterLevel - 5" fill="skyblue" font-size="14">
        水位 {{ waterLevel }}m
      </text>

      <!-- 裁剪区（河道内部） -->
      <clipPath id="riverClip">
        <use xlink:href="#riverShape" />
      </clipPath>
    </svg>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      waterLevel: 1.5 // 当前水位（米）
    };
  },
  computed: {
    // 保持河道高度 70px 映射 0~3m
    mapWaterLevel() {
      const maxH = 3;   // 河道最大水深
      const svgH = 70;  // 河道本身高度
      return svgH - (this.waterLevel / maxH) * svgH;
    }
  }
};
</script>
