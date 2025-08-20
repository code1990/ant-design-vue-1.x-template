export function BaiduMap (ak) {
  return new Promise(function (resolve, reject) {
    // 如果已加载过，直接返回
    if (window.BMapGL) return resolve(window.BMapGL)

    window.init = function () {
      resolve(window.BMapGL)
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `//api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`

    // ✅ 更安全的错误处理
    script.onerror = function (e) {
      console.error('百度地图脚本加载失败', e)
      reject(new Error('Baidu Map script failed to load'))
    }

    document.head.appendChild(script)
  })
}
