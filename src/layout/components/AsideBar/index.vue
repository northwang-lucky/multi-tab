<template>
  <el-aside class="asideBar" :width="collapse ? '70px' : `${asideWidth}px`">
    <system-logo :collapse="collapse">
      <template #logo>
        <svg-icon :name="iconName" :color="Variables[iconColor]" size="4xl" />
      </template>
      <template #label>{{ systemName }}</template>
    </system-logo>
    <el-scrollbar v-auto-height>
      <module-menu :collapse="collapse" :route-list="routeList" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Variables from '@/assets/styles/variables.scss'
import SystemLogo from './components/SystemLogo'
import ModuleMenu from './components/ModuleMenu'
import { useStore } from '@/store'

const resize = (el: HTMLElement) => {
  const asideBar = document.querySelector('aside.asideBar') as HTMLElement
  const asideBarHeader = document.querySelector('aside .asideBar-header') as HTMLElement
  el.style.height =
    asideBar.getBoundingClientRect().height - asideBarHeader.getBoundingClientRect().height + 'px'
}

export default defineComponent({
  name: 'AsideBar',
  components: {
    SystemLogo,
    ModuleMenu
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
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: true
    },
    systemName: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const routeList = computed(() => {
      const indexRoute = router.options.routes.find((route) => route.name === 'index')!
      return indexRoute.children!
    })

    const store = useStore()
    const asideWidth = computed(() => store.state.settingModule.asideWidth)

    return {
      Variables,
      routeList,
      asideWidth
    }
  }
})
</script>

<style lang="scss">
.asideBar {
  background-color: $aside-bar__bg-color;
  box-shadow: $aside-bar__shadow;
  overflow: hidden !important;
  transition: width 400ms;
  z-index: 150;
}
</style>
