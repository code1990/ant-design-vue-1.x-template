<template>
  <a-modal v-model="visible" width="441px" @cancel="handleCancel">
    <!-- 自定义 Header -->
    <template #title>
      <div class="custom-header">
        <div class="left">
          <span class="title-text">{{ detail.stationName || '测站详情' }}</span>
        </div>
      </div>
    </template>
    <div v-if="loading">加载中...</div>
    <div v-else class="item-content">
      <!--      <div class="title">{{ detail.stationName }}</div>-->
      <div class="body">
        <a-tabs default-active-key="1" :tabBarGutter="0">
          <!-- 测站信息 -->
          <a-tab-pane key="1" tab="测站信息">
            <div class="param">测站地址：{{ detail.stationAddress }}</div>
            <div class="param" style="justify-content: space-between">
              <div>测站类型：{{ dictFormat(stationTypeOptions, detail.stationType) }}</div>
              <div>上次报送时间：{{ detail.lastReportTime }}</div>
            </div>
            <div class="param">
              <div
                class="label"
                v-for="(channel, cindex) in detail.channels"
                :key="cindex"
                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
              >
                {{ channel.t }}：{{ channel.v }}
                <span v-if="channel.u">（{{ channel.u }}）</span>
              </div>
            </div>
            <div class="param">
              <div>
                视频：
                <a-button type="link" v-if="!detail.camUrl1 && !detail.camUrl2 && !detail.camUrl3">
                  未关联视频
                </a-button>
                <a-button type="link" v-if="detail.camUrl1" @click="viewCam(detail.camUrl1)">
                  视频1
                </a-button>
                <a-button type="link" v-if="detail.camUrl2" @click="viewCam(detail.camUrl2)">
                  视频2
                </a-button>
                <a-button type="link" v-if="detail.camUrl3" @click="viewCam(detail.camUrl3)">
                  视频3
                </a-button>
              </div>
            </div>
          </a-tab-pane>

          <!-- 设备信息 -->
          <a-tab-pane key="2" tab="设备信息">
            <div class="param">设备编码：{{ detail.deviceSn }}</div>
            <div class="param">设备名称：{{ detail.deviceName }}</div>
            <div class="param">通道：{{ channelFormat(detail) }}</div>
            <div class="param">测站：{{ detail.stationName }}</div>
            <div class="param">
              厂商：{{ dictFormat(manufacturerOptions, detail.manufacturer) }}
            </div>
            <div class="param">卡号：{{ detail.deviceModel }}</div>
          </a-tab-pane>

          <!-- 通讯信息 -->
          <a-tab-pane key="3" tab="通讯信息" v-if="checkNode(detail.channels)">
            <div class="param" v-for="(item, index3) in ledList" :key="index3">
              {{ item.key }}：
              <span :style="{ color: item.value === '正常' ? '#009933' : '#B9B9B9' }">
                {{ item.value }}
              </span>
            </div>
            <div class="param">
              <span>LED屏亮度控制：</span>
              <span class="led-btn" style="color: #ff4d4f" @click="changeLight(detail, 3)">
                最亮
              </span>
              <span class="led-btn" style="color: #52c41a" @click="changeLight(detail, 2)">
                中等
              </span>
              <span class="led-btn" style="color: #8c8c8c" @click="changeLight(detail, 1)">
                最暗
              </span>
            </div>
            <div class="param">
              <span>LED屏分页控制：</span>
              <span
                v-for="n in 5"
                :key="n"
                class="led-btn"
                style="color: #52c41a"
                @click="changeLight(detail, 10 + n)"
              >
                第{{ n }}页
              </span>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!-- ✅ 自定义 footer -->
    <template slot="footer">
      <a-button type="link" @click="showWarnDialog">
        <a-icon type="warning" />
        预警信息
      </a-button>
      <a-button type="link" @click="showWorkOrderDialog">
        <a-icon type="file-done" />
        工单信息
      </a-button>
      <a-button type="link" @click="showHistoryDialog">
        <a-icon type="history" />
        历史过程[事件分析]
      </a-button>
    </template>
    <div class="alarmflag">
      <div v-if="detail.onlineStatus == 0" :class="'alarmlabel offline'">离线</div>
      <div
        v-if="detail.onlineStatus != 0"
        :class="detail.severity ? 'alarmlabel alarm' + detail.severity : 'alarmlabel normal'"
      >
        {{ dictFormat(alarmLevelOptions, detail.severity) }}
      </div>
    </div>
  </a-modal>
</template>

<script>
// import { getStationDetail } from '@/api/station' // 假设的接口方法

export default {
  name: 'StationDetailModal',
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ['update:visible'],
  data() {
    return {
      visible: false,
      loading: false,
      detail: {}, // 后端返回的数据
      stationTypeOptions: [],
      manufacturerOptions: [],
      ledList: [],
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) {
        this.fetchData()
      }
    },
  },
  methods: {
    open() {
      this.visible = true
    },
    showWarnDialog() {},
    showWorkOrderDialog() {},
    showHistoryDialog() {},
    async fetchData() {
      this.loading = true
      try {
        const res = {} // await getStationDetail(this.id)
        this.detail = res.data || {}
        this.detail = {
          stationName: '水校猎德',
          stationAddress: '广东省广州市天河区临江大道猎德段',
          onlineStatus: 1,
          deviceSn: '0044019005',
          deviceName: '0044019005',
          lastReportTime: '2025-07-29 17:12:03',
          deviceModel: '89860485192091844585',
          channels: [
            {
              t: '雨量',
              v: '0',
              u: 'mm',
            },
            {
              t: '流量',
              v: '0.87',
              u: 'm³/s',
            },
            {
              t: '流速',
              v: '0.744',
              u: 'm/s',
            },
            {
              t: '水位水深',
              v: '0.383',
              u: 'm',
            },
            {
              t: '电池电压',
              v: '12.59',
              u: 'v',
            },
          ],
        }
        this.stationTypeOptions = res.dicts?.stationType || []
        this.manufacturerOptions = res.dicts?.manufacturer || []
        this.ledList = res.ledList || []
      } finally {
        this.loading = false
      }
    },
    handleCancel() {
      // this.$emit('update:visible', false)
      this.visible = false
    },
    viewCam(url) {
      if (url) window.open(url, '_blank')
    },
    changeLight(node, level) {
      this.$emit('change-light', {
        node,
        level,
      })
    },
    dictFormat(options, id) {
      if (id) {
        // return this.selectDictLabel(options, id)
      } else {
        return '正常'
      }
    },
    // dictFormat(list, val) {
    //   const item = list?.find(v => v.value === val)
    //   return item ? item.label : '--'
    // },
    channelFormat(node) {
      // return node.channels?.map(c => `${c.t}:${c.v}`).join(',') || '--'
      return '雨量,流量,流速,水位水深,电池电压'
    },
    checkNode(channels) {
      return Array.isArray(channels) && channels.length > 0
    },
  },
}
</script>

<style scoped>
.param {
  margin-bottom: 8px;
}

.led-btn {
  width: 40px;
  cursor: pointer;
  margin-right: 5px;
}

.custom-header {
  width: 441px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #fff;
  padding-left: 10px;
  background: #01a5fe;
}

::v-deep .ant-modal-header {
  padding: 0;
}

::v-deep .ant-modal-close-x {
  width: 30px;
  height: 20px;
  line-height: 30px;
  color: white;
}

::v-deep .ant-modal-body {
  padding-top: 0;
  padding-bottom: 0;
}

::v-deep .ant-tabs-nav .ant-tabs-tab-active {
  color: #4364ed !important;
}

.alarmflag {
  border-width: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 81px;
  height: 81px;
  overflow-x: hidden;
  overflow-y: hidden;

  .alarm3 {
    background: #f2394c;
    font-size: 13px;
  }

  .normal {
    background: rgb(0, 153, 51);
    font-size: 13px;
  }

  .alarm1 {
    background: rgb(24, 144, 255);
    font-size: 13px;
  }

  .offline {
    background: rgb(185, 185, 185);
    font-size: 13px;
  }

  .alarm2 {
    background: #f0ad4e;
    font-size: 13px;
  }

  .alarmlabel {
    transform: rotate(45deg);
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #fff;
    left: -7px;
    position: absolute;
    top: 17px;
    text-align: center;
  }
}

.param {
  display: flex;
  align-items: center;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #333333;
  line-height: normal;
  font-size: 12px;
  flex-wrap: wrap;

  .label {
    width: 50%;
    padding: 3px;
  }

  .ant-btn-link {
    color: #1890ff;
    font-size: 12px;
  }
}
</style>
