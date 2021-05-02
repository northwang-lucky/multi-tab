<template>
  <el-header
    :height="
      showTagsView ? Variables.HEADER_TOOLBAR_HEIGHT : Variables.HEADER_TOOLBAR_TOOLBOX_HEIGHT
    "
    class="headerToolbar"
  >
    <div class="headerToolbar-toolbox">
      <div class="headerToolbar-toolbox__left">
        <svg-icon
          :name="collapse ? 'open-menu' : 'hide-menu'"
          size="2xl"
          pointer
          @click="$emit('iconClick', 'collapse')"
        />
        &emsp;
        <path-breadcrumb />
      </div>
      <div class="headerToolbar-toolbox__right">
        <el-tooltip content="刷新当前页面" placement="bottom">
          <svg-icon name="reload" size="2xl" pointer @click="$emit('iconClick', 'reload')" />
        </el-tooltip>
        &emsp;
        <el-tooltip :content="fullscreen ? '退出全屏' : '全屏'" placement="bottom">
          <svg-icon
            :name="fullscreen ? 'fullscreen-exit' : 'fullscreen'"
            size="2xl"
            pointer
            @click="$emit('iconClick', 'fullscreen')"
          />
        </el-tooltip>
        &emsp;
        <el-tooltip content="设置" placement="bottom">
          <svg-icon name="setting" size="2xl" pointer @click="$emit('iconClick', 'setting')" />
        </el-tooltip>
        &emsp;
        <el-divider direction="vertical" />
        &emsp;
        <el-avatar :src="avatar" size="medium" shape="square" />
        &nbsp;&nbsp;&nbsp;
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          @command="$emit('dropCommand', $event)"
        >
          <span class="el-dropdown-link pointer">
            <span>{{ username }}</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in dropdownMenu"
                :key="item.key"
                :command="item.key"
                :divided="item.divided"
              >
                <svg-icon :name="item.key" size="lg" />
                <span>{{ item.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div
      class="headerToolbar-tabbox"
      @mouseover="onTabBoxHover('over')"
      @mouseleave="onTabBoxHover('leave')"
    >
      <tags-view
        :style="{ transform: `translateX(${tagsViewScroll}%)` }"
        @mouseover.stop
        @mouseleave.stop
      />
    </div>
  </el-header>
  <tags-pager
    v-model:visable="tagsPager.show"
    :root-style="{ top: tagsPager.top + 'px', left: tagsPager.left + 'px' }"
    @hover="onTabBoxHover"
    @arrow-click="tagsPager.onArrowClick"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  watch
} from 'vue'
import { useStore } from '@/store'
import { DropdownItem } from '@/typings'
import Variables from '@/assets/styles/variables.scss'
import PathBreadcrumb from './components/PathBreadcrumb'
import TagsView from './components/TagsView'
import TagsPager from './components/TagsPager'
import Utils from '@/utils'

export default defineComponent({
  name: 'HeaderToolbar',
  components: {
    PathBreadcrumb,
    TagsView,
    TagsPager
  },
  props: {
    username: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    dropdownMenu: {
      type: Array as PropType<DropdownItem[]>,
      required: true
    }
  },
  emits: ['iconClick', 'dropCommand'],
  setup() {
    const store = useStore()
    const collapse = computed(() => store.state.appModule.collapse)
    const fullscreen = computed(() => store.state.appModule.fullscreen)
    const showTagsView = computed(() => store.state.settingModule.showTagsView)

    const tagsViewScroll = ref(0)
    const tagsPager = reactive<{
      top: number
      left: number
      show: boolean
      timer: NodeJS.Timeout | null
      // eslint-disable-next-line no-unused-vars
      onArrowClick: (type: 'left' | 'right') => void
    }>({
      top: 0,
      left: 0,
      show: false,
      timer: null,
      onArrowClick: (type: 'left' | 'right') => {
        const tabBoxDom = document.querySelector('.headerToolbar-tabbox') as HTMLElement
        const tagBoxWidth = tabBoxDom.getBoundingClientRect().width
        if (type === 'left') {
          tabBoxDom.scrollLeft -= tagBoxWidth
        }
        if (type === 'right') {
          tabBoxDom.scrollLeft += tagBoxWidth
        }
      }
    })

    const isNeedScroll = ref(false)
    const getNeedScroll = () => {
      const tabBoxDom = document.querySelector('.headerToolbar-tabbox') as HTMLElement
      const tabBoxWidth = tabBoxDom.getBoundingClientRect().width
      const tagsViewDom = document.querySelector('.tagsView') as HTMLElement
      const tagsViewWidth = tagsViewDom.getBoundingClientRect().width
      isNeedScroll.value = tagsViewWidth > tabBoxWidth
      if (!isNeedScroll.value) tagsViewScroll.value = 0
    }
    const viewList = computed(() => store.state.tagModule.viewList)
    watch(viewList, () => Utils.wait(100).then(getNeedScroll), { deep: true })
    watch(collapse, () => Utils.wait(400).then(getNeedScroll))
    onMounted(() => {
      getNeedScroll()
      window.addEventListener('resize', getNeedScroll)
    })
    onUnmounted(() => window.removeEventListener('resize', getNeedScroll))

    const onTabBoxHover = (type: 'over' | 'leave') => {
      const dom = document.querySelector('.headerToolbar-tabbox') as HTMLElement
      const tabBoxWidth = dom.getBoundingClientRect().width
      tagsPager.top = dom.getBoundingClientRect().top + dom.getBoundingClientRect().height + 10
      tagsPager.left = dom.getBoundingClientRect().left + tabBoxWidth / 2
      if (!isNeedScroll.value) return

      if (type === 'over') {
        if (tagsPager.timer) clearTimeout(tagsPager.timer)
        tagsPager.show = true
      }

      if (type === 'leave') {
        const waiter = Utils.waitInTimer(800)
        tagsPager.timer = waiter.timer
        waiter.clock.then(() => (tagsPager.show = false))
      }
    }

    return {
      Variables,
      collapse,
      fullscreen,
      showTagsView,
      tagsPager,
      onTabBoxHover,
      tagsViewScroll
    }
  }
})
</script>

<style lang="scss">
.headerToolbar {
  width: 100%;
  padding: 0 !important;
  box-shadow: $header-toolbar--shadow;
  z-index: 100;
  background-color: $color--white;
  transition: height 300ms;
  overflow: hidden;

  .headerToolbar-toolbox {
    @include flex(center, space-between);
    padding: 0 $space--xl;
    height: $header-toolbar-toolbox--height;
    box-shadow: $header-toolbar-toolbox--shadow;
    position: relative;
    z-index: 50;

    .headerToolbar-toolbox__left {
      @include flex(center);
    }

    .headerToolbar-toolbox__right {
      @include flex(center);
    }
  }

  .headerToolbar-tabbox {
    @include flex(center);
    @include scrollbar-hidden;
    scroll-behavior: smooth;
    flex-wrap: nowrap;
    height: $header-toolbar-tabbox--height;
    padding: 0 $space--xl;
    position: relative;
    overflow-x: auto;
  }
}
</style>
