import { MenuItemType } from '@/layout/components/AsideBar/typings'
import { RouteRecordName } from 'vue-router'

export interface BreadcrumbItemProps {
  name: string | RouteRecordName
  label: string
  type: MenuItemType
}

export type DropCommand = 'github' | 'money' | 'logout'
