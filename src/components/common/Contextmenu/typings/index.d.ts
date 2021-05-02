/* eslint-disable no-unused-vars */
import { RouteRecordName } from 'vue-router'

export interface ClickEvent {
  routeName: string | RouteRecordName
}

export interface ContextMenuItemProps {
  label: string
  disabled?: (routeName: string | RouteRecordName) => boolean
  onClick: (routeName: string | RouteRecordName) => void
}
