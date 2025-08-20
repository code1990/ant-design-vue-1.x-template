<template>
  <div>
    <a-card title="百度深色地图" :bordered="false" style="height: 100%">
      <div style="margin-bottom: 12px">
        <a-switch
          v-model="darkMode"
          checked-children="暗色"
          un-checked-children="明色"
          @change="toggleDark"
        />
      </div>
      <div id="map_box3" style="width: 100%; height: 200px" />
    </a-card>
    <a-card>
      <div style="width: 10%; float: left">
        <WaterDetail ref="waterDetail"></WaterDetail>
        <a-button @click="$refs.waterDetail.open()">管点详情页</a-button>
      </div>
      <div style="width: 10%; float: left">
        <WaterSearch ref="waterSearch"></WaterSearch>
        <a-button @click="$refs.waterSearch.open()">管线快速查询</a-button>
      </div>
      <div style="width: 10%; float: left">
        <MapLayerManage></MapLayerManage>
      </div>
      <div style="width: 10%; float: left"></div>
    </a-card>
    <a-card>
      <!--      <ShpZipViewer zipUrl="/data/PS_211.zip" />-->
      <GeoZipViewer zipUrl="/data/PS_211_JSON.zip" />
    </a-card>
    <!--    <a-card>-->
    <!--      <WaterMenu ref="waterMenu"></WaterMenu>-->
    <!--    </a-card>-->
  </div>
</template>

<script>
import { BaiduMap } from '@/utils/baiduMap'
import MarkerSvg from '@/assets/ZZ_1.svg' // 替换为你实际的 icon 文件路径
// import { getInfo } from "@/api/yourapi"; // 替换为你的接口方法
import WaterDetail from '@/views/system/components/DevelopManage/modal/WaterDetail.vue'
import WaterSearch from '@/views/system/components/DevelopManage/modal/WaterSearch.vue'
import WaterMenu from '@/views/system/components/DevelopManage/modal/WaterMenu.vue'
import MapLayerManage from '@/views/system/components/DevelopManage/modal/MapLayerManage.vue'
import ShpZipViewer from '@/views/system/components/DevelopManage/ShpZipViewer.vue'
import GeoZipViewer from '@/views/system/components/DevelopManage/GeoZipViewer.vue'

const mapvgl = require('mapvgl')
export default {
  name: 'DarkBMap',
  components: {
    GeoZipViewer,
    ShpZipViewer,
    WaterDetail,
    WaterSearch,
    WaterMenu,
    MapLayerManage,
  },
  data() {
    return {
      bdmap: null,
      view: null,
      layer: null,
      waveLayer: null,
      darkLayer: null,
      darkMode: true,
      curStationId: -1,
      itemShow: false,
      curItem: null,
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap: function () {
      // https://mapv.baidu.com/gl/docs/PolygonLayer.html
      BaiduMap('XffVDo6bSoGTt7evlrVGmuoGg1YRYf6F').then(BMapGL => {
        var map = (this.bdmap = new BMapGL.Map('map_box3'))
        this.bdmap.BMapGL = BMapGL
        map.centerAndZoom(new BMapGL.Point(113.280637, 23.125178), 8)
        map.enableScrollWheelZoom(true)
        map.setHeading(0)
        map.setTilt(0)
        map.setMapStyleV2({
          styleId: '3ba5fdaa9a39e8984cbc525ead281561',
        })
        map.addEventListener('click', function (e) {})
        this.view = new mapvgl.View({
          map: map,
        })
        this.waveLayer = new mapvgl.CircleLayer({
          type: 'wave',
          radius: 25,
          duration: 1,
          trail: 1,
          data: [],
          enablePicked: true,
          selectedColor: 'rgb(161, 234, 197)', // 选中项颜色
          autoSelect: true, // 根据鼠标位置来自动设置选中项
          onClick: e => {},
        })
        // view.addLayer(this.waveLayer)
        var layer = (this.layer = new mapvgl.IconLayer({
          width: 20,
          height: 20,
          offset: [0, 0],
          opacity: 0.8,
          icon: MarkerSvg,
          enablePicked: true, // 是否可以拾取
          selectedIndex: -1, // 选中项
          selectedColor: 'rgba(161, 234, 197, 0.1)', // 选中项颜色
          autoSelect: true, // 根据鼠标位置来自动设置选中项
          onClick: e => {
            // 点击事件
            if (e.dataItem) {
              location.href = '/index?_tc=' + e.dataItem.stationId
            } else {
              this.itemShow = false
              this.curStationId = -1
            }
          },
          onMousemove: e => {
            // 点击事件
            if (e.dataIndex === -1) {
              // this.itemShow = false
              // this.curStationId = -1
            } else if (this.curStationId !== e.dataItem.stationId) {
              this.curStationId = e.dataItem.stationId
              // getInfo(e.dataItem.stationId).then(res => {
              //   Vue.set(e.dataItem, 'node', res.data)
              //   this.itemShow = true
              //   this.curItem = e.dataItem
              //   this.$nextTick(function () {
              //     const coordinates = e.dataItem.geometry.coordinates
              //     const point = new BMapGL.Point(coordinates[0], coordinates[1])
              //     const label = new BMapGL.CustomOverlay(this.createDOM, {
              //       point: point,
              //       offsetX: 220
              //     })
              //     this.bdmap.addOverlay(label)
              //   })
              // })
            }
          },
          onDblClick: e => {
            console.log('double click', e)
          },
          onRightClick: e => {
            console.log('right click', e)
          },
        }))
        // 构建 geojson 数据（这里用的是一个示例）
        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: '区域A' },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [113.3235, 23.1085],
                    [113.3255, 23.1085],
                    [113.3255, 23.11],
                    [113.3235, 23.11],
                    [113.3235, 23.1085],
                  ],
                ],
              },
            },
          ],
        }

        // 将 GeoJSON 转换为 mapvgl 支持的点位数据
        const geoJSONData = []

        geojson.features.forEach(feature => {
          const coords = feature.geometry.coordinates[0] // Polygon
          coords.forEach(coord => {
            geoJSONData.push({
              geometry: {
                type: 'Point',
                coordinates: coord,
              },
              properties: feature.properties,
            })
          })
        })

        // 创建图层（可以用 mapvgl.SimplePointLayer、PolygonLayer 等）
        const polygonLayer = new mapvgl.PolygonLayer({
          style: {
            fill: 'rgba(255, 0, 0, 0.5)', // 填充红色
            stroke: '#FFD700', // 金色边框
            strokeWidth: 2,
          },
        })

        polygonLayer.setData(
          geojson.features.map(feature => ({
            geometry: {
              type: feature.geometry.type,
              coordinates: feature.geometry.coordinates,
            },
            properties: feature.properties,
          }))
        )

        this.wsLayer = new mapvgl.PolygonLayer({
          lineColor: 'rgba(250, 250, 25, 0.6)',
          lineWidth: 4,
          fillColor: 'rgba(252, 128, 186, 0.6)',
          data: [
            {
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [113.3235, 23.1085],
                    [113.3255, 23.1085],
                    [113.3255, 23.11],
                    [113.3235, 23.11],
                    [113.3235, 23.1085],
                  ],
                ],
              },
              properties: {
                height: 0, // 多边形高度
              },
            },
          ],
        })

        this.ysLayer = new mapvgl.LineLayer({
          color: 'rgba(255, 127, 0, 1)',
          blend: 'lighter',
          width: 6, // ✅ 加粗线宽
          // data: [{
          //   geometry: {
          //     type: 'LineString',
          //     coordinates: [
          //       [113.55203046116438, 23.109548755176263],
          //       [113.55203854413878, 23.10954967051704],
          //       [113.55204667633244, 23.109550064188113],
          //       [113.55205481844395, 23.109549934286942],
          //       [113.55206293112394, 23.10954928144132],
          //       [113.55207097516534, 23.109548108806322],
          //       [113.55207891169277, 23.10954642204907],
          //       [113.55208670235048, 23.109544229321354],
          //       [113.55209430948763, 23.10954154122023],
          //       [113.55210169634044, 23.109538370736782],
          //       [113.55210882720951, 23.10953473319337],
          //       [113.5521156676328, 23.10953064616957],
          //       [113.55212218455173, 23.1095261294172],
          //       [113.55212834647138, 23.109521204764896],
          //       [113.55213412361228, 23.109515896012564],
          //       [113.55213948805468, 23.109510228816426],
          //       [113.55214441387335, 23.109504230564966],
          //       [113.5521488772627, 23.109497930246604],
          //       [113.55215285665219, 23.10949135830959],
          //       [113.5521563328101, 23.109484546514842],
          //       [113.55215928893705, 23.109477527782477],
          //       [113.55216171074663, 23.109470336032675],
          //       [113.55216358653476, 23.109463006021794],
          //       [113.55216490723633, 23.109455573174355],
          //       [113.5521656664687, 23.109448073411873]
          //     ]
          //   }
          // }]
        })
        this.view.addLayer(layer)
        // view.addLayer(this.wsLayer)
        // view.addLayer(this.ysLayer)
        map.setDefaultCursor('default')
        // this.getData(3)
        // this.getBizData()
        // this.loadGeoJSONData()
      })
    },

    toggleDark(checked) {
      if (!this.view || !this.darkLayer) return
      if (checked) {
        this.view.addLayer(this.darkLayer)
      } else {
        this.view.removeLayer(this.darkLayer)
      }
    },

    // 自定义 DOM（必须实现，否则 CustomOverlay 无法渲染）
    createDOM() {
      const div = document.createElement('div')
      div.innerHTML = `<div style="background:#fff;padding:5px;border-radius:4px">详情</div>`
      return div
    },
  },
}
</script>
