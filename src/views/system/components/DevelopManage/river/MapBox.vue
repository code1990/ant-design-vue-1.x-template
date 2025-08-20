<template>
  <div class="mapMain">
    <div class="mapBox" ref="map" id="map_box2"></div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapBox',
  data() {
    return {
      amap: null,
    }
  },
  mounted() {
    this.initAMap()
  },
  methods: {
    initAMap: function () {
      // 2. 加载高德地图
      window._AMapSecurityConfig = {
        securityJsCode: '918e06e377d6810950186a7dc0fd77c4',
      }
      // console.error('xxxxx', this.center)
      AMapLoader.load({
        key: '7ce54c8adc8928c7730ff0272098dde0',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.ControlBar', 'AMap.ToolBar', 'AMap.MapType'],
      })
        .then(AMap => {
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
            mapStyle: 'amap://styles/darkblue', // 深色主题
            center: [113.280637, 23.125178],
            layers: [vecLayer, roadNet],
            pitch: 0,
            rotation: 0,
            maxZoom: 19,
            // mapStyle: 'amap://styles/whitesmoke', // ✅ 示例：亮色地图
            showBuildingBlock: true,
          })

          // ✅ 添加图层切换控件，传入图层组
          const mapType = new AMap.MapType({
            defaultType: 0, // 0：默认标准图，1：默认卫星图
            showRoad: true, // 是否显示路网图层（必须 true 才有路名）
            layers: [
              [vecLayer, roadNet], // 标准图
              [satelliteLayer, satelliteRoadNet], // 卫星图（含标注）
            ],
          })
          const buildings = new AMap.Buildings({
            zIndex: 110,
            heightFactor: 2,
            visible: true,
          })
          this.amap.add(buildings)
          this.amap.addControl(mapType)

          // ✅ 其他控件
          // 创建比例尺控件并指定位置
          const scale = new AMap.Scale({
            position: 'RB',
          })
          this.amap.addControl(scale)
          this.amap.addControl(new AMap.ToolBar())
          this.amap.addControl(new AMap.ControlBar())

          this.arcgisAWSLayer = new AMap.TileLayer({
            zooms: [6, 21],
            tileSize: 256,
            getTileUrl: function (x, y, z) {
              const tileSize = 256
              const initialResolution = 156543.03392804097
              const originShift = 20037508.3427892

              // 计算每级分辨率
              const resolution = initialResolution / Math.pow(2, z)

              // 计算 bbox
              const minx = x * tileSize * resolution - originShift
              const maxy = originShift - y * tileSize * resolution
              const maxx = (x + 1) * tileSize * resolution - originShift
              const miny = originShift - (y + 1) * tileSize * resolution

              return (
                `/arcgis/rest/services/PS_WS_GCJ02_3857/MapServer/export` +
                `?bbox=${minx},${miny},${maxx},${maxy}` +
                `&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image`
              )
            },
            opacity: 1,
            zIndex: 100,
          })
          this.arcgisAWSLayer.show()
          this.amap.add(this.arcgisAWSLayer)

          this.arcgisAYSLayer = new AMap.TileLayer({
            zooms: [6, 21],
            tileSize: 256,
            getTileUrl: function (x, y, z) {
              const tileSize = 256
              const initialResolution = 156543.03392804097
              const originShift = 20037508.3427892

              // 计算每级分辨率
              const resolution = initialResolution / Math.pow(2, z)

              // 计算 bbox
              const minx = x * tileSize * resolution - originShift
              const maxy = originShift - y * tileSize * resolution
              const maxx = (x + 1) * tileSize * resolution - originShift
              const miny = originShift - (y + 1) * tileSize * resolution

              return (
                `/arcgis/rest/services/PS_YS_GCJ02_3857/MapServer/export` +
                `?bbox=${minx},${miny},${maxx},${maxy}` +
                `&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image`
              )
            },
            opacity: 1,
            zIndex: 100,
          })
          this.arcgisAYSLayer.show()
          this.amap.add(this.arcgisAYSLayer)

          this.arcgisAWSBLayer = new AMap.TileLayer({
            zooms: [6, 21],
            tileSize: 256,
            getTileUrl: function (x, y, z) {
              const tileSize = 256
              const initialResolution = 156543.03392804097
              const originShift = 20037508.3427892

              // 计算每级分辨率
              const resolution = initialResolution / Math.pow(2, z)

              // 计算 bbox
              const minx = x * tileSize * resolution - originShift
              const maxy = originShift - y * tileSize * resolution
              const maxx = (x + 1) * tileSize * resolution - originShift
              const miny = originShift - (y + 1) * tileSize * resolution

              return (
                `/arcgis/rest/services/PS_WSB_GCJ02_3857/MapServer/export` +
                `?bbox=${minx},${miny},${maxx},${maxy}` +
                `&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image`
              )
            },
            opacity: 1,
            zIndex: 100,
          })
          this.arcgisAWSBLayer.hide()
          this.amap.add(this.arcgisAWSBLayer)

          this.arcgisAYSBLayer = new AMap.TileLayer({
            zooms: [6, 21],
            tileSize: 256,
            getTileUrl: function (x, y, z) {
              const tileSize = 256
              const initialResolution = 156543.03392804097
              const originShift = 20037508.3427892

              // 计算每级分辨率
              const resolution = initialResolution / Math.pow(2, z)

              // 计算 bbox
              const minx = x * tileSize * resolution - originShift
              const maxy = originShift - y * tileSize * resolution
              const maxx = (x + 1) * tileSize * resolution - originShift
              const miny = originShift - (y + 1) * tileSize * resolution

              return (
                `/arcgis/rest/services/PS_YSB_GCJ02_3857/MapServer/export` +
                `?bbox=${minx},${miny},${maxx},${maxy}` +
                `&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image`
              )
            },
            opacity: 1,
            zIndex: 100,
          })
          this.arcgisAYSBLayer.hide()
          this.amap.add(this.arcgisAYSBLayer)

          this.arcgisAYS2Layer = new AMap.TileLayer({
            zooms: [6, 21],
            tileSize: 256,
            getTileUrl: function (x, y, z) {
              const tileSize = 256
              const initialResolution = 156543.03392804097
              const originShift = 20037508.3427892

              // 计算每级分辨率
              const resolution = initialResolution / Math.pow(2, z)

              // 计算 bbox
              const minx = x * tileSize * resolution - originShift
              const maxy = originShift - y * tileSize * resolution
              const maxx = (x + 1) * tileSize * resolution - originShift
              const miny = originShift - (y + 1) * tileSize * resolution

              return (
                `/arcgis/rest/services/PS_YS_GCJ02_3857_2/MapServer/export` +
                `?bbox=${minx},${miny},${maxx},${maxy}` +
                `&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image`
              )
            },
            opacity: 1,
            zIndex: 100,
          })
          this.arcgisAYS2Layer.hide()
          this.amap.add(this.arcgisAYS2Layer)

          // this.amap.add(layer)

          // 👇 在这里才可以使用 MouseTool
          // const mouseTool = new AMap.MouseTool(this.amap)
          // mouseTool.polygon() // 示例
          // this.mapEngine = 'amap'
          window.localStorage.setItem('mapEngine', 'amap')
          const layers = this.$route.query.layers
          if (layers) {
            this.layerEvent(layers)
          }
          this.amap.on('zoomend', this.handleZoomAEnd)
        })
        .catch(err => {
          console.error('加载高德地图失败', err)
        })
    },
  },
}
</script>

<style scoped lang="less">
.mapMain {
  width: 80%;
  height: calc(100vh - 80px);
  background-color: blue;
  float: left;
}

.mapBox {
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #133f58;
  float: left;
}
</style>
