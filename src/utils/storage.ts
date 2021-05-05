/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie'

const cookies: RootStorage = {
  setItem: Cookies.set,
  getItem: Cookies.get,
  removeItem: Cookies.remove
}

type RootStorage = { setItem: any; getItem: any; removeItem: any }

interface RootStorageProps {
  CURRENT_KEY: string
  CURRENT_STORAGE: RootStorage
  init(storage: 'local' | 'session' | 'cookie'): RootStorageProps
  getRoot(): any
  setRoot(root: any): void
  removeRoot(): void
}

const rootStorage: RootStorageProps = {
  CURRENT_KEY: '_storage_key',
  CURRENT_STORAGE: {
    setItem: null,
    getItem: null,
    removeItem: null
  },
  init(storage: 'local' | 'session' | 'cookie') {
    switch (storage) {
      case 'local':
        this.CURRENT_STORAGE = window.localStorage
        break
      case 'session':
        this.CURRENT_STORAGE = window.sessionStorage
        break
      case 'cookie':
        this.CURRENT_STORAGE = cookies
        break
    }
    return this
  },
  getRoot() {
    if (!this.CURRENT_STORAGE.getItem(this.CURRENT_KEY)) {
      this.CURRENT_STORAGE.setItem(this.CURRENT_KEY, JSON.stringify({}))
    }
    return JSON.parse(this.CURRENT_STORAGE.getItem(this.CURRENT_KEY)!)
  },
  setRoot(root: any) {
    this.CURRENT_STORAGE.setItem(this.CURRENT_KEY, JSON.stringify(root))
  },
  removeRoot() {
    this.CURRENT_STORAGE.removeItem(this.CURRENT_KEY)
  }
}

class DataStorage {
  private rootStorage: RootStorageProps

  public constructor(storage?: 'local' | 'session' | 'cookie') {
    this.rootStorage = rootStorage.init(storage || 'cookie')
  }

  public setItem(key: string, value: any) {
    const root = this.rootStorage.getRoot()
    root[key] = value
    this.rootStorage.setRoot(root)
  }

  public getItem<T>(key: string) {
    return (this.rootStorage.getRoot()[key] as T) || null
  }

  public removeItem(key: string) {
    const root = this.rootStorage.getRoot()
    root[key] && delete root[key]
    if (Object.keys(root).length === 0) {
      this.rootStorage.removeRoot()
      return
    }
    this.rootStorage.setRoot(root)
  }

  public clear() {
    this.rootStorage.removeRoot()
  }

  public get dataLength() {
    return Object.keys(this.rootStorage.getRoot()).length
  }
}

export default DataStorage
