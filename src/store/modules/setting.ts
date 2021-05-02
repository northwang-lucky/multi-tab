import { Module } from 'vuex'
import { SettingStateProps, RootStateProps } from '../typings'
import { Theme } from '@/typings'
import Setting from '@/setting'

const settingModule: Module<SettingStateProps, RootStateProps> = {
  namespaced: true,
  state: {
    theme: 'default',
    showTagsView: true,
    asideWidth: 220
  },
  mutations: {
    SET_THEME(state, theme: Theme) {
      // 存储新主题
      state.theme = theme
      // 变更主题命名空间
      let classNames = document.body.className.split(' ')
      classNames = classNames.filter((className) => !className.includes('theme-') && className)
      classNames.push('theme-' + theme)
      document.body.className = classNames.join(' ')
      // 变更其他非element组件的主题色
      document.body.style.setProperty(
        '--theme-color',
        Setting.THEME_LIST.find((item) => item.name === theme)!.color
      )
    },
    SET_SHOW_TAGS_VIEW(state, status: boolean) {
      state.showTagsView = status
    },
    SET_ASIDE_WIDTH(state, width: number) {
      state.asideWidth = width
    }
  }
}

export default settingModule
