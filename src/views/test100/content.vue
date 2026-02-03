<template>
  <div class="tag-dashboard">
    <a-row :gutter="16">
      <!-- 循环渲染三个容器：变量、常量、设备 -->
      <a-col :span="8" v-for="(section, sIndex) in sections" :key="sIndex">
        <div class="section-container">
          <!-- 头部：左侧文字 + 右侧按钮 -->
          <div class="section-header">
            <span class="title">{{ section.name }}</span>
            <a-button type="link" size="small" @click="toggleSection(sIndex)">
              {{ isAllExpanded(sIndex) ? '全部收起' : '全部展开' }}
            </a-button>
          </div>

          <!-- 自定义折叠面板区域 -->
          <div class="section-body">
            <div class="custom-collapse">
              <div
                v-for="panel in section.panels"
                :key="panel.id"
                class="custom-collapse-panel"
              >
                <!-- 自定义面板头部 -->
                <div
                  class="custom-collapse-header"
                  @click="togglePanel(section, panel.id)"
                >
                  <span class="panel-title">{{ panel.title }}({{ section.panels.length }})</span>
                  <a-icon
                    type="caret-down"
                    :class="{ rotated: section.expandedPanels.includes(panel.id) }"
                    class="expand-icon"
                  />
                </div>

                <!-- 自定义面板内容 -->
                <transition name="slide-fade">
                  <div
                    v-show="section.expandedPanels.includes(panel.id)"
                    class="custom-collapse-content"
                  >
                    <div class="tag-wrapper">
                      <a-tag
                        v-for="(tag, tIndex) in panel.tags"
                        :key="tIndex"
                        :color="tag.color || 'blue'"
                      >
                        {{ tag.label }}
                      </a-tag>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟三个容器的数据
      sections: [
        {
          name: '变量标签',
          totalCount: 16,
          expandedPanels: [], // 当前展开的面板ID集合
          panels: [
            { id: 'v1', title: '环境参数', tags: [{label: 'Temp'}, {label: 'Humi'}, {label: 'CO2'}] },
            { id: 'v2', title: '电力指标', tags: [{label: 'Volt'}, {label: 'Curr'}] },
            { id: 'v3', title: '运行状态', tags: [{label: 'Run'}, {label: 'Stop'}, {label: 'Err'}] }
          ]
        },
        {
          name: '常量标签',
          totalCount: 12,
          expandedPanels: [],
          panels: [
            { id: 'c1', title: '系统配置', tags: [{label: 'Version', color: 'orange'}, {label: 'Build'}] },
            { id: 'c2', title: '阈值设定', tags: [{label: 'Max'}, {label: 'Min'}] }
          ]
        },
        {
          name: '设备标签',
          totalCount: 8,
          expandedPanels: [],
          panels: [
            { id: 'd1', title: '网关 A', tags: [{label: 'GW-01', color: 'green'}] },
            { id: 'd2', title: '传感器 B', tags: [{label: 'SN-99'}] }
          ]
        }
      ]
    };
  },
  methods: {
    // 判断当前容器是否已全部展开
    isAllExpanded(sIndex) {
      const section = this.sections[sIndex];
      return section.expandedPanels.length === section.panels.length;
    },
    // 切换全部展开/收起
    toggleSection(sIndex) {
      const section = this.sections[sIndex];
      if (this.isAllExpanded(sIndex)) {
        // 如果已经是全开，则清空数组（收起全部）
        section.expandedPanels = [];
      } else {
        // 否则，将所有面板的 ID 放入数组（展开全部）
        section.expandedPanels = section.panels.map(p => p.id);
      }
    },
    // 切换单个面板的展开/收起
    togglePanel(section, panelId) {
      const index = section.expandedPanels.indexOf(panelId);
      if (index > -1) {
        // 如果已展开，则收起
        section.expandedPanels.splice(index, 1);
      } else {
        // 如果未展开，则展开
        section.expandedPanels.push(panelId);
      }
    }
  }
};
</script>

<style scoped lang="less">
.tag-dashboard {

  .section-container {
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    min-height: 400px;
    display: flex;
    flex-direction: column;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #e8e8e8;
      background: #fff;

      .title {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }

    .section-body {
      flex: 1;
      overflow-y: auto;
    }

    .custom-collapse {
      width: 100%;
    }

    .custom-collapse-panel {
      border-bottom: 1px solid #e8e8e8;
      &:last-child {
        border-bottom: none;
      }
    }

    .custom-collapse-header {
      display: flex;
      justify-content: space-between; // 关键：让标题和图标分别在两边
      align-items: center;
      padding: 8px 16px;
      background-color: #fff;
      cursor: pointer;
      user-select: none;
      font-size: 13px;
      border-radius: 4px; // 可选：给头部加点圆角

      &:hover {
        background-color: #f0f0f0; // 鼠标悬停效果
      }
    }

    .panel-title {
      flex: 1; // 让标题占据剩余空间
      text-align: left;
      margin-right: 8px; // 给图标留点空间
    }

    .expand-icon {
      font-size: 12px;
      transition: transform 1s ease; // 添加旋转过渡效果
    }

    .expand-icon.rotated {
      transform: rotate(-180deg); // 旋转180度表示展开状态
    }

    .custom-collapse-content {
      padding: 12px;
      background-color: #fff;
    }

    .tag-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      /deep/ .ant-tag {
        margin-right: 0; // 使用 gap 控制间距
        margin-bottom: 4px;
      }
    }
  }
}

/* 定义滑动淡入淡出动画 */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
