import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'

// 使用require.context()自动获取模块
const modules: RouteRecordRaw[] = []
const moduleFiles = require.context('./modules', false, /\.ts$/)
moduleFiles.keys().forEach((key) => modules.push(moduleFiles(key).default))
modules.sort((moduleA, moduleB) => {
  const orderA = moduleA.meta!.order as number
  const orderB = moduleB.meta!.order as number
  return orderA - orderB
})

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      noKeepAlive: true
    }
  },
  {
    name: 'index',
    path: '/',
    component: Layout,
    redirect: '/workbench',
    children: [
      {
        name: 'workbench',
        path: 'workbench',
        component: () => import('@/views/workbench'),
        meta: {
          type: 'item',
          label: '工作台',
          icon: 'workbench'
        }
      },
      ...modules,
      {
        name: 'officialWeb',
        path: 'officialWeb',
        component: {},
        meta: {
          type: 'item',
          label: '官方网站',
          icon: 'web',
          disabled: true
        }
      },
      {
        name: 'elementPlus',
        path: 'elementPlus',
        component: {},
        meta: {
          type: 'item',
          label: 'Element Plus',
          icon: 'element-plus',
          onClick: () => window.open('https://element-plus.gitee.io/#/zh-CN', '_blank')
        }
      }
    ]
  }
]

export default routes
