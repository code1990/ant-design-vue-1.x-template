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
        },
        {
          title: '地图统计',
          url: '/page7'
        },
        {
          title: '下拉改造',
          url: '/page8'
        },
        {
          title: '污水雨水',
          url: '/page9'
        },
        {
          title: '深色地图',
          url: '/darkMap'
        },
        {
          title: 'openlayer+天地图地图',
          url: '/openTMap'
        },
        {
          title: 'openlayer+高德地图',
          url: '/openAMap'
        },
        {
          title: 'preview地图',
          url: '/previewMap'
        },
        {
          title: '组件弹窗测试中心',
          url: '/modal'
        }
      ]
    }
  }
}
</script>
