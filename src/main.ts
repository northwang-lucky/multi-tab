import { createApp } from 'vue'
import router from './router'
import store, { key } from './store'
import directive from './directive'
import Element from './plugins/element-plus'
import NProgress from './plugins/n-progress'
import GlobalCommon from './plugins/global-common'
import FirstLoading from './plugins/first-loading'
import App from './App.vue'
import '@/assets/styles/index.scss'

const app = createApp(App)
// 强制开启vue-devtools
if (process.env.NODE_ENV === 'development') {
  // if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
  //   ;(window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  // }
  ;(app.config as any).devtools = true
}
app.use(FirstLoading)
app.use(router)
app.use(store, key)
app.use(directive)
app.use(Element)
app.use(NProgress)
app.use(GlobalCommon)
app.mount('#app')
