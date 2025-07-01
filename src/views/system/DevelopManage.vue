<template>
  <a-list
    item-layout="horizontal"
    :data-source="data"
    style="background: white; padding: 20px 20px; height: 90vh;"
  >
    <a-list-item
      v-for="(item, index) in data"
      :key="index"
    >
      <a-list-item-meta
        :description="item.description || '功能开发'"
      >
        <router-link slot="title" :to="item.url || '#'">{{ item.title }}</router-link>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          title: '动态表格1',
          url: '/page1'
        },
        {
          title: '大模型交互',
          url: '/page2'
        },
        {
          title: '动态表格3',
          url: '/page3'
        },
        {
          title: '动态表格4',
          url: '/page4'
        },
        {
          title: '动态表格4',
          url: '/page5'
        },
        {
          title: '高德地图',
          url: '/page6'
        }
      ]
    }
  }
}
</script>
