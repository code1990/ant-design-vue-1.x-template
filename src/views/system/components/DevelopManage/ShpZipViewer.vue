<template>
  <div ref="mapContainer" style="width: 100%; height: 600px"></div>
</template>

<script>
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { OSM } from 'ol/source'
import { Feature } from 'ol'
import { Polygon, LineString, Point } from 'ol/geom'
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import * as shapefile from 'shapefile' // 引入 shapefile-js
import JSZip from 'jszip'

export default {
  name: 'ShpZipViewer',
  props: {
    zipUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      vectorSource: new VectorSource(),
    }
  },
  mounted() {
    this.initMap()
    this.loadShapefile()
  },
  methods: {
    // async function loadShpZip (zipBuffer) {
    //   const zip = await JSZip.loadAsync(zipBuffer)
    //
    //   const shpBuf = await zip.file(/\.shp$/i)[0]?.async('arraybuffer')
    //   const dbfBuf = await zip.file(/\.dbf$/i)[0]?.async('arraybuffer')
    //
    //   if (!shpBuf || !dbfBuf) {
    //     throw new Error('Missing .shp or .dbf in zip')
    //   }
    //
    //   const source = await shapefile.open(shpBuf, dbfBuf)
    //
    //   const features = []
    //   let result = await source.read()
    //   while (!result.done) {
    //     features.push(result.value)
    //     result = await source.read()
    //   }
    //
    //   return features
    // },
    initMap() {
      const baseLayer = new TileLayer({ source: new OSM() })

      const vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: '#FF0000',
            width: 2,
          }),
          fill: new Fill({ color: 'rgba(255, 0, 0, 0.2)' }),
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: '#FF0000' }),
          }),
        }),
      })

      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [baseLayer, vectorLayer],
        view: new View({
          center: fromLonLat([113.3, 23.1], 'EPSG:3857'),
          zoom: 10,
          maxZoom: 22,
        }),
      })
    },
    // 对 LineString、Polygon 坐标都需要转换
    // projectCoords(coords) {
    //   return coords.map(coord => fromLonLat(coord, 'EPSG:3857'))
    // },
    projectCoords(coords) {
      if (typeof coords[0] === 'number') {
        return fromLonLat(coords, 'EPSG:3857')
      } else if (Array.isArray(coords[0])) {
        return coords.map(c => this.projectCoords(c))
      } else {
        return coords
      }
    },
    async loadShapefile() {
      try {
        // 1. 下载 .zip 文件并解压
        const response = await fetch(this.zipUrl)
        const zipBuffer = await response.arrayBuffer()
        const zip = await JSZip.loadAsync(zipBuffer)

        const shpFile = zip.file(/\.shp$/i)[0]
        const dbfFile = zip.file(/\.dbf$/i)[0]

        if (!shpFile || !dbfFile) {
          console.error('ZIP 文件中缺少 .shp 或 .dbf 文件')
          return
        }

        const shpBuffer = await shpFile.async('arraybuffer')
        const dbfBuffer = await dbfFile.async('arraybuffer')

        // 2. 用 shapefile-js 解析矢量要素
        const source = await shapefile.open(shpBuffer, dbfBuffer)

        let result = await source.read()
        while (!result.done) {
          const geometry = result.value.geometry
          const coords = geometry.coordinates
          const type = geometry.type

          let olGeom = null

          switch (type) {
            case 'Point':
              olGeom = new Point(this.projectCoords(coords))
              break
            case 'MultiPoint':
              olGeom = new MultiPoint(coords.map(this.projectCoords))
              break
            case 'LineString':
              olGeom = new LineString(this.projectCoords(coords))
              break
            case 'MultiLineString':
              olGeom = new MultiLineString(coords.map(this.projectCoords))
              break
            case 'Polygon':
              // Polygon 是多环结构，coords 是二维数组
              olGeom = new Polygon(coords.map(this.projectCoords))
              break
            case 'MultiPolygon':
              // MultiPolygon 是三维数组： [[[[]]]]
              olGeom = new MultiPolygon(
                coords.map(polygon => polygon.map(this.projectCoords))
              )
              break
            default:
              console.warn('不支持的类型:', type)
          }

          if (olGeom) {
            const feature = new Feature(olGeom)
            this.vectorSource.addFeature(feature)
          }

          result = await source.read()
        }

        console.error('✅ shapefile 加载完成，features：', this.vectorSource.getFeatures().length)
        // 添加完所有 feature 后自动缩放视图
        if (this.vectorSource.getFeatures().length > 0) {
          const extent = this.vectorSource.getExtent()
          this.map.getView().fit(extent, {
            padding: [20, 20, 20, 20],
            duration: 500,
          })
        }
      } catch (err) {
        console.error('shapefile load error:', err)
      }
    },
  },
}
</script>
