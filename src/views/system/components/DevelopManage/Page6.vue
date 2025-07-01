<template>
  <div id="gaodeMap" style="width: 100%; height: 500px"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

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
          center: [113.280637, 23.125178],
        })

        // 添加控件
        this.mapInstance.addControl(new AMap.Scale())
        this.mapInstance.addControl(new AMap.ToolBar())
        this.mapInstance.addControl(new AMap.MapType())

        // 添加一个标记
        const marker = new AMap.Marker({
          position: [113.280637, 23.125178],
          title: '广州中心',
        })
        this.mapInstance.add(marker)
      })
      .catch(e => {
        console.error('高德地图加载失败', e)
      })

    // ✅ 重点：异步加载控件插件
    AMap.plugin(['AMap.ControlBar', 'AMap.ToolBar'], function () {
      // 控制旋转、倾斜等
      const controlBar = new AMap.ControlBar({
        position: { right: '10px', top: '10px' }
      })
      map.addControl(controlBar)

      // 缩放工具条
      const toolBar = new AMap.ToolBar({
        position: { right: '40px', top: '110px' }
      })
      map.addControl(toolBar)
    })

    this.mapInstance = map
  },
  beforeDestroy() {
    // 销毁地图实例
    if (this.mapInstance) {
      this.mapInstance.destroy()
    }
  },
}
</script>
