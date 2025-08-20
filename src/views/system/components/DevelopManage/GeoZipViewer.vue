<template>
  <div ref="mapContainer" style="width: 100%; height: 600px"></div>
</template>

<script>
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { OSM } from 'ol/source'
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON'
import JSZip from 'jszip'
import { Text } from 'ol/style'

export default {
  name: 'GeoZipViewer',
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
    this.loadGeojsonZip()
  },
  methods: {
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
          center: fromLonLat([113.3, 23.1]),
          zoom: 10,
          maxZoom: 22,
        }),
      })
    },
    getColorByFileName(name) {
      if (name.includes('_WS')) return '#FFA500'
      if (name.includes('_YS')) return '#00AA00'
      if (name.includes('_YWHL')) return '#3399FF'
      return '#FF0000'
    },
    async loadGeojsonZip() {
      try {
        const response = await fetch(this.zipUrl)
        const zipBuffer = await response.arrayBuffer()
        const zip = await JSZip.loadAsync(zipBuffer)

        const geojsonFiles = zip.file(/\.geojson$/i)
        if (!geojsonFiles.length) {
          console.error('未找到 .geojson 文件')
          return
        }

        this.vectorSource.clear()

        for (const file of geojsonFiles) {
          const color = this.getColorByFileName(file.name)

          const geojsonText = await file.async('string')
          const geojson = JSON.parse(geojsonText)

          const features = new GeoJSON().readFeatures(geojson, {
            featureProjection: 'EPSG:3857'
          })

          features.forEach(feature => {
            const props = feature.getProperties() || {}

            feature.setStyle((feature, resolution) => {
              const zoom = this.map.getView().getZoom()
              const label =
                zoom >= 18
                  ? `起点高程: ${props.beg_h ?? ''}\n终点高程: ${props.end_h ?? ''}`
                  : ''

              return new Style({
                stroke: new Stroke({
                  color,
                  width: 2
                }),
                fill: new Fill({ color: color + '33' }), // 带透明度填充
                text: new Text({
                  text: label,
                  font: '14px sans-serif',
                  fill: new Fill({ color: '#000' }),
                  stroke: new Stroke({
                    color: '#fff',
                    width: 2
                  }),
                  overflow: true,
                })
              })
            })

            this.vectorSource.addFeature(feature)
          })
        }

        console.log('✅ 所有 GeoJSON 加载完成，features：', this.vectorSource.getFeatures().length)

        // 自动缩放
        if (this.vectorSource.getFeatures().length > 0) {
          const extent = this.vectorSource.getExtent()
          this.map.getView().fit(extent, {
            padding: [20, 20, 20, 20],
            duration: 500
          })
        }

        // 缩放时更新样式（文字控制）
        this.map.getView().on('change:resolution', () => {
          this.vectorSource.getFeatures().forEach(f => {
            f.setStyle(f.getStyle()) // 触发样式刷新
          })
        })

      } catch (err) {
        console.error('geojson zip 加载失败:', err)
      }
    },
    async loadGeojsonZip11() {
      try {
        const response = await fetch(this.zipUrl)
        const zipBuffer = await response.arrayBuffer()
        const zip = await JSZip.loadAsync(zipBuffer)

        const geojsonFile = zip.file(/\.geojson$/i)[0]
        if (!geojsonFile) {
          console.error('未找到 .geojson 文件')
          return
        }

        const geojsonText = await geojsonFile.async('string')
        const geojson = JSON.parse(geojsonText)

        const features = new GeoJSON().readFeatures(geojson, {
          featureProjection: 'EPSG:3857', // 显示用投影
        })

        this.vectorSource.clear()

        const styleFunction = feature => {
          const zoom = this.map.getView().getZoom()

          const props = feature.getProperties() || {}
          const label =
            zoom >= 21
              ? `起点高程: ${props.beg_h ?? ''}\n终点高程: ${props.end_h ?? ''}`
              : '' // 缩放小于18不显示文字

          return new Style({
            stroke: new Stroke({ color: '#FF0000', width: 2 }),
            fill: new Fill({ color: 'rgba(255, 0, 0, 0.2)' }),
            text: new Text({
              text: label,
              font: '14px sans-serif',
              fill: new Fill({ color: '#000' }),
              stroke: new Stroke({ color: '#fff', width: 2 }),
              overflow: true,
              textAlign: 'center',
              textBaseline: 'middle',
            }),
          })
        }

        features.forEach(feature => {
          feature.setStyle(styleFunction)
          this.vectorSource.addFeature(feature)
        })

        console.log('✅ GeoJSON 加载完成，features：', features.length)

        // 自动缩放至图层范围
        if (features.length > 0) {
          const extent = this.vectorSource.getExtent()
          this.map.getView().fit(extent, {
            padding: [20, 20, 20, 20],
            duration: 500,
          })
        }
      } catch (err) {
        console.error('geojson zip 加载失败:', err)
      }
    }
  },
}
</script>
