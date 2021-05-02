import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router'
import Consts from '@/consts'
import store from '@/store'
import routes from './routes'
import DataStorage from '@/utils/storage'
import { BreadcrumbItemProps } from '@/layout/components/HeaderToolbar/typings'
import { MenuItemType } from '@/layout/components/AsideBar/typings'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由扁平化，将二级以上的路由转换成二级路由
const handleKeepAlive = (to: RouteLocationNormalized) => {
  // 判断目标路由记录是否大于2
  if (to.matched && to.matched.length > 2) {
    // 遍历路由记录，制作面包屑导航列表，并删除依赖于AppMain组件的中间路由，实现路由扁平化
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (to.meta.breadcrumb && element.name !== 'index') {
        ;(to.meta.breadcrumb as BreadcrumbItemProps[]).push({
          name: element.name!,
          label: element.meta.label as string,
          type: element.meta.type as MenuItemType
        })
      }
      if (!to.meta.breadcrumb) {
        to.meta.breadcrumb = []
      }
      if (element.components.default.name === 'AppMain') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  } else {
    // 当路由已经扁平化完毕的时候，将目标路由自身加入面包屑中
    const toBreadcrumb = to.meta.breadcrumb as BreadcrumbItemProps[]
    if (!toBreadcrumb) return
    const isToInToBreadcrumb = toBreadcrumb.some(
      (item: BreadcrumbItemProps) => item.name === to.name
    )
    if (!isToInToBreadcrumb) {
      ;(to.meta.breadcrumb as BreadcrumbItemProps[]).push({
        name: to.name!,
        label: to.meta.label as string,
        type: to.meta.type as MenuItemType
      })
    }
  }
}

router.beforeEach((to, from, next) => {
  if (!to.meta.noKeepAlive) {
    // 添加标签
    store.commit(Consts.MutationKey.ADD_VIEW, to)
    // 将路由缓存
    store.commit(Consts.MutationKey.ADD_CACHED_VIEW, to.name)
  }
  handleKeepAlive(to)
  // 如果当前已经处于登录状态，就返回原界面（正式开发请将isLogin替换为user模块中的isLogin）
  if (to.name === 'login') {
    const storage = new DataStorage()
    if (storage.getItem<boolean>('isLogin')) {
      window.$toast('warning', '您当前已经登录，如需登录其他账号，请先退出登录')
      router.back()
    }
  }
  next()
})

export default router
