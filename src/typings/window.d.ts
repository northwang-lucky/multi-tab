/* eslint-disable no-unused-vars */
import { MessageType } from 'element-plus/lib/el-message/src/types'
import { ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type'

declare global {
  interface Window {
    $toast: (type: MessageType, message: string) => Promise<void>
    $confirm: (option: ElMessageBoxOptions) => Promise<void>
    $notify: (title: string, message: string, type: MessageType, duration?: number) => void
  }
}
