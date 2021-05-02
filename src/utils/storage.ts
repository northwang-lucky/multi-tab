import Cookies from 'js-cookie'

class RootStorage {
  private CURRENT_KEY = '_storage_8ba7'
  private CURRENT_STORAGE = class {
    public static setItem: any
    public static getItem: any
    public static removeItem: any
  }

  public constructor(storage: 'local' | 'session' | 'cookie') {
    switch (storage) {
      case 'local':
        Object.assign(this.CURRENT_STORAGE, window.localStorage)
        break
      case 'session':
        Object.assign(this.CURRENT_STORAGE, window.sessionStorage)
        break
      case 'cookie':
        this.CURRENT_STORAGE.setItem = Cookies.set
        this.CURRENT_STORAGE.getItem = Cookies.get
        this.CURRENT_STORAGE.removeItem = Cookies.remove
        break
    }
  }

  public getRoot() {
    if (!this.CURRENT_STORAGE.getItem(this.CURRENT_KEY)) {
      this.CURRENT_STORAGE.setItem(this.CURRENT_KEY, JSON.stringify({}))
    }
    return JSON.parse(this.CURRENT_STORAGE.getItem(this.CURRENT_KEY)!)
  }

  public setRoot(root: any) {
    this.CURRENT_STORAGE.setItem(this.CURRENT_KEY, JSON.stringify(root))
  }

  public removeRoot() {
    this.CURRENT_STORAGE.removeItem(this.CURRENT_KEY)
  }
}

class DataStorage {
  private rootStorage: RootStorage

  public constructor(storage?: 'local' | 'session' | 'cookie') {
    this.rootStorage = new RootStorage(storage || 'cookie')
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
