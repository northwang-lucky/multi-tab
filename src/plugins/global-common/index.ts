import SvgIcon from '@/components/common/SvgIcon'
import Contextmenu from '@/components/common/Contextmenu'
import { App } from 'vue'

const commons = [
  {
    name: 'svg-icon',
    component: SvgIcon,
    register: () => require('@/assets/icons')
  },
  {
    name: 'contextmenu',
    component: Contextmenu,
    register: () => {
      // 创建根节点
      const rootNode = document.createElement('div')
      rootNode.id = 'contextmenu'
      document.body.appendChild(rootNode)
    }
  }
]

const GlobalCommon = {
  install: (app: App<Element>) => {
    commons.forEach((common) => {
      app.component(common.name, common.component)
      common.register && common.register()
    })
  }
}

export default GlobalCommon
