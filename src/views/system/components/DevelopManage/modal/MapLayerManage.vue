<template>
  <div>
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">
          <a-icon type="user" />
          1st menu item
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />
          2nd menu item
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="user" />
          3rd item
        </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px">
        Button
        <a-icon type="down" />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownVisible: false,
    }
  },
  methods: {
    handleLeftClick() {
      console.error('xxxx2')
      this.dropdownVisible = !this.dropdownVisible // ✅ 切换下拉菜单显示
    },
    handleMenuClick({ key }) {
      console.error('xxxx1')
      console.log('菜单项点击:', key)
      this.dropdownVisible = false // ✅ 点完收起
    },
  },
}
</script>
