<template>
  <div>
    <div class="bg-nav">
      <div class="leftTip">智慧工地</div>
      <div class="midTip">物联网+智慧工地管理系统</div>
      <div class="rightTip">{{ user }}</div>
    </div>
    <TopNav class="top-nav"></TopNav>
  </div>
</template>

<script>
import TopNav from '@/views/wise/TopNav.vue'

export default {
  name: 'HeaderChart',
  components: { TopNav },
  data() {
    return {
      user: '超级管理员',
      menuList: [
        {
          key: '/overview',
          title: '工程概况',
          icon: 'dashboard',
        },
        {
          key: '/video',
          title: '工地视频',
          icon: 'video-camera',
        },
        {
          key: '/civilized',
          title: '文明施工',
          icon: 'home',
        },
        {
          key: '/personnel',
          title: '人员管理',
          icon: 'team',
        },
        {
          key: '/safety',
          title: '安全管理',
          icon: 'safety',
        },
        {
          key: '/iot',
          title: '智能物联',
          icon: 'cloud',
        },
        {
          key: '/warning',
          title: '预警管理',
          icon: 'alert',
        },
        {
          key: '/inspection',
          title: '巡查整改',
          icon: 'audit',
        },
        {
          key: '/material',
          title: '材料管理',
          icon: 'database',
        },
        {
          key: '/vehicle',
          title: '车辆管理',
          icon: 'car',
        },
      ],
    }
  },
  computed: {
    activeKey() {
      // 精确匹配一级路由
      const path = this.$route.path
      const matched = this.menuList.find(item => path.startsWith(item.key))
      return matched ? matched.key : ''
    },
  },
  methods: {
    handleMenuClick({ key }) {
      if (this.$route.path !== key) {
        this.$router.push(key)
      }
    },
  },
}
</script>

<style scoped>
.bg-nav {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background-image: url('../../assets/header_bg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  float: left;
  width: 100%;
}

.top-nav {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  float: left;
  width: 100%;
}

.top-nav .ant-menu {
  line-height: 64px;
  background: transparent;
  border-bottom: none;
}

.top-nav .ant-menu-item {
  padding: 0 20px;
  font-size: 14px;
  color: #4c9cdd;
}

.leftTip {
  float: left;
  width: 12%;
  color: #68cce8;
  font-size: 20px;
  text-align: center;
}

.midTip {
  float: left;
  width: 77%;
  color: #fefeff;
  font-size: 34px;
  text-align: center;
  font-weight: bold;
}

.rightTip {
  float: left;
  width: 11%;
  color:#01CDF7;
  margin-bottom: 3px;
  font-weight: bold;
  line-height: 56px;
}
</style>
