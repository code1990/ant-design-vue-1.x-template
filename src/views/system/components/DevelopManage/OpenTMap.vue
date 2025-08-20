<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { fromLonLat } from 'ol/proj'
import TileArcGISRest from 'ol/source/TileArcGISRest'

export default {
  name: 'OpenlayerTiandituMap',
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    getArcGISTileUrl(x, y, z) {
      // OpenLayers 的 Y 是从下往上，ArcGIS 是从上往下，需要转换
      const flippedY = Math.pow(2, z) - 1 - y
      return `/arcgis/rest/services/PS_211/MapServer/tile/${z}/${flippedY}/${x}`
    },
    initMap() {
      const tiandituKey = 'f5f58a60eb5ca15e131b1df75c5f5567'

      const tiandituVec = new TileLayer({
        source: new XYZ({
          url:
            `https://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0` +
            `&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles` +
            `&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${tiandituKey}`,
          wrapX: true,
        }),
      })

      const tiandituCva = new TileLayer({
        source: new XYZ({
          url:
            `https://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0` +
            `&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles` +
            `&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${tiandituKey}`,
          wrapX: true,
        }),
      })

      // ✅ ArcGIS 瓦片服务图层
      // const arcgisLayer = new TileLayer({
      //   source: new XYZ({
      //     tileUrlFunction: tileCoord => {
      //       const [z, x, y] = tileCoord
      //       return this.getArcGISTileUrl(x, y, z)
      //     },
      //     tileSize: 256,
      //     maxZoom: 19,
      //     minZoom: 0,
      //   }),
      // })

      const arcgisLayer = new TileLayer({
        source: new TileArcGISRest({
          url: 'http://localhost:6080/arcgis/rest/services/PS_211/MapServer',
          params: {
            f: 'image',
          },
        }),
        zIndex: 2,
      })

      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [tiandituVec, tiandituCva, arcgisLayer],
        view: new View({
          center: fromLonLat([113.280637, 23.125178]), // 广州
          zoom: 10,
          projection: 'EPSG:3857',
        }),
      })
    },
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}
</style>
