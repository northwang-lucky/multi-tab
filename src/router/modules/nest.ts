import { RouteRecordRaw } from 'vue-router'
import AppMain from '@/layout/components/AppMain'

const nestRoutes: RouteRecordRaw = {
  name: 'nest',
  path: 'nest',
  component: AppMain,
  redirect: '/nest/menu1',
  meta: {
    order: 2,
    type: 'submenu',
    label: '多级菜单',
    icon: 'nest-menu'
  },
  children: [
    {
      name: 'menu1',
      path: 'menu1',
      component: () => import('@/views/nest/menu1'),
      meta: {
        type: 'item',
        label: '菜单1'
      }
    },
    {
      name: 'menu2',
      path: 'menu2',
      component: AppMain,
      redirect: '/nest/menu2/menu2-1',
      meta: {
        type: 'submenu',
        label: '菜单2'
      },
      children: [
        {
          name: 'menu2-1',
          path: 'menu2-1',
          component: () => import('@/views/nest/menu2-1'),
          meta: {
            type: 'item',
            label: '菜单2-1'
          }
        },
        {
          name: 'menu2-2',
          path: 'menu2-2',
          component: AppMain,
          redirect: '/nest/menu2/menu2-2/menu2-2-1',
          meta: {
            type: 'submenu',
            label: '菜单2-2'
          },
          children: [
            {
              name: 'menu2-2-1',
              path: 'menu2-2-1',
              component: () => import('@/views/nest/menu2-2-1'),
              meta: {
                type: 'item',
                label: '菜单2-2-1'
              }
            }
          ]
        }
      ]
    }
  ]
}

export default nestRoutes
