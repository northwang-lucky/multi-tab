<template>
  <el-menu
    :collapse="collapse"
    :collapse-transition="false"
    :background-color="Variables.ASIDE_BAR_BG_COLOR"
    :text-color="Variables.ASIDE_BAR_COLOR"
    :active-text-color="Variables.ASIDE_BAR_ACTIVE_COLOR"
    :default-active="$route.name"
    :key="menuKey"
    unique-opened
    class="asideBar-menu"
  >
    <menu-item :route-list="routeList" @item-click="onItemClick" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { MenuItemProps } from '../../typings'
import Variables from '@/assets/styles/variables.scss'
import Utils from '@/utils'
import MenuItem from '../MenuItem'

export default defineComponent({
  name: 'ModuleMenu',
  components: {
    MenuItem
  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    routeList: {
      type: Array as PropType<MenuItemProps[]>,
      required: true
    }
  },
  setup() {
    const menuKey = ref(Utils.uuid())
    const onItemClick = () => (menuKey.value = Utils.uuid())

    return {
      Variables,
      menuKey,
      onItemClick
    }
  }
})
</script>

<style lang="scss">
.asideBar-menu {
  border-right: none !important;

  li {
    i {
      color: inherit;
    }
  }

  .el-submenu {
    li {
      background-color: $aside-bar__submenu-item__bg-color !important;

      .el-submenu__title {
        background-color: $aside-bar__submenu-item__bg-color !important;

        &:hover {
          background-color: $aside-bar__submenu-item__bg-color--hover !important;
        }
      }

      &.el-menu-item:hover {
        background-color: $aside-bar__submenu-item__bg-color--hover !important;
      }
    }
  }
}
</style>
