<template>
  <div class="tagsView" v-bind="$attrs">
    <draggable
      v-model="viewList"
      filter=".no-drag"
      animation="300"
      ghostClass="tag-ghost"
      :move="onTagMove"
    >
      <transition-group>
        <div
          v-for="view in viewList"
          :key="view.name"
          class="route-tag"
          :class="[{ active: view.name === activeView }, { 'no-drag': view.name === 'workbench' }]"
          @click="onTagClick(view.name)"
          @contextmenu.prevent="onTagRightClick($event, view.name)"
        >
          <span class="tag-text">{{ view.label }}</span>
          <i
            v-if="view.name !== 'workbench'"
            class="el-icon el-icon-close tag-close"
            @click.stop="onTagClose(view.name)"
            @contextmenu.stop.prevent
          />
        </div>
      </transition-group>
    </draggable>
  </div>
  <contextmenu
    v-model:visable="contextmenu.show"
    :menu="contextmenu.menu"
    :route-name="contextmenu.routeName"
    :style="contextmenu.style"
  />
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive } from 'vue'
import { RouteRecordName, useRouter } from 'vue-router'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from '@/store'
import { ContextMenuItemProps } from '@/components/common/Contextmenu/typings'
import { Reload } from '@/layout/typings'
import Consts from '@/consts'

export default defineComponent({
  name: 'TagsView',
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const activeView = computed(() => store.state.tagModule.activeView)
    const viewList = computed({
      get: () => store.state.tagModule.viewList,
      set: (value) => store.commit(Consts.MutationKey.SET_VIEW_LIST, value)
    })

    const onTagClick = (viewName: RouteRecordName) => {
      router.push({ name: viewName })
    }
    const onTagClose = (viewName: RouteRecordName) => {
      store.commit(Consts.MutationKey.REMOVE_VIEW, viewName)
    }
    const onTagMove = (e: any) => {
      // 如果是工作台标签，则不允许拖拽
      if (e.relatedContext.element.name == 'workbench') return false
      if (e.draggedContext.element.name == 'workbench') return false
    }

    const reload = inject<Reload>('reload')!

    const contextmenu = reactive<{
      show: boolean
      style: { top: string; left: string }
      routeName: RouteRecordName | string
      menu: ContextMenuItemProps[]
    }>({
      show: false,
      style: { top: '0', left: '0' },
      routeName: '',
      menu: [
        {
          label: '刷新',
          onClick: (routeName) => reload(routeName)
        },
        {
          label: '关闭',
          disabled: (routeName) => routeName === 'workbench',
          onClick: (routeName) => {
            store.commit(Consts.MutationKey.REMOVE_VIEW, routeName)
          }
        },
        {
          label: '关闭右侧',
          onClick: (routeName) => {
            store.commit(Consts.MutationKey.REMOVE_RIGHT_VIEWS, routeName)
          }
        },
        {
          label: '关闭其他',
          onClick: (routeName) => {
            store.commit(Consts.MutationKey.REMOVE_OTHER_VIEWS, routeName)
          }
        },
        {
          label: '关闭所有',
          onClick: () => {
            store.commit(Consts.MutationKey.REMOVE_ALL_VIEWS)
          }
        }
      ]
    })

    const onTagRightClick = (event: MouseEvent, viewName: RouteRecordName) => {
      contextmenu.style.top = event.clientY + 'px'
      contextmenu.style.left = event.clientX + 'px'
      contextmenu.routeName = viewName
      contextmenu.show = true
    }

    return {
      activeView,
      viewList,
      onTagClick,
      onTagClose,
      onTagMove,
      contextmenu,
      onTagRightClick
    }
  }
})
</script>

<style lang="scss">
.tagsView {
  white-space: nowrap;

  .route-tag {
    height: 27px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    padding: 0 0.65rem;
    margin-right: $space--sm;
    font-size: $font-size--xs;
    border: 1px solid $color--darkline;
    cursor: pointer;
    background-color: $color--white;

    .tag-text {
      pointer-events: none;
      line-height: 27px;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-right: 0.4rem;
        display: none;
      }
    }

    .tag-close {
      margin-left: 3px;
      transform: translateX(3px);
      padding: 1px;
      border-radius: 100%;
      box-sizing: border-box;

      &:hover {
        background-color: rgba($color: #000, $alpha: 0.1);
      }
    }

    &.active {
      background-color: $color--primary;
      border-color: $color--primary;
      color: $color--white;
      padding: 0 $space--sm;

      .tag-text::before {
        display: inline-block;
        background-color: $color--white;
      }

      .tag-close {
        transform: translateX(1px);
        &:hover {
          background-color: rgba($color: #000, $alpha: 0.2);
        }
      }
    }
  }

  .tag-ghost {
    opacity: 0;
  }

  .tag {
    cursor: pointer;
    margin-right: $space--sm;
    user-select: none;

    &.el-tag--info {
      span {
        color: $color--black;
      }
    }

    span {
      position: relative;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-right: 0.4rem;
        display: inline-block;
        background: $color--white;
        position: absolute;
        top: 50%;
        left: -5%;
        transform: translateY(-50%);
        opacity: 0;
      }

      &.active {
        padding-left: $space--md;

        &::before {
          opacity: 1;
        }
      }
    }
  }
}
</style>
