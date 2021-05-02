<template>
  <teleport to="#contextmenu">
    <ul v-show="show" ref="contextmenuWrapper" class="contextmenu-wrapper" :style="style">
      <template v-for="item in menu" :key="item.label">
        <li
          v-if="item.disabled ? !item.disabled(routeName) : true"
          @click="item.onClick(routeName)"
        >
          {{ item.label }}
        </li>
      </template>
    </ul>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue'
import { ContextMenuItemProps } from './typings'
import { CommonObject } from '@/typings'

export default defineComponent({
  name: 'Contextmenu',
  props: {
    visable: {
      type: Boolean,
      required: true
    },
    menu: {
      type: Array as PropType<ContextMenuItemProps[]>,
      required: true
    },
    style: Object as PropType<CommonObject>,
    routeName: {
      type: String,
      required: true
    }
  },
  emits: ['update:visable'],
  setup(props, context) {
    const show = computed({
      get: () => props.visable,
      set: (value) => context.emit('update:visable', value)
    })

    const hideMenu = () => show.value && (show.value = false)

    watch(show, (value) => {
      // 左键点击任意位置，隐藏菜单
      value && document.addEventListener('click', hideMenu)
      !value && document.removeEventListener('click', hideMenu)
    })

    return {
      show
    }
  }
})
</script>

<style lang="scss">
.contextmenu-wrapper {
  width: fit-content;
  position: fixed;
  padding: $space--sm 0;
  background-color: $color--white;
  border: 1px solid $color--line;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;

  li {
    cursor: pointer;
    font-size: $font-size--sm;
    padding: $space--sm $space--lg;

    &:hover {
      background-color: rgba($color: $color--info, $alpha: 0.1);
    }
  }
}
</style>
