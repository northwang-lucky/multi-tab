import Clipboard from 'clipboard'

export default function copy(text: string, event: any) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    window.$toast('success', '复制成功')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    window.$toast('error', '复制失败')
    clipboard.destroy()
  })
  ;(clipboard as any).onClick(event)
}
