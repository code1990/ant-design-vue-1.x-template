<template>
  <div ref="mapContainer" style="width: 100%; height: 100vh"></div>
</template>

<script>
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import { Vector as VectorSource } from 'ol/source'
import { Feature } from 'ol'
import { Polygon } from 'ol/geom'
import { Style, Stroke, Fill } from 'ol/style'
import { fromLonLat } from 'ol/proj'

export default {
  name: 'DrawPreviewMap',
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    // 你的原始经纬度坐标
    const rawCoords = [
      [113.28704202362458, 23.38422090936905],
      [113.28704202362458, 23.405685675058578],
      [113.3171678877991, 23.405685675058578],
      [113.3171678877991, 23.38422090936905],
      [113.28704202362458, 23.38422090936905],
    ]

    const center = [113.29909236929439, 23.39280681564486]

    const view = new View({
      center: fromLonLat(center, 'EPSG:3857'),
      zoom: 17,
      maxZoom: 20,
      minZoom: 20,
      projection: 'EPSG:3857',
    })

    const polygon = new Feature({
      geometry: new Polygon([rawCoords.map(coord => fromLonLat(coord, 'EPSG:3857'))]),
    })

    polygon.setStyle(
      new Style({
        stroke: new Stroke({
          color: '#FF0000',
          width: 2,
        }),
        fill: new Fill({ color: 'rgba(255,0,0,0.2)' }),
      })
    )

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [polygon],
      }),
    })

    this.map = new Map({
      target: this.$refs.mapContainer,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view,
    })
  },
}
</script>
