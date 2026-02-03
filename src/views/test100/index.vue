<template>
  <div class="guide-tabs-container">
    <!-- 1. 扩展引导区域 (类似上下抽屉) -->
    <transition name="expand-guide">
      <div v-if="showGuide" class="guide-panel">
        <div class="guide-content">
          <a-alert
            message="使用引导"
            :description="rawDescription"
            type="info"
            show-icon
          />
          <!-- 这里可以放更复杂的指导内容，如步骤条等 -->
        </div>
        <div class="guide-footer">
          <a-button type="link" size="small" @click="showGuide = false">收起引导</a-button>
        </div>
      </div>
    </transition>

    <!-- 2. Tabs 区域 -->
    <a-card :bordered="false" class="tabs-card">
      <a-tabs v-model="activeKey" @change="handleTabChange">
        <!-- 右侧额外内容插槽 -->
        <template slot="tabBarExtraContent">
          <a-button
            :type="showGuide ? 'primary' : 'default'"
            icon="question-circle"
            @click="toggleGuide"
          >
            {{ showGuide ? '隐藏引导' : '使用引导' }}
          </a-button>
        </template>

        <a-tab-pane key="1" tab="通用模型库">
          <div class="tab-content-placeholder">
            <!-- 修改这里：使用注册后的组件名 -->
            <ContentComponentName />
          </div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="自建模型库">
          <div class="tab-content-placeholder">
            <ContentComponentName />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
// 导入 lodash (按需或全部)
import _ from 'lodash'
// 导入你的 content 组件，可以重命名以便于注册和使用
import ContentComponentName from '@/views/test100/content.vue'

export default {
  name: 'GuideTabPage',
  // --- 添加 components 注册 ---
  components: {
    ContentComponentName, // 将导入的组件注册到当前实例
    // 如果你想在模板中使用 <content> (小写)，也可以这样写：
    // content: ContentComponentName
    // 但更推荐使用帕斯卡命名法，如 ContentComponentName 或 Content
  },
  data() {
    return {
      activeKey: '1',
      rawDescription: `标签模型库主要服务于协议模型库和配置自定义协议，同时对自动化的变量实现起着重要作用。
标签主要分为三大类，变量标签、常量标签、设备标签。
　1.变量标签：在给设备下发配置后，仍可通过自定义协议、设备端或数据平台修改其数据。
　2.常量标签：给设备下发配置后不可修改。
　3.设备标签：与硬件相关，修改其数据将直接作用与设备硬件配置。
模型库有通用模型库与自建模型库，通用模型库为系统内置模型库，所有用户均可查看和使用。自建模型库为用户自由创建，只可企业内部查看和使用。`,
      showGuide: false,
    }
  },
  methods: {
    toggleGuide() {
      this.showGuide = !this.showGuide
    },
    handleTabChange(key) {
      console.log('当前 Tab:', key)
      // 示例：使用 lodash 处理逻辑
      const debouncedLog = _.debounce(() => {
        console.log('切换完成')
      }, 300)
      debouncedLog()
    },
  },
}
</script>

<style scoped lang="less">
.guide-tabs-container {
  background: #f0f2f5;
  padding: 24px;
  min-height: 100vh;

  // 引导面板样式
  .guide-panel {
    background: #fff;
    border-radius: 2px;
    overflow: hidden; // 必须，否则动画期间内容会溢出
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #e8e8e8;

    .guide-content {
      padding: 20px;
    }

    .guide-footer {
      padding: 0 20px 10px;
      text-align: right;
    }
  }

  .tabs-card {
    /deep/ .ant-card-body {
      padding: 0 24px;
      height: 95vh;
    }
  }

  .tab-content-placeholder {
    padding: 20px 20px;
    text-align: center;
    color: #999;
  }
}

/* 展开/收起动画 (CSS Transition) */
.expand-guide-enter-active,
.expand-guide-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 500px; // 给一个足够大的高度
  opacity: 1;
}

.expand-guide-enter,
.expand-guide-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/deep/ .ant-alert-description {
  white-space: pre-line; /* 保留换行符并将其渲染为换行 */
}
</style>
