<template>
  <div class="mainBox">
    <div>
      <div>
        <a-select
          v-model="selectedProvince"
          style="width: 200px"
          placeholder="请选择省份"
          @change="onProvinceChange"
        >
          <a-select-option
            v-for="province in provinces"
            :key="province.value"
            :value="province.value"
          >
            {{ province.title }}
          </a-select-option>
        </a-select>

        <a-select
          v-model="selectedCity"
          style="width: 200px; margin-left: 10px"
          placeholder="请选择城市"
          @change="onCityChange"
          :disabled="!cities.length"
          allowClear
        >
          <a-select-option v-for="city in cities" :key="city.value" :value="city.value">
            {{ city.title }}
          </a-select-option>
        </a-select>

        <a-select
          v-model="selectedDistrict"
          style="width: 200px; margin-left: 10px"
          placeholder="请选择区"
          @change="onDistrictChange"
          :disabled="!districts.length"
          allowClear
        >
          <a-select-option
            v-for="district in districts"
            :key="district.value"
            :value="district.value"
          >
            {{ district.title }}
          </a-select-option>
        </a-select>

        <a-select
          v-model="selectedStreet"
          style="width: 200px; margin-left: 10px"
          placeholder="请选择街道"
          :disabled="!streets.length"
          @change="onStreetChange"
          allowClear
        >
          <a-select-option v-for="street in streets" :key="street.value" :value="street.value">
            {{ street.title }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="mapBox" id="map"></div>
  </div>
</template>
<script>
// import jsonData from '../../../../assets/data.json'

export default {
  name: 'Page3',
  data() {
    return {
      fullData: [],
      provinces: [],
      cities: [],
      districts: [],
      streets: [],
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      selectedStreet: null,
      map: null,
      boundaryLayer: null,
      cityCenters: {}
    }
  },
  created() {
    fetch('/city.json')
      .then(res => res.json())
      .then(data => {
        this.fullData = data
        this.provinces = data

        // 👇 设置默认值
        this.selectedProvince = '440000' // 广东省
        this.onProvinceChange(this.selectedProvince)

        this.$nextTick(() => {
          this.selectedCity = '440100' // 广州市
          this.onCityChange(this.selectedCity)

          // 你也可以继续设置默认区和街道
          // this.selectedDistrict = '440103'; // 荔湾区
          // this.handleDistrictChange(this.selectedDistrict);
          // this.selectedStreet = '44010301'; // 沙面街道
        })
      })
      .catch(err => {
        this.$message.error('城市数据加载失败', err)
      })
    fetch('/center.json')
      .then(res => res.json())
      .then(data => {
        // console.error('center' , data)
        // let result = {}
        // for (let i = 0; i < data.length; i++) {
        //   result
        // }
        this.cityCenters = Object.assign({}, ...data)

      })
      .catch(err => {
        this.$message.error('城市数据加载失败', err)
      })
  },
  mounted() {
    // https://www.guihuayun.com/maps/region_datav.php
    // 边界下载
    this.loadMapAndJson()
  },
  methods: {
    async loadMapAndJson() {
      await this.initMap() // 等待 initMap 执行完成
      const res = await fetch('/data/440100.json')
      const data = await res.json()
      this.drawBoundaryMask(data)
      console.error('加载到的 440100.json 数据：', data)
    },
    initMap() {
      // 初始化天地图地图对象
      return new Promise(resolve => {
        this.map = new T.Map('map')
        this.map.centerAndZoom(new T.LngLat(113.280637, 23.125178), 9.5) // 设置中心点和缩放级别
        this.map.enableScrollWheelZoom(true)
        // 你的GeoJSON数据（这里写你的GeoJSON对象）
        // var geojson = {
        //   type: 'FeatureCollection',
        //   features: [
        //     {
        //       type: 'Feature',
        //       properties: {},
        //       geometry: {
        //         type: 'Polygon',
        //         coordinates: [
        //           [
        //             [113.54, 23.1],
        //             [113.55, 23.1],
        //             [113.55, 23.11],
        //             [113.54, 23.11],
        //             [113.54, 23.1],
        //           ],
        //         ],
        //       },
        //     },
        //     // ... 可以有多个Feature
        //   ],
        // }
        //
        // // 创建矢量图层
        // // var overlayGroup = new T.OverlayGroup()
        //
        // // 解析GeoJSON并转换成天地图Feature
        // // var features = []
        // let that = this
        // geojson.features.forEach(function (feature) {
        //   if (feature.geometry.type === 'Polygon') {
        //     var rings = feature.geometry.coordinates
        //     rings.forEach(function (ring) {
        //       var points = ring.map(function (coord) {
        //         return new T.LngLat(coord[0], coord[1])
        //       })
        //       // 创建多边形
        //       var polygon = new T.Polygon(points, {
        //         strokeColor: '#FF0000',
        //         strokeWeight: 2,
        //         fillColor: '#FFAAAA',
        //         fillOpacity: 0.5,
        //       })
        //       that.map.addOverLay(polygon)
        //     })
        //   }
        //   // 如果是MultiPolygon，类似处理
        // })
        // 初始化地图逻辑...
        console.log('地图初始化完成')
        resolve() // 地图初始化完成后调用
      })
      // this.map.addOverLay(overlayGroup)
    },
    // 边界高亮及遮罩效果，arr是内部行政区边界线的geojson的坐标
    drawBoundaryMask(arr = []) {
      let T = window.T
      // 设置自定义窗格zindex层级，让它在底部层级
      // let polygonPane = this.map.createPane('polygonPane')
      // polygonPane.style.zIndex = 200
      // polygonPane.style.pointerEvents = 'none'
      // 向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
      const NW = {
        lng: 73.0,
        lat: 59.0,
      } // 西北
      const NE = {
        lng: 136.0,
        lat: 59.0,
      } // 东北
      const SE = {
        lng: 136.0,
        lat: 3.0,
      } // 东南
      const SW = {
        lng: 73.0,
        lat: 3.0,
      } // 西南
      let maskLatLngs = [NW, SW, SE, NE, NW]
      let points = []
      arr.forEach(item => {
        points.push({
          lat: item[1],
          lng: item[0],
        })
      })
      maskLatLngs = maskLatLngs.concat(points)
      // maskLatLngs.push(NW) //最后再次添加西北角闭合图形
      this.polygonLayer = new T.Polygon(maskLatLngs, {
        color: 'transparent',
        fillColor: '#fff',
        fillOpacity: 1.4,
        weight: 10,
        pane: 'polygonPane',
      })
      let bd = new T.Polygon(points, {
        color: '#4DBC88',
        weight: 3,
        opacity: 1,
      })
      // 只显示边界，不显示遮罩
      this.boundaryLayer = new T.Polygon(bd, {
        color: '#4DBC88',
        weight: 3,
        opacity: 1,
      })

      // this.map.addOverLay(this.polygonLayer)
      // this.map.addOverLay(bd)
      this.map.addOverLay(this.boundaryLayer)
      this.map.addEventListener('click', function (e) {
        var lng = e.lnglat.getLng()
        var lat = e.lnglat.getLat()
        // 打印到控制台
        console.log('点击坐标：经度 =', lng, '纬度 =', lat)
      })
    },
    onProvinceChange(value) {
      const province = this.fullData.find(p => p.value === value)
      this.cities = province ? province.children || [] : []
      this.districts = []
      this.streets = []
      this.selectedCity = null
      this.selectedDistrict = null
      this.selectedStreet = null
    },
    onCityChange(value) {
      const city = this.cities.find(c => c.value === value)
      this.districts = city ? city.children || [] : []
      this.streets = []
      this.selectedDistrict = null
      this.selectedStreet = null

      // 加载对应城市边界
      if (value) {
        this.loadCityBoundary(value)
      }
    },
    onDistrictChange(value) {
      const district = this.districts.find(d => d.value === value)
      this.streets = district ? district.children || [] : []
      this.selectedStreet = null
      // 加载对应城市边界
      if (value) {
        this.loadCityBoundary(value)
      }
    },
    onStreetChange(value) {
      // 加载对应城市边界
      if (value) {
        console.error(value)
        this.loadCityBoundary(value)
      }
    },
    async loadCityBoundary(code) {
      try {
        const res = await fetch(`/data/${code}.json`)
        const data = await res.json()

        // 清除已有图层（可选）
        if (this.boundaryLayer) {
          this.map.removeOverLay(this.boundaryLayer)
        }

        const points = data.map(item => ({
          lat: item[1],
          lng: item[0],
        }))

        // 只显示边界，不显示遮罩
        this.boundaryLayer = new T.Polygon(points, {
          color: '#4DBC88',
          weight: 3,
          opacity: 1,
        })
        this.map.addOverLay(this.boundaryLayer)
        // 👉 设置地图中心点
        const center = this.cityCenters[code]
        if (center) {
          let zoom = 9.5
          if (parseInt(code) > 440100) {
            zoom = 12.5
          }
          if (code.endsWith('00')) {
            zoom = 9.5
          }
          if (parseInt(code) >= 44010301) {
            zoom = 15.5
          }
          console.error('zoom', zoom)
          this.map.centerAndZoom(new T.LngLat(center.lng, center.lat), zoom)
        } else {
          // 如果没有配置中心点，则自动适配边界范围
          //this.map.setViewport(points)
        }
      } catch (err) {
        console.error('加载城市边界失败:', err)
      }
    },
  },
}
</script>
<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 100vh;
}

.mapBox {
  width: 100%;
  height: 99vh;
}
</style>
