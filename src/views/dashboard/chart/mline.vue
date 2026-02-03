<template>
  <div>
    <!-- 直接用 demo 数据 -->
    <KlineWithMultiLines />

    <!-- 或者传入你自己的真实数据 -->
    <!--
    <KlineWithMultiLines
      :categoryData="times"
      :kData="kData"
      :lineSeries="lines"
    />
    -->
  </div>
</template>

<script>
import KlineWithMultiLines from './KlineWithMultiLines.vue';

export default {
  components: { KlineWithMultiLines },
  data () {
    return {
      times: [],      // ['2025-01-01 09:30', ...]
      kData: [],      // [[open, close, low, high], ...]
      lines: [        // 10 条折线
        { name: 'MA5',  data: [] },
        { name: 'MA10', data: [] },
        // ...
      ]
    };
  }
};
</script>
