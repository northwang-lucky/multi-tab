import { App } from 'vue'
import Utils from '@/utils'
import store from '@/store'
import Consts from '@/consts'

const vFullscreen = (app: App<Element>) => {
  app.directive('fullscreen', (el: HTMLElement | Element, binding) => {
    Utils.fullscreen(document.documentElement, binding.value ? 'enable' : 'cancel')
  })
  document.onfullscreenchange = () => {
    store.commit(Consts.MutationKey.SET_FULLSCREEN, Boolean(document.fullscreenElement))
  }
}

export default vFullscreen
