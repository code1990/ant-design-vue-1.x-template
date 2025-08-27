<template>
  <div class="headerBox">
    <div class="title">智慧排水监督平台</div>
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
  text-align: center;
  padding-left: 50px;
  line-height: 50px;
  float: left;
  background-color: wheat; /* 背景透明 */
}

.title {
  width: 100%;
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
