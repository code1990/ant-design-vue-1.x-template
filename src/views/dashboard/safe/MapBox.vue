<template>
  <div class="mapMain">
    <div class="mapImage">
      <div class="card-container">
        <div class="card">
          <div class="card-top red"></div>
          <div class="card-middle">
            <span class="card-number">461</span>
            <span class="card-unit">条</span>
          </div>
          <div class="card-bottom">实时告警风险</div>
        </div>

        <div class="card">
          <div class="card-top orange"></div>
          <div class="card-middle">
            <span class="card-number">123</span>
            <span class="card-unit">条</span>
          </div>
          <div class="card-bottom">审计违规操作</div>
        </div>

        <div class="card">
          <div class="card-top blue"></div>
          <div class="card-middle">
            <span class="card-number">88</span>
            <span class="card-unit">条</span>
          </div>
          <div class="card-bottom">审计违规操作</div>
        </div>
      </div>

    </div>
    <div class="mapBox" ref="map" id="main"></div>
    <div class="mapLeft"></div>
    <div class="mapRight"></div>
    <MapBottom class="mapBottom"></MapBottom>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import * as echarts from 'echarts'
import guangzhouJson from './gz.json' // 你保存的 GeoJSON
import MapBottom from '@/views/dashboard/safe/MapBottom.vue'

echarts.registerMap('guangzhou', guangzhouJson)
export default {
  name: 'MapBox',
  components: { MapBottom },
  data () {
    return {
      amap: null,
    }
  },
  mounted () {
    // this.initAMap()
    this.initMap()
  },
  methods: {
    initMap () {
      var chart = echarts.init(document.getElementById('main'))

      var option = {
        title: {
          text: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          bottom: 20,
          text: ['高', '低'],
          inRange: {
            color: ['#e0ffff', '#006edd'],
          },
          show: false,
          itemWidth: 30, // 放大宽度
          itemHeight: 250, // 放大高度
          textStyle: {
            fontSize: 16, // 放大字体
          },
        },
        series: [
          {
            name: '辖区数据',
            type: 'map',
            map: 'guangzhou', // 注册时的名字
            roam: true, // 是否支持缩放拖拽
            label: {
              show: true,
            },
            layoutCenter: ['50%', '50%'], // 地图居中
            layoutSize: '100%', // 比容器放大20%
            data: [
              {
                name: '天河区',
                value: 80,
              },
              {
                name: '越秀区',
                value: 55,
              },
              {
                name: '白云区',
                value: 72,
              },
              {
                name: '海珠区',
                value: 65,
              },
              {
                name: '黄埔区',
                value: 50,
              },
              {
                name: '番禺区',
                value: 77,
              },
              {
                name: '花都区',
                value: 45,
              },
              {
                name: '南沙区',
                value: 35,
              },
              {
                name: '增城区',
                value: 60,
              },
              {
                name: '从化区',
                value: 40,
              },
            ],
          },
        ],
      }

      chart.setOption(option)
    },
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
            // mapStyle: 'amap://styles/darkblue', // 深色主题
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
            position: {
              top: '50px',
              right: '20px',
              left: 'auto',
              bottom: 'auto',
            },
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
          this.amap.addControl(
            new AMap.ToolBar({
              position: {
                top: '50px',
                right: '20px',
                left: 'auto',
                bottom: 'auto',
              },
            }),
          )
          this.amap.addControl(
            new AMap.ControlBar({
              position: {
                top: '150px',
                right: '20px',
                left: 'auto',
                bottom: 'auto',
              },
            }),
          )

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
  width: 60%;
  height: calc(100vh - 50px);
  float: left;
}

.mapImage {
  width: 100%;
  height: 19vh;
  float: left;
  background-color: #13152d;
}

.mapBox {
  width: 100%;
  height: calc(61vh - 50px);
  background-color: #13152d;
  float: left;
}

.mapBottom {
  width: 100%;
  height: 20vh;
  background-color: #13152d;
  float: left;
}

.card-container {
  display: flex;
  gap: 100px; /* 卡片间距 */
  padding: 25px;
  margin-left: 100px;
}

.card {
  flex: 0 0 200px;  /* 固定宽度 200px */
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #002855;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

}

.card-top {
  width: 100%;
  height: 6px;
  border-radius: 4px 4px 0 0;
}

.card-top.red { background-color: #e74c3c; }
.card-top.orange { background-color: #f39c12; }
.card-top.blue { background-color: #3498db; }

.card-middle {
  display: flex;
  align-items: baseline; /* 数字和单位对齐 */
}

.card-number {
  font-size: 40px;
  font-weight: bold;
  color: #14ADED;
}

.card-unit {
  font-size: 14px;
  color: white;
  margin-left: 5px;
}

.card-bottom {
  font-size: 16px;
  color: white;
  text-align: center;
}

.mapLeft{
  width: 40px;
  height: 30%;
  position: absolute;
  background-image: url('~@/assets/images/left2.png');
  background-repeat: no-repeat;   /* 不平铺 */
  background-size: cover;         /* 等比缩放，铺满容器 */
  background-position: bottom;    /* 居中对齐 */
  top: 30%;
  margin-left: 60px;
}

.mapRight{
  width: 40px;
  height: 30%;
  position: absolute;
  background-image: url('~@/assets/images/right2.png');
  background-repeat: no-repeat;   /* 不平铺 */
  background-size: cover;         /* 等比缩放，铺满容器 */
  background-position: bottom;    /* 居中对齐 */
  top: 30%;
  margin-right: 60px;
  right: 20%;
}
</style>
