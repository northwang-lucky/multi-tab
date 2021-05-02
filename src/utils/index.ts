import Consts from '@/consts'
import store from '@/store'

class Utils {
  public static wait(timeout: number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), timeout))
  }

  public static waitInTimer(timeout: number) {
    let timer: NodeJS.Timeout | null = null
    const clock = new Promise<void>((resolve) => {
      timer = setTimeout(() => resolve(), timeout)
    })
    return { clock, timer }
  }

  public static uuid(): string {
    let d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now()
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid.replace(/-/g, '')
  }

  public static fullscreen(element: HTMLElement | Element, action: 'enable' | 'cancel'): void {
    // 检测当前浏览器是否支持直接全屏操作，若不支持则调用F11键的全屏功能
    if (typeof window.ActiveXObject !== 'undefined') {
      const wscript = new ActiveXObject('WScript.Shell')
      wscript !== null && wscript.SendKeys('{F11}')
      return
    }
    // 分别对传进来的DOM进行全屏和退出全屏操作
    let requestMethod
    switch (action) {
      case 'enable':
        requestMethod = element.requestFullscreen
        if (requestMethod) {
          requestMethod.call(element)
          return
        }
        break
      case 'cancel':
        document.fullscreenElement && document.exitFullscreen()
        return
    }
    // 如果能走到这里说明这个浏览器太low了，直接弹消息吧
    window.$toast('warning', '您当前使用的浏览器不支持全屏功能，推荐使用谷歌浏览器访问')
    store.commit(Consts.MutationKey.SET_FULLSCREEN, false)
  }

  public static getBigName(name: string) {
    return name.replace(name[0], name[0].toUpperCase())
  }

  public static getFileName(path: string, addon?: string) {
    return path.replace(/^\.\/(.*)\.\w+$/, `$1${addon || ''}`)
  }
}

export default Utils
