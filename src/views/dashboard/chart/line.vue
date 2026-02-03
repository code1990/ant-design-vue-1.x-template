<template>
  <div>
    <MultiLinkKline />
    <!-- 或者传入你自己的数据 -->
    <!--
    <MultiLinkKline
      :categoryData="times"
      :kData="klineData"
      :volExtra="extraVol"
      :volBig="bigVol"
      :volMid="midVol"
      :volSmall="smallVol"
    />
    -->
  </div>
</template>

<script>
import MultiLinkKline from './MultiLinkKline.vue';

export default {
  components: { MultiLinkKline },
  data () {
    return {
      times: [],
      klineData: [],
      extraVol: [],
      bigVol: [],
      midVol: [],
      smallVol: []
    };
  }
};
</script>
