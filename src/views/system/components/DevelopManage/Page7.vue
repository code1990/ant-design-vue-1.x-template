<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
    <a-modal
      :visible="visible"
      :mask="false"
      :width="300"
      :confirm-loading="confirmLoading"
      :body-style="{ height: '450px', overflowY: 'auto' }"
      :wrap-style="{ marginLeft: '-70%' }"
      :footer="null"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title>
        <div style="display: flex; align-items: center; color: white">
          <span style="font-weight: bold; font-size: 16px">监测设备</span>
          &nbsp;&nbsp;
          <!--          <img src="logo.png" alt="logo" style="width:24px; height:24px; margin-right:8px;" />-->
          <span style="font-weight: bold; font-size: 12px">共37条记录</span>
          <!-- 你还可以放其他元素，比如按钮、图标 -->
        </div>
      </template>
      <div style="width: 100%; display: flex">
        <a-button
          @click="getType(1)"
          :style="[baseStyle, activeType === 1 ? activeStyle : inactiveStyle]"
        >
          区域
        </a-button>
        <a-button
          @click="getType(2)"
          :style="[baseStyle, activeType === 2 ? activeStyle : inactiveStyle]"
        >
          类别
        </a-button>
      </div>
      <div style="width: 100%; display: flex; padding: 10px 0">
        <a-select
          v-model="riverTypes"
          show-search
          :showArrow="true"
          :maxTagTextLength="4"
          :maxTagCount="1"
          mode="multiple"
          @change="handleRiverChange"
          style="width: 60%; z-index: 99999; cursor: pointer; background-color: #000000"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择状态"
          allow-clear
          tree-default-expand-all
        >
          <a-select-option v-for="(d, index) in riverTypeOptions" :key="index" :value="d.dictValue">
            {{ d.dictLabel }}
          </a-select-option>
        </a-select>
        <a-input-search
          placeholder="请输入设备名称"
          style="width: 200px; margin-left: 10px"
          @search="onSearch"
        />
      </div>
      <div v-if="this.activeType === 1" style="width: 100%; height: 300px; overflow-y: auto">
        <a-collapse v-model="activeKey" :expand-icon-position="'right'">
          <a-collapse-panel key="1" header="This is panel header 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="This is panel header 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="This is panel header 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div v-if="this.activeType === 2" style="width: 100%; height: 300px; overflow-y: auto">
        <a-collapse v-model="activeKey" :expand-icon-position="'right'">
          <a-collapse-panel key="1" header="This is panel heaXXXder 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="This is panel heaXXder 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="This is panel heXader 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="This is panel heaXXder 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="This is panel heXader 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="This is panel heaXXder 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="This is panel heXader 1">
            <p>{{ text }}</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div>
        <a-collapse :activeKey="activeKeys" @change="onCollapseChange" :expand-icon-position="'right'">
          <a-collapse-panel v-for="panel in panels" :key="panel.id" :header="panel.header" >
            <div>
              <template v-if="panel.loading">加载中...</template>
              <template v-else>{{ panel.content }}</template>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      isVisible: false,
      title: '监测分布',
      size: 'small',
      riverTypes: [],
      text: `A dog `,
      activeKey: ['1'],
      riverTypeOptions: [],
      show: false,
      panels: [
        {
          id: '1',
          header: '面板一',
          content: '',
          loading: false,
        },
        {
          id: '2',
          header: '面板二',
          content: '',
          loading: false,
        },
        {
          id: '3',
          header: '面板三',
          content: '',
          loading: false,
        },
      ],
      activeKeys: [],
      activeType: 1,
      baseStyle: {
        width: '50%',
        borderRadius: '0',
        border: '1px solid #ddd',
        fontWeight: 'bold',
      },
      activeStyle: {
        backgroundColor: '#1c3666',
        color: '#fff',
        borderColor: '#1c3666',
      },
      inactiveStyle: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        borderColor: '#ddd',
      },
      expandIconPosition: 'right',
    }
  },
  watch: {
    activeKey(key) {
      console.log(key)
    },
  },
  mounted() {
    this.loadData()
    const targetCell = document.querySelector('.tdt-iconLayers-layerCell[data-layerid="496"]')
    const allCells = document.querySelectorAll('.tdt-iconLayers-layerCell')

    targetCell.addEventListener('mouseenter', () => {
      allCells.forEach(cell => {
        cell.classList.remove('tdt-iconLayers-layerCell_hidden')
      })
    })

    // targetCell.addEventListener('mouseleave', () => {
    //   allCells.forEach(cell => {
    //     const id = cell.getAttribute('data-layerid')
    //     // && id !== '496'
    //     if (id !== '496') {
    //       cell.classList.add('tdt-iconLayers-layerCell_hidden')
    //     }
    //   })
    // })

    targetCell.addEventListener('mouseleave', (event) => {
      const related = event.relatedTarget
      // 如果离开后鼠标仍然在图层项（含子元素）上，则不隐藏
      if (related && related.closest('.tdt-iconLayers-layerCell')) {
        return
      }

      // 真正移出了整个图层区域，才隐藏
      allCells.forEach(cell => {
        const id = cell.getAttribute('data-layerid')
        if (id !== '496') {
          cell.classList.add('tdt-iconLayers-layerCell_hidden')
        }
      })
    })

    const layerCells = document.querySelectorAll('.tdt-iconLayers-layerCell')
    const displayCell = document.querySelector('.tdt-iconLayers-layerCell[data-layerid="496"]') // 固定展示位
    const vm = this // ✅ 保存 Vue 实例
    layerCells.forEach(cell => {
      cell.addEventListener('click', () => {
        const clickedId = cell.getAttribute('data-layerid')
        if (clickedId === '496') return // 如果点的是显示项自己，忽略

        // 1. 取出两个项中的 DOM 元素
        const clickedLayer = cell.querySelector('.tdt-iconLayers-layer')
        const clickedTitle = cell.querySelector('.tdt-iconLayers-layerTitle')

        const displayLayer = displayCell.querySelector('.tdt-iconLayers-layer')
        const displayTitle = displayCell.querySelector('.tdt-iconLayers-layerTitle')

        // 2. 交换背景图
        const tempBg = clickedLayer.style.backgroundImage
        clickedLayer.style.backgroundImage = displayLayer.style.backgroundImage
        displayLayer.style.backgroundImage = tempBg

        // 3. 交换文字
        const tempText = clickedTitle.textContent
        clickedTitle.textContent = displayTitle.textContent
        displayTitle.textContent = tempText

        // 4. 交换 data-layerid 属性
        // let tempId = cell.getAttribute('data-layerid')
        // const text = cell.
        // cell.setAttribute('data-layerid', displayCell.getAttribute('data-layerid'))
        // displayCell.setAttribute('data-layerid', tempId)
        // console.error('tempId', tempId, tempText)
        const mapTextToId = {
          '地图': '495',
          '卫星': '496',
          '卫星混合': '497',
          '地形': '498',
          '地形混合': '499',
          '3D地图': '500'
        }

        const tempId = mapTextToId[tempText.trim()]
        // 5. 切换地图图层（使用交换后的 displayId）
        switch (tempId) {
          case '495':
          case '496':
          case '497':
          case '498':
          case '499':
            vm.mapEngine = 'tdt'
            vm.map.setMapType(vm.getTdtMapType(tempId))
            break
          case '500':
            vm.enable3D()
            break
        }
      })
    })
  },
  methods: {
    getTdtMapType(layerId) {
      switch (layerId) {
        case '495': return window.TMAP_NORMAL_MAP
        case '496': return window.TMAP_SATELLITE_MAP
        case '497': return window.TMAP_HYBRID_MAP
        case '498': return window.TMAP_TERRAIN_MAP
      }
    },
    enable3D() {
      console.error('enable3D')
      this.mapEngine = 'amap'
      this.initAMap()
    },
    initAMap: function() {
      // 2. 加载高德地图
      window._AMapSecurityConfig = {
        securityJsCode: '918e06e377d6810950186a7dc0fd77c4'
      }
      // console.error('xxxxx', this.center)
      AMapLoader.load({
        key: '7ce54c8adc8928c7730ff0272098dde0',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.ControlBar', 'AMap.ToolBar', 'AMap.MapType']
      }).then((AMap) => {
        // ✅ 标准图层（默认）
        const vecLayer = new AMap.TileLayer() // 等价于标准图
        const roadNet = new AMap.TileLayer.RoadNet()

        // ✅ 卫星图层组（需要组合）
        const satelliteLayer = new AMap.TileLayer.Satellite()
        const satelliteRoadNet = new AMap.TileLayer.RoadNet()

        // ✅ 初始化地图，默认加载标准图层
        this.amap = new AMap.Map('map_box2', {
          viewMode: '3D',
          zoom: 16,
          center: [113.280637, 23.125178],
          layers: [vecLayer, roadNet],
          pitch: 75,
          rotation: 60,
          showBuildingBlock: true
        })

        // ✅ 添加图层切换控件，传入图层组
        const mapType = new AMap.MapType({
          defaultType: 0, // 0：默认标准图，1：默认卫星图
          showRoad: true, // 是否显示路网图层（必须 true 才有路名）
          layers: [
            [vecLayer, roadNet], // 标准图
            [satelliteLayer, satelliteRoadNet] // 卫星图（含标注）
          ]
        })
        const buildings = new AMap.Buildings({
          zIndex: 110,
          heightFactor: 2,
          visible: true
        })
        this.amap.add(buildings)
        this.amap.addControl(mapType)

        // ✅ 其他控件
        this.amap.addControl(new AMap.Scale())
        this.amap.addControl(new AMap.ToolBar())
        this.amap.addControl(new AMap.ControlBar())
        // this.mapEngine = 'amap'
      }).catch(err => {
        console.error('加载高德地图失败', err)
      })
    },
    onCollapseChange(keys) {
      this.activeKeys = keys

      // 遍历所有展开的key，异步加载数据
      keys.forEach(key => {
        const panel = this.panels.find(p => p.id === key)
        if (panel && !panel.content && !panel.loading) {
          // 标记加载中
          this.$set(panel, 'loading', true)

          // 模拟异步请求
          setTimeout(() => {
            // 假设请求回来内容
            const content = `这是${
              panel.header
            }的异步内容，加载于 ${new Date().toLocaleTimeString()}`

            this.$set(panel, 'content', content)
            this.$set(panel, 'loading', false)
          }, 1000)
        }
      })
    },
    async loadData() {
      try {
        const res = await this.$axios.get('/api/panel-list')
        this.panels = res.data.data
      } catch (err) {
        this.$message.error('加载面板数据失败')
      }
    },
    getType(type) {
      this.activeType = type
      console.log('当前选中类型:', type)
    },
    handleClick(event) {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation()
    },
    onSearch(value) {
      console.log(value)
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    handleRiverChange(value) {
      console.log(`Selected: ${value}`)
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .ant-modal-header {
  background-color: #1c3666;
  color: white;
  padding: 10px 10px;
}

/deep/ .ant-modal-body {
  padding: 15px 15px;
}

//
/deep/ .ant-modal-close {
  color: white;
  margin-top: -5px;
}

/deep/ .ant-collapse-arrow {
  display: inline-block !important;
  font-size: 12px;
  transform: rotate(0deg); /* 保持默认箭头方向 */
}

/deep/ .ant-collapse {
  background-color: #ffffff;
}

.custom-map-type-container {
  position: absolute;
  top: 100px;
  right: 0;
  z-index: 1000;
}

.map-type-trigger {
  background: #007bff;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: upright;
  border-radius: 6px 0 0 6px;
}

.custom-map-type-panel {
  position: absolute;
  top: 0;
  right: 40px;
  width: 160px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  border-radius: 6px 0 0 6px;
}

.custom-map-type-panel button {
  display: block;
  width: 100%;
  margin: 6px 0;
  padding: 6px 8px;
  background: #f0f0f0;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
}
.custom-map-type-panel button:hover {
  background: #d0e2ff;
}

/* 动画：右侧滑出 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.map-panel {
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 80px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 5px #000;
}
</style>
