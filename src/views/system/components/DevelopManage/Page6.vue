<template>
  <div id="gaodeMap" style="width: 100%; height: 100vh"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import JSZip from 'jszip'
import coordtransform from 'coordtransform'

export default {
  name: 'GaodeMap',
  data() {
    return {
      mapInstance: null,
    }
  },
  mounted() {
    // 安全配置（需要你在高德后台设置安全码）
    window._AMapSecurityConfig = {
      securityJsCode: '918e06e377d6810950186a7dc0fd77c4',
    }

    // 初始化地图
    AMapLoader.load({
      key: '7ce54c8adc8928c7730ff0272098dde0', // 🔑 替换为你申请的 key
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MapType'], // 可选插件
    })
      .then(AMap => {
        this.mapInstance = new AMap.Map('gaodeMap', {
          pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
          viewMode: '3D', //地图模式
          rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
          pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
          zoom: 17, //初始化地图层级
          rotation: -15, //初始地图顺时针旋转的角度
          zooms: [2, 20], //地图显示的缩放级别范围
          center: [113.460179, 23.172288],
        })

        // 添加控件
        this.mapInstance.addControl(new AMap.Scale())
        this.mapInstance.addControl(new AMap.ToolBar())
        this.mapInstance.addControl(new AMap.MapType())

        // 添加一个标记
        const marker = new AMap.Marker({
          position: [113.47, 23.18],
          title: '广州中心',
        })
        this.mapInstance.add(marker)
        console.error('✅ 地图初始化完成，开始加载 GeoJSON ZIP...')
        this.loadGeojsonZipAndRenderToAMap(this.mapInstance)
      })
      .catch(e => {
        console.error('高德地图加载失败', e)
      })
    // const AMap = window.AMap
    // // ✅ 重点：异步加载控件插件
    // AMap.plugin(['AMap.ControlBar', 'AMap.ToolBar'], function () {
    //   // 控制旋转、倾斜等
    //   const controlBar = new AMap.ControlBar({
    //     position: {
    //       right: '10px',
    //       top: '10px',
    //     },
    //   })
    //   this.mapInstance.addControl(controlBar)
    //
    //   // 缩放工具条
    //   const toolBar = new AMap.ToolBar({
    //     position: {
    //       right: '40px',
    //       top: '110px',
    //     },
    //   })
    //   this.mapInstance.addControl(toolBar)
    // })


    // this.mapInstance = map
  },
  methods: {
    async loadGeojsonZipAndRenderToAMap(map, zipUrl = '/data/PS_211_JSON.zip') {
      try {
        const response = await fetch(zipUrl)
        console.error('✅ 地图初始化完成，开始加载 GeoJSON ZIP...', response)
        if (!response.ok) throw new Error('❌ ZIP 文件加载失败')

        const arrayBuffer = await response.arrayBuffer()
        const zip = await JSZip.loadAsync(arrayBuffer)
        const geojsonFiles = zip.file(/\.geojson$/i)
        console.error('📦 ZIP 包中文件列表：', zip.files)
        console.error('📦 ZIP 包中文件列表：', geojsonFiles)

        if (!geojsonFiles.length) {
          console.error('❌ ZIP 中未找到 .geojson 文件')
          return
        }

        for (const file of geojsonFiles) {
          const geojsonText = await file.async('string')
          const geojson = JSON.parse(geojsonText)
          console.error(`✅ 加载 ${file.name} 成功，features 数量：${geojson.features?.length || 0}`)
          const fileName = file.name
          await this.renderGeoJSONToAMap(map, geojson, fileName)
        }
      } catch (error) {
        console.error('❌ 处理 ZIP 失败：', error)
      }
    },
    isValidCoord(coord) {
      return (
        coord && !isNaN(coord.lng) && !isNaN(coord.lat) && coord.lng !== null && coord.lat !== null
      )
    },
    async renderGeoJSONToAMap(map, geojson, fileName) {
      const AMap = window.AMap
      const features = geojson.features || []
      console.error(features)
      for (const feature of features) {
        const { geometry, properties } = feature

        if (!geometry || !geometry.type) continue

        const type = geometry.type
        let overlay = null

        try {
          if (type === 'Point') {
            const coord = geometry.coordinates
            // const [lng, lat] = coordtransform.wgs84togcj02(coord)
            // console.error('xxxx1111', coordtransform.wgs84togcj02(coord[0],coord[1]))
            const [lng, lat] = coordtransform.wgs84togcj02(coord[0], coord[1])
            if (
              this.isValidCoord({
                lng,
                lat,
              })
            ) {
              // overlay = new AMap.Marker({
              //   position: [lng, lat],
              //   title: properties?.name || '点',
              //   icon: new AMap.Icon({
              //     size: new AMap.Size(32, 32),
              //     image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
              //     imageSize: new AMap.Size(32, 32),
              //   }),
              // })
              console.error(fileName)
              if (fileName.includes('WELL')){
                // const circleMarker = new AMap.CircleMarker({
                //   center: [lng, lat],        // 圆心坐标
                //   radius: 6,                 // 像素半径
                //   strokeColor: '#fff',       // 边框颜色
                //   strokeWeight: 1,
                //   fillColor: '#ff4d4f',      // 填充色
                //   fillOpacity: 0.9,
                //   cursor: 'pointer',
                //   zIndex: 100,
                //   extData: properties,       // 可附带属性数据
                // })

                const div = document.createElement('div')
                div.style.width = '12px'
                div.style.height = '12px'
                div.style.borderRadius = '50%'
                div.style.backgroundColor = '#ff4d4f'
                div.style.border = '1px solid #fff'

                const circleMarker = new AMap.Marker({
                  position: [lng, lat],
                  content: div,
                  offset: new AMap.Pixel(-6, -6), // 中心对齐
                })

                // ✅ 2. 创建文字注释
                const textLabel = new AMap.Text({
                  text: '800mm',
                  position: [lng, lat],
                  offset: new AMap.Pixel(0, -10), // ↑ 控制文字偏移（上方 20 像素）
                  style: {
                    color: '#333',
                    fontSize: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0px',
                    lineHeight: '14px',
                    whiteSpace: 'pre',
                    textAlign: 'center',
                  },
                  zIndex: 101, // 比圆点高一层
                })
                // overlay = new AMap.CircleMarker({
                //   center: [lng, lat],
                //   radius: 6,
                //   strokeColor: '#fff',      // ⚪边框色
                //   strokeWeight: 1,          // ⚠️边框宽度
                //   fillColor: '#ff4d4f',     // 🔴填充色
                //   fillOpacity: 0.9,
                // })
                overlay = [circleMarker, textLabel]
              }
            } else {
              console.warn('⚠️ Point 坐标非法：', coord)
            }
          } else if (type === 'LineString') {
            console.error(geometry)
            console.error(properties)
            const coords = geometry.coordinates
            const gcjList = coords
              .map(coord => {
                const [lng, lat] = coordtransform.wgs84togcj02(coord[0], coord[1])
                // const [lng, lat] = coord
                return {
                  lng,
                  lat,
                }
              })
              .filter(this.isValidCoord)

            if (gcjList.length > 1) {
              overlay = new AMap.Polyline({
                path: gcjList.map(p => [p.lng, p.lat]),
                strokeColor: '#E84133',
                strokeWeight: 3,
              })
            } else {
              console.warn('⚠️ LineString 坐标非法或数量不足')
            }
          } else if (type === 'Polygon') {
            const coords = geometry.coordinates[0] // 只支持外环
            const gcjList = coords
              .map(coord => {
                const [lng, lat] = coordtransform.wgs84togcj02(coord[0], coord[1])
                // const [lng, lat] = coord
                return {
                  lng,
                  lat,
                }
              })
              .filter(this.isValidCoord)

            if (gcjList.length > 2) {
              overlay = new AMap.Polygon({
                path: gcjList.map(p => [p.lng, p.lat]),
                fillColor: '#00DDDD',
                fillOpacity: 0.4,
                strokeColor: '#333',
                strokeWeight: 2,
              })
            } else {
              console.warn('⚠️ Polygon 坐标非法或点数不足')
            }
          } else if (type === 'MultiLineString') {
            const multiCoords = geometry.coordinates
            const paths = []

            for (const segment of multiCoords) {
              const line = segment.map(coord => {
                const [lng, lat] = coordtransform.wgs84togcj02(coord[0], coord[1]) // ✅ 不做转换
                return [lng, lat]
              }).filter(([lng, lat]) => !isNaN(lng) && !isNaN(lat))

              if (line.length > 1) {
                paths.push(line)
              }
            }

            if (paths.length > 0) {
              overlay = new AMap.Polyline({
                path: paths.flat(), // 将多个线段平铺合并成一条线
                strokeColor: '#FF9900',
                strokeWeight: 3
              })
            } else {
              console.warn('⚠️ MultiLineString 中无有效路径')
            }
          }

          if (overlay) {
            map.add(overlay)
            console.log('✔️ 添加图层到地图:', overlay)
          }
        } catch (error) {
          console.error(`❌ 渲染 ${type} 失败：`, error)
        }
      }

      // 可选：自动缩放视图到显示所有图层
      // map.setFitView()
    },
  },
  beforeDestroy() {
    // 销毁地图实例
    if (this.mapInstance) {
      this.mapInstance.destroy()
    }
  },
}
</script>
