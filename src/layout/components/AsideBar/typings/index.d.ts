/* eslint-disable no-unused-vars */
import { CommonObject } from '@/typings'

export type MenuItemType = 'item' | 'submenu' | 'group'

export interface MenuItemProps extends CommonObject {
  key: string
  type?: MenuItemType
  label?: string
  icon?: string
  hidden?: boolean
  roles?: string | string[]
  disabled?: boolean
  children?: MenuItemProps[] | RouteRecordRaw[]
  onClick?: (event?: any, item?: MenuItemProps) => void
}
