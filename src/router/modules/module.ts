import { RouteRecordRaw } from 'vue-router'
import AppMain from '@/layout/components/AppMain'

const moduleRoutes: RouteRecordRaw = {
  name: 'module',
  path: 'module',
  component: AppMain,
  redirect: '/module/form',
  meta: {
    order: 1,
    type: 'submenu',
    label: '功能模块',
    icon: 'menu'
  },
  children: [
    {
      name: 'testForm',
      path: 'form',
      component: () => import('@/views/module/test-form'),
      meta: {
        type: 'item',
        label: '表单',
        icon: 'edit'
      }
    },
    {
      name: 'iconGrid',
      path: 'icon',
      component: () => import('@/views/module/icon-grid'),
      meta: {
        type: 'item',
        label: '图标',
        icon: 'icons'
      }
    }
  ]
}

export default moduleRoutes
