import { createApp, h, VNode } from 'vue'
import DataStorage from '@/utils/storage'
const storage = new DataStorage()
const KEY = 'isLoaded'

function initLoading() {
  // 加载动画
  const loadingCss = document.createElement('link')
  loadingCss.rel = 'stylesheet'
  loadingCss.type = 'text/css'
  loadingCss.href = './loading/index.css'
  document.head.appendChild(loadingCss)

  const loadingWrapper = document.createElement('div')
  loadingWrapper.id = 'loading-anim'
  document.body.appendChild(loadingWrapper)

  const childrenVNode: VNode[] = []
  const chars = ['L', 'O', 'A', 'D', 'I', 'N', 'G']
  chars.forEach((char) => childrenVNode.push(h('div', {}, char)))

  const loadingVNode = h('div', { className: 'loader' }, childrenVNode)
  createApp({ render: () => loadingVNode }).mount(loadingWrapper)

  storage.setItem(KEY, true)
}

export default {
  install: () => !storage.getItem<boolean>(KEY) && initLoading()
}
