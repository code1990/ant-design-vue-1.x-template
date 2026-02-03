<template>
  <a-layout-header class="top-nav">
    <a-menu mode="horizontal" theme="dark" :selectedKeys="[activeKey]" @click="handleMenuClick">
      <a-menu-item v-for="item in menuList" :key="item.key">
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {
  name: 'TopNav',
  data() {
    return {
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
.top-nav {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background-color: #0e287d;
  border-bottom: 2px solid #2f619a;
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

::v-deep .ant-menu-item-selected {
  color: #00d1fe;
}

::v-deep(.ant-menu-item-selected) {
  background:  transparent !important;
}

::v-deep(.ant-menu-item-selected > a),
::v-deep(.ant-menu-item-selected) {
  font-weight: 700 !important;
}

::v-deep(.ant-menu-item-selected span) {
  font-weight: 700 !important;
}
::v-deep .ant-menu-dark.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item-selected > span,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item-selected > a {
  color: #00D0FD !important;
}
</style>
