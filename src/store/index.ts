import { InjectionKey } from 'vue'
import { createStore, ModuleTree, Store, useStore as rawUseStore } from 'vuex'
import { RootStateProps } from './typings'
import VuexPersist from 'vuex-persist'
import Utils from '@/utils'

const moduleFiles = require.context('./modules', false, /\.ts$/)
const modules = moduleFiles.keys().reduce((modules: ModuleTree<RootStateProps>, modulePath) => {
  const moduleName = Utils.getFileName(modulePath, 'Module')
  const value = moduleFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const vuexSession = new VuexPersist({
  storage: window.sessionStorage,
  key: 'multi-tabs-session',
  modules: ['tagModule', 'appModule']
})

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  key: 'multi-tabs-local',
  modules: ['settingModule']
})

const store = createStore<RootStateProps>({
  modules,
  plugins: [vuexSession.plugin, vuexLocal.plugin]
})

export const key: InjectionKey<Store<RootStateProps>> = Symbol('vue-store')
export const useStore = () => rawUseStore(key)
export default store
