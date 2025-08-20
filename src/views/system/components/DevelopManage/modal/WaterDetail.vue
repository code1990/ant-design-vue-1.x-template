<template>
  <div>
    <a-modal
      v-model="visible"
      :mask="false"
      :title="title"
      on-ok="handleOk"
      :width="800"
      :bodyStyle="{ height: '400px', overflowY: 'auto' }"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <div style="width: 40%; float: left">
        <a-row v-for="(item, index) in pipelineInfo" :key="index" style="margin-bottom: 4px">
          <a-col :span="12" style="padding: 5px">{{ item.label }}：</a-col>
          <a-col :span="12" style="padding: 5px">{{ item.value }}</a-col>
        </a-row>
      </div>
      <div style="width: 60%; float: left;  height: 100%">
        <svg width="400" height="400" style=" margin-top: -7%;">


          <!-- 箭头定义 -->
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="red" />
            </marker>
          </defs>

          <!-- 管线（↙方向） -->
          <line x1="340" y1="60" x2="60" y2="340" stroke="black" stroke-width="10" />

          <!-- 虚线箭头（流向：右上 -> 左下） -->
          <line x1="340" y1="60" x2="60" y2="340" stroke="red" stroke-width="2" class="arrow" />

          <!-- 起点标注（右上角） -->
          <text x="340" y="85" class="label">起点号</text>
          <text x="325" y="100" class="label">JGLWS1141</text>
          <text x="325" y="115" class="label">埋深:4.41m</text>

          <!-- 终点标注（左下角） -->
          <text x="50" y="355" class="label">终点号</text>
          <text x="50" y="370" class="label">JGLWS1443</text>
          <text x="50" y="385" class="label">埋深:4.09m</text>
          <text x="20" y="290" class="label">营道直径:600</text>

          <text x="20" y="45" class="label">管道类别：污水</text>
          <text x="20" y="60" class="label">材质：PE</text>
          <text x="20" y="75" class="label">流向：正向</text>
          <text x="20" y="90" class="label">理设：直埋</text>
          <!-- 中部标注，跟随 ↙ 方向旋转 -->
          <text x="180" y="180" class="label" transform="rotate(-45 200,200)">
            管道长度：39.57m
          </text>
        </svg>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      title: '管网详情',
      pipelineInfo: [
        {
          label: '管线大类',
          value: '排水',
        },
        {
          label: '管线子类',
          value: '污水',
        },
        {
          label: '超点号',
          value: 'JGLWS1141',
        },
        {
          label: '终点号',
          value: 'JGLWS1443',
        },
        {
          label: '起点理深',
          value: '4.41 m',
        },
        {
          label: '终点理深',
          value: '4.09 m',
        },
        {
          label: '起点高程',
          value: '40.807 m',
        },
        {
          label: '终点高程',
          value: '39.922 m',
        },
        {
          label: '管道直径',
          value: '600',
        },
        {
          label: '管线材质',
          value: 'PE',
        },
      ],
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel(e) {
      this.visible = false
    },
  },
}
</script>
<style scoped>
.label {
  font-size: 12px;
  font-family: Arial, sans-serif;
  fill: #000;
}

.arrow {
  stroke-dasharray: 5 5;
  marker-end: url(#arrowhead);
}
</style>
