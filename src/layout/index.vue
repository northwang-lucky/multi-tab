<template>
  <div v-fullscreen="fullscreen" class="wrapper">
    <el-container class="wrapper-container">
      <aside-bar
        :collapse="collapse"
        :icon-name="Setting.ICON_NAME"
        :icon-color="Setting.ICON_COLOR"
        :system-name="Setting.SYSTEM_NAME"
      />
      <el-container class="wrapper-container__right">
        <header-toolbar
          username="W先生-SirW"
          :dropdown-menu="Setting.DROP_DOWN_LIST"
          @drop-command="onDropCommand"
          @icon-click="onIconClick"
        />
        <el-scrollbar v-auto-height class="main-scroll">
          <el-main ref="mainBox" class="app-main">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform-x" mode="out-in">
                <keep-alive :include="cachedList">
                  <component :is="Component" v-if="reload" :key="$route.name" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
  <setting-pane v-model="showSetting" />
  <el-dialog v-model="showMoneyDialog" title="打赏作者" width="700px">
    <div class="dialog-body">
      <p class="text">如果你觉得这个项目帮助到了你，你可以帮作者买一杯奶茶表示鼓励(￣▽￣)~*</p>
      <main class="qrcode">
        <div class="wechat">
          <h1>WeChat</h1>
          <img src="/imgs/wechat-qrcode.png" width="220" height="220" />
        </div>
        <div class="vline" />
        <div class="alipay">
          <h1>AliPay</h1>
          <img src="/imgs/alipay-qrcode.png" width="220" height="220" />
        </div>
      </main>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, provide, ref, watch } from 'vue'
import { useStore } from '@/store'
import { RouteRecordName, useRoute, useRouter } from 'vue-router'
import { DropCommand } from './components/HeaderToolbar/typings'
import Consts from '@/consts'
import Setting from '@/setting'
import DataStorage from '@/utils/storage'
import AsideBar from './components/AsideBar'
import HeaderToolbar from './components/HeaderToolbar'
import SettingPane from './components/SettingPane'
import Variables from '@/assets/styles/variables.scss'

const resize = (el: HTMLElement, option?: any) => {
  !option && (option = {})

  const header = document.querySelector('.el-header')! as HTMLElement
  const asideBar = document.querySelector('.el-aside') as HTMLElement
  const appMain = document.querySelector('.app-main') as HTMLElement

  const screenWidth = window.screen.width
  const clientWidth = document.body.clientWidth
  const clientHeight = document.body.clientHeight
  const headerHeight = option.headerHeight || header.getBoundingClientRect().height
  const asideBarWidth = option.asideWidth || asideBar.getBoundingClientRect().width

  el.style.width = clientWidth - asideBarWidth + 'px'
  el.style.height = clientHeight - headerHeight + 'px'
  appMain.style.width = screenWidth - asideBarWidth - 10 + 'px'
}

export default defineComponent({
  name: 'Index',
  components: {
    AsideBar,
    HeaderToolbar,
    SettingPane
  },
  directives: {
    autoHeight: {
      mounted(el: HTMLElement) {
        resize(el)
        window.addEventListener('resize', () => resize(el))
      },
      unmounted(el: HTMLElement) {
        window.removeEventListener('resize', () => resize(el))
      }
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const cachedList = computed(() => store.state.tagModule.cachedList)
    const activeView = computed(() => store.state.tagModule.activeView)
    const collapse = computed({
      get: () => store.state.appModule.collapse,
      set: (value) => store.commit(Consts.MutationKey.SET_COLLAPSE, value)
    })
    const fullscreen = computed({
      get: () => store.state.appModule.fullscreen,
      set: (value) => store.commit(Consts.MutationKey.SET_FULLSCREEN, value)
    })
    const firstLoaded = computed({
      get: () => store.state.appModule.firstLoaded,
      set: (value) => store.commit(Consts.MutationKey.SET_FIRST_LOADED, value)
    })

    const reload = ref(true)
    const onReload = (routerName: string | RouteRecordName) => {
      store.commit(Consts.MutationKey.REMOVE_CACHED_VIEW, routerName)
      reload.value = false
      nextTick(() => {
        if (activeView.value !== routerName) {
          router.push({ name: routerName })
        }
        reload.value = true
        store.commit(Consts.MutationKey.ADD_CACHED_VIEW, routerName)
      })
    }
    provide('reload', onReload)

    const showSetting = ref(false)
    const asideMaxWidth = computed(() =>
      collapse.value ? store.state.settingModule.asideWidth : 70
    )
    const onIconClick = (name: string) => {
      switch (name) {
        case 'collapse':
          resize(document.querySelector('.main-scroll') as HTMLElement, {
            asideWidth: asideMaxWidth.value
          })
          collapse.value = !collapse.value
          break
        case 'reload':
          onReload(route.name!)
          break
        case 'fullscreen':
          fullscreen.value = !fullscreen.value
          break
        case 'setting':
          showSetting.value = true
          break
      }
    }

    const showMoneyDialog = ref(false)
    const onDropCommand = (command: DropCommand) => {
      switch (command) {
        case 'github':
          window.open('https://github.com/wyb199877/multi-tabs', '_blank')
          break
        case 'money':
          showMoneyDialog.value = true
          break
        case 'logout':
          window
            .$confirm({
              title: '提示',
              message: '是否确定退出系统？',
              showCancelButton: true,
              type: 'warning'
            })
            .then(() => {
              router.push('/login')
              const storage = new DataStorage()
              storage.removeItem('isLogin')
              firstLoaded.value = true
            })
            .catch(() => {})
          break
      }
    }

    const showWelcome = () => {
      const storage = new DataStorage()
      const isLogin = storage.getItem<boolean>('isLogin')
      if (isLogin && firstLoaded.value) {
        window.$notify('欢迎', '欢迎使用多页签系统模板', 'success')
        firstLoaded.value = false
      }
    }

    onMounted(() => showWelcome())

    const showTagsView = computed(() => store.state.settingModule.showTagsView)
    const headerHeight = computed(() =>
      showTagsView.value ? Variables.HEADER_TOOLBAR_HEIGHT : Variables.HEADER_TOOLBAR_TOOLBOX_HEIGHT
    )
    watch(showTagsView, () =>
      resize(document.querySelector('.main-scroll') as HTMLElement, {
        headerHeight: parseFloat(headerHeight.value)
      })
    )

    return {
      Setting,
      collapse,
      fullscreen,
      reload,
      onReload,
      cachedList,
      onDropCommand,
      showMoneyDialog,
      showSetting,
      onIconClick
    }
  }
})
</script>

<style lang="scss">
#app {
  height: 100%;

  .wrapper {
    height: 100%;
    background-color: $color--white;
    overflow-x: hidden;

    .wrapper-container {
      height: 100%;

      .wrapper-container__right {
        @include flex(flex-start, flex-start, column);
        background-color: $color--bg;

        .main-scroll {
          transition: width 400ms, height 300ms;
        }

        .app-main {
          transition: width 400ms;
          width: calc(100% - 10px);
          overflow-y: auto !important;
          overflow-x: hidden !important;
          background-color: $app-main__bg-color;
        }
      }
    }
  }
}

.dialog-body {
  .text {
    background-color: #f5f5f5;
    padding: 20px;
    font-size: 17px;
    border-left: 8px solid #67c23a;
  }

  .qrcode {
    @include flex(center, center);
    margin-top: $space--xl;
    padding-bottom: $space--xl;

    .vline {
      width: 1px;
      height: 300px;
      background-color: $color--line;
    }

    .wechat,
    .alipay {
      @include flex(center, center, column);
      flex: 1;

      h1 {
        line-height: 70px;
      }
    }
  }
}
</style>
