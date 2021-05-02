import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './style/index.scss'
import router from '@/router'

NProgress.configure({ showSpinner: false })

const whiteList = ['login']
const nProgress = {
  install: () => {
    router.beforeEach((to, from, next) => {
      if (to.name !== from.name && !whiteList.includes(to.name as string)) {
        NProgress.start()
      }
      next()
    })
    router.afterEach(() => NProgress.done())
  }
}

export default nProgress
