import { BasicLayout, PageView, PageFrame } from '@/layouts'

/**
 * @description 路由配置
 *
 * @attribute rootRouter - 根路由
 * @attribute externalRouter - 外部路由
 * @attribute notFoundRouter - 异常路由
 * @attribute constantRouterMap - 静态路由
 */
export default {
  rootRouter: {
    key: 'Basic',
    name: 'Basic',
    path: '/',
    redirect: '/index',
    component: BasicLayout,
    meta: { title: '首页' }
  },

  externalRouter: {
    key: 'External',
    name: 'External',
    path: '/external',
    redirect: '/external/link',
    component: PageView,
    children: [
      {
        key: 'ExternalLink',
        name: 'ExternalLink',
        path: '/external/link',
        component: PageFrame,
        meta: {
          title: '外部链接',
          match: 'external',
          external: '',
          componentName: 'ExternalLink',
          hideChildInMenu: true,
          hideInMenu: true,
          allowCache: true
        }
      }
    ],
    meta: {
      title: '外部链接',
      componentName: 'External',
      hideChildInMenu: true,
      hideInMenu: true,
      allowCache: true
    },
    hidden: true
  },
  // 新增自定义业务路由
  constantRouterMap: [
    {
      path: '/page1',
      component: () => import('@/views/system/components/DevelopManage/Page1.vue')
    },
    {
      path: '/page2',
      component: () => import('@/views/system/components/DevelopManage/Page2.vue')
    },
    {
      path: '/page3',
      component: () => import('@/views/system/components/DevelopManage/Page3.vue')
    },
    {
      path: '/page4',
      component: () => import('@/views/system/components/DevelopManage/main.vue')
    },
    {
      path: '/page5',
      component: () => import('@/views/system/components/DevelopManage/Page5.vue')
    },
    {
      path: '/page6',
      component: () => import('@/views/system/components/DevelopManage/Page6.vue')
    },
    {
      path: '/page7',
      component: () => import('@/views/system/components/DevelopManage/Page7.vue')
    },
    {
      path: '/page8',
      component: () => import('@/views/system/components/DevelopManage/Page8.vue')
    },
    {
      path: '/page9',
      component: () => import('@/views/system/components/DevelopManage/Page9.vue')
    },
    {
      path: '/darkMap',
      component: () => import('@/views/system/components/DevelopManage/DarkMap.vue')
    },
    {
      path: '/openTMap',
      component: () => import('@/views/system/components/DevelopManage/OpenTMap.vue')
    },
    {
      path: '/openAMap',
      component: () => import('@/views/system/components/DevelopManage/OpenAMap.vue')
    },
    {
      path: '/previewMap',
      component: () => import('@/views/system/components/DevelopManage/DrawPreviewMap.vue')
    },
    {
      path: '/modal',
      component: () => import('@/views/system/components/DevelopManage/ModalCenter.vue')
    },
    {
      path: '/main3',
      component: () => import('@/views/system/components/DevelopManage/river/main3.vue')
    },
    {
      path: '/tip',
      component: () => import('@/views/system/components/DevelopManage/river/TipCenter.vue')
    },
    {
      path: '/patrol',
      component: () => import('@/views/system/components/DevelopManage/patrol/main3.vue')
    },
    {
      path: '/pipe',
      component: () => import('@/views/system/components/DevelopManage/pipe/main3.vue')
    },
    {
      path: '/panel',
      component: () => import('@/views/system/components/DevelopManage/panel.vue')
    },
    {
      path: '/stat',
      component: () => import('@/views/system/components/DevelopManage/stat.vue')
    },
    {
      path: '/monitor',
      component: () => import('@/views/system/components/DevelopManage/monitor.vue')
    },
    {
      path: '/safe',
      component: () => import('@/views/dashboard/safe.vue')
    },
    {
      path: '/template',
      component: () => import('@/views/system/components/DevelopManage/template.vue')
    }
  ],
  notFoundRouter: [
    {
      name: 'PageError403',
      path: '/PageError403',
      component: () => import(`@/views/error/PageError403`),
      hidden: true
    },
    {
      name: 'PageError404',
      path: '/PageError404',
      component: () => import(`@/views/error/PageError404`),
      hidden: true
    },
    {
      name: 'PageError500',
      path: '/PageError500',
      component: () => import(`@/views/error/PageError500`),
      hidden: true
    },
    {
      name: '*',
      path: '*',
      redirect: '/PageError404',
      hidden: true
    }
  ]
}
