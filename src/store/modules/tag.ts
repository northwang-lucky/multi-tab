import { Module } from 'vuex'
import { RouteRecord, RouteRecordName } from 'vue-router'
import { TagStateProps, RootStateProps, ViewListItemProps } from '../typings'
import router from '@/router'
import Utils from '@/utils'

const clearCache = (state: TagStateProps) => {
  state.cachedList = state.viewList.map((view) => Utils.getBigName(view.name as string))
}

const tagModule: Module<TagStateProps, RootStateProps> = {
  namespaced: true,
  state: {
    activeView: 'workbench',
    viewList: [{ name: 'workbench', label: '工作台' }],
    cachedList: []
  },
  mutations: {
    ADD_VIEW(state, route: RouteRecord) {
      const routeName = route.name!
      const routeLabel = route.meta!.label as string
      // 判断路由是否已经存在
      const isViewExist = state.viewList.some((view) => view.name === routeName)
      // 路由不存在则将路由加入viewList
      if (!isViewExist) {
        state.viewList.push({ name: routeName, label: routeLabel })
      }
      // 将激活路由切换为该路由
      state.activeView = routeName
    },
    REMOVE_VIEW(state, routeName: string | RouteRecordName) {
      // 如果传进来的路由是工作台则直接返回
      if (routeName === 'workbench') return
      // 获取该view的索引值
      const viewIndex = state.viewList.findIndex((view) => view.name === routeName)
      // 删除该路由
      state.viewList.splice(viewIndex, 1)
      // 如果该路由并未激活，则无需关心后续问题
      if (state.activeView !== routeName) {
        return
      }
      if (viewIndex >= state.viewList.length) {
        // 如果该路由的索引值不小于删除后的viewList长度，则将激活路由设置为viewList中最后一个路由
        state.activeView = state.viewList[state.viewList.length - 1].name
      } else {
        // 反之，仍将激活路由设置为原索引值对应的路由
        state.activeView = state.viewList[viewIndex].name
      }
      // 清除路由缓存
      clearCache(state)
      // 跳转路由
      router.push({ name: state.activeView })
    },
    SET_VIEW_LIST(state, viewList: ViewListItemProps[]) {
      state.viewList = viewList
    },
    REMOVE_RIGHT_VIEWS(state, routeName: string | RouteRecordName) {
      // 获取该view的索引值
      const viewIndex = state.viewList.findIndex((view) => view.name === routeName)
      state.viewList = state.viewList.slice(0, viewIndex + 1)
      // 如果目前存在的view中，没有已激活的页面，则将传进来的页面设置为目标页面
      if (!state.viewList.some((view) => view.name === state.activeView)) {
        state.activeView = routeName
        router.push({ name: routeName })
      }
      // 清除路由缓存
      clearCache(state)
    },
    REMOVE_OTHER_VIEWS(state, routeName: string | RouteRecordName) {
      // 获取该view
      const view = state.viewList.find((view) => view.name === routeName)!
      state.viewList.length = 1
      if (routeName !== 'workbench') {
        state.viewList.push(view)
      }
      // 如果目前存在的view中，没有已激活的页面，则将传进来的页面设置为目标页面
      if (!state.viewList.some((view) => view.name === state.activeView)) {
        state.activeView = routeName
        router.push({ name: routeName })
      }
      // 清除路由缓存
      clearCache(state)
    },
    REMOVE_ALL_VIEWS(state) {
      if (state.viewList.length === 1) {
        return
      }
      state.viewList.length = 1
      state.activeView = 'workbench'
      router.push({ name: 'workbench' })
      // 清除路由缓存
      clearCache(state)
    },
    ADD_CACHED_VIEW(state, routeName: string | RouteRecordName) {
      const bigName = Utils.getBigName(routeName as string)
      // 判断路由是否已经存在
      const isViewExist = state.cachedList.some((viewName) => viewName === bigName)
      // 路由不存在则将路由加入cachedList
      if (!isViewExist) {
        state.cachedList.push(bigName)
      }
    },
    REMOVE_CACHED_VIEW(state, routeName: string | RouteRecordName) {
      const bigName = Utils.getBigName(routeName as string)
      // 判断路由是否存在
      const isViewExist = state.cachedList.some((viewName) => viewName === bigName)
      if (!isViewExist) {
        return
      }
      // 存在就删除
      const viewIndex = state.cachedList.indexOf(bigName)
      state.cachedList.splice(viewIndex, 1)
    }
  }
}

export default tagModule
