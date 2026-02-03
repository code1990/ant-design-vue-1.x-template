<template>
  <div>
    <!-- 触发按钮 -->
    <a-button type="primary" @click="visible = true">选择管线类型</a-button>

    <!-- 唯一的 Modal -->
    <a-modal
      v-model="visible"
      :title="modalTitle"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleOk"
    >
      <!-- 第一层选项 -->
      <div style="margin-bottom: 16px;">
        <a-checkbox
          v-for="opt in options"
          :key="opt.value"
          v-model="opt.checked"
          style="margin-right: 12px;"
          @change="handleOptionChange(opt)"
        >
          {{ opt.label }}
        </a-checkbox>
      </div>

      <!-- 第二层 div (雨水) -->
      <div v-if="showRain" style="margin-bottom: 20px; border:1px solid #eee; padding:10px;">
        <h4 style="margin-bottom:10px;">雨水管线道路</h4>
        <a-checkbox
          v-for="item in rainCheckboxItems"
          :key="item.value"
          v-model="item.checked"
          style="display:block; margin: 6px 0;"
        >
          {{ item.label }}
        </a-checkbox>
      </div>

      <!-- 第二层 div (污水) -->
      <div v-if="showSewage" style="margin-bottom: 20px; border:1px solid #eee; padding:10px;">
        <h4 style="margin-bottom:10px;">污水管线道路</h4>
        <a-checkbox
          v-for="item in sewageCheckboxItems"
          :key="item.value"
          v-model="item.checked"
          style="display:block; margin: 6px 0;"
        >
          {{ item.label }}
        </a-checkbox>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      selectedType: 1, // 默认类型：混合管线

      titles: {
        1: "污水雨水混合管线",
        2: "雨水管线",
        3: "污水管线",
      },

      typeOptions: {
        1: [
          { label: "雨水", value: "rain", checked: false },
          { label: "污水", value: "sewage", checked: false },
        ],
        2: [{ label: "雨水", value: "rain", checked: false }],
        3: [{ label: "污水", value: "sewage", checked: false }],
      },

      options: [],

      showRain: false,
      rainCheckboxItems: [],

      showSewage: false,
      sewageCheckboxItems: [],
    };
  },
  computed: {
    modalTitle() {
      return this.titles[this.selectedType];
    },
  },
  methods: {
    showModal(type) {
      this.selectedType = type;
      this.options = JSON.parse(JSON.stringify(this.typeOptions[type]));
      this.visible = true;
    },

    handleOptionChange(opt) {
      if (opt.value === "rain") {
        if (opt.checked) {
          this.rainCheckboxItems = this.mockRoads("雨水");
          this.showRain = true;
        } else {
          this.showRain = false;
        }
      } else if (opt.value === "sewage") {
        if (opt.checked) {
          this.sewageCheckboxItems = this.mockRoads("污水");
          this.showSewage = true;
        } else {
          this.showSewage = false;
        }
      }
    },

    mockRoads(prefix) {
      return Array.from({ length: 5 }).map((_, i) => ({
        label: `${prefix} 道路${i + 1}`,
        value: `${prefix}_${i}`,
        checked: false,
      }));
    },

    handleOk() {
      const rainSelected = this.rainCheckboxItems
        .filter((i) => i.checked)
        .map((i) => i.label);
      const sewageSelected = this.sewageCheckboxItems
        .filter((i) => i.checked)
        .map((i) => i.label);

      console.log("雨水选择:", rainSelected);
      console.log("污水选择:", sewageSelected);

      this.visible = false;
    },
  },
  mounted() {
    this.showModal(this.selectedType);
  },
};
</script>
