export interface CommonObject extends object {
  [key: string]: any
}

export type Theme = 'default' | 'green' | 'pink' | 'purple' | 'brown'

export interface ThemeListItem {
  name: Theme
  color: string
}

export interface DropdownItem {
  key: string
  label: string
  divided?: boolean
}

export interface SettingProps {
  ICON_NAME: string
  ICON_COLOR: string
  SYSTEM_NAME: string
  THEME_LIST: ThemeListItem[]
  DROP_DOWN_LIST: DropdownItem[]
}
