import { Module } from 'vuex'
import { AppStateProps, RootStateProps } from '../typings'

const appModule: Module<AppStateProps, RootStateProps> = {
  namespaced: true,
  state: {
    collapse: false,
    fullscreen: Boolean(document.fullscreenElement) || false,
    firstLoaded: true
  },
  mutations: {
    SET_COLLAPSE(state, status: boolean) {
      state.collapse = status
    },
    SET_FULLSCREEN(state, status: boolean) {
      state.fullscreen = status
    },
    SET_FIRST_LOADED(state, status: boolean) {
      state.firstLoaded = status
    }
  }
}

export default appModule
