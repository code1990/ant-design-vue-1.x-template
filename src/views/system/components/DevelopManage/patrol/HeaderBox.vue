<template>
  <div class="headerBox">
    <div class="title">运维可视化管理</div>
    <div class="enterBox" @click="getHome">进入后台</div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBox',
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
  text-align: left;
  padding-left: 50px;
  line-height: 50px;
  position: absolute;
  opacity: 1; /* 保持文字完全不透明 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景透明 */
  z-index: 99;
}

.title {
  width: 30%;
  float: left;
}

.enterBox {
  width: 8%;
  float: right;
  background-color: #37a494;
  text-align: right;
  cursor: pointer;
  color: white;
}
</style>
