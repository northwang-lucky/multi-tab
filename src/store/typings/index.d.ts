import { Theme } from '@/typings'
import { RouteRecordName } from 'vue-router'

export interface RootStateProps {
  appModule: AppStateProps
  tagModule: TagStateProps
  settingModule: SettingStateProps
}

export interface AppStateProps {
  collapse: boolean
  fullscreen: boolean
  firstLoaded: boolean
}

export interface ViewListItemProps {
  name: string | RouteRecordName
  label: string
}

export interface TagStateProps {
  activeView: string | RouteRecordName
  viewList: ViewListItemProps[]
  cachedList: string[]
}

export interface SettingStateProps {
  theme: Theme
  showTagsView: boolean
  asideWidth: number
}
