<template>
  <div class="headerBox">
    <div class="leftBox" v-show="false"></div>
    <div class="title">{{ title }}</div>
    <div class="rightBox" v-show="false"></div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBox',
  data() {
    return {
      title: '黄浦区水务安全态势感知',
    }
  },
  methods: {
    getHome() {
      this.$router.push('/main')
    },
  },
}
</script>

<style scoped lang="less">
.headerBox {
  width: 100%;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-left: 50px;
  line-height: 50px;
  float: left;
  background-color: #13152D; /* 背景透明 */
}

.title {
  width: 100%;
  float: left;
  color: #5AEDCC;
  height: 100%;
  text-align: center;
}

.enterBox {
  width: 8%;
  float: right;
  background-color: #37a494;
  text-align: right;
  cursor: pointer;
  color: white;
}

.leftBox {
  width: 33%;
  float: left;
  color: white;
  height: 100%;
  margin-top: -10px;
  background-image: url('~@/assets/images/left.png');
  background-repeat: no-repeat;   /* 不平铺 */
  background-size: cover;         /* 等比缩放，铺满容器 */
  background-position: center;    /* 居中对齐 */
}

.rightBox {
  width: 33%;
  float: left;
  color: white;
  height: 100%;
  margin-top: -10px;
  background-image: url('~@/assets/images/right.png');
  background-repeat: no-repeat;   /* 不平铺 */
  background-size: cover;         /* 等比缩放，铺满容器 */
  background-position: center;    /* 居中对齐 */
}
</style>
