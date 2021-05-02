import { App } from 'vue'
import Setting from '@/setting'
import store from '@/store'
import { MessageType } from 'element-plus/lib/el-message/src/types'
import { ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import {
  locale,
  ElMessage,
  ElMessageBox,
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElDivider,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTag,
  ElAlert,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElTooltip,
  ElCard,
  ElScrollbar,
  ElDialog,
  ElColorPicker,
  ElDrawer,
  ElSwitch,
  ElInputNumber,
  ElNotification
} from 'element-plus'
import Consts from '@/consts'

const components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElDivider,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTag,
  ElAlert,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElTooltip,
  ElCard,
  ElScrollbar,
  ElDialog,
  ElColorPicker,
  ElDrawer,
  ElSwitch,
  ElInputNumber
]

const Element = {
  install: (app: App<Element>) => {
    // 添加全部主题包
    Setting.THEME_LIST.forEach((theme) => {
      const link = document.createElement('link')
      link.href = `./theme/${theme.name}/index.css`
      link.rel = 'stylesheet'
      link.type = 'text/css'
      document.head.appendChild(link)
    })
    // 设置激活的主题
    const theme = store.state.settingModule.theme
    // 这里引入一次主题主要是为了让页面首次加载的时候更加丝滑
    require(`/public/theme/${theme}/index.css`)
    store.commit(Consts.MutationKey.SET_THEME, theme)
    // 语言包
    locale(lang)
    // 注册组件
    components.forEach((component) => app.component(component.name, component))
    // 封装ElMessage
    window.$toast = async (type: MessageType, message: string) => {
      return new Promise((resolve) => {
        ElMessage({
          type,
          message,
          offset: 50,
          onClose: () => resolve()
        })
      })
    }
    // 封装ElMessageBox
    window.$confirm = (option: ElMessageBoxOptions) => {
      return new Promise((resolve, reject) => {
        ElMessageBox(option)
          .then(() => resolve())
          .catch(() => reject())
      })
    }
    // 封装Notification
    window.$notify = (title: string, message: string, type: MessageType, duration?: number) => {
      ElNotification({
        title,
        message,
        type,
        duration: duration || 2000
      })
    }
  }
}

export default Element
