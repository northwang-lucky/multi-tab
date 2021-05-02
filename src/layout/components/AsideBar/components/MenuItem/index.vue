<template>
  <template v-for="item in menuItems" :key="item.key">
    <template v-if="getItemShow(item)">
      <!-- v-if submenu -->
      <el-submenu v-if="item.type === 'submenu'" :index="item.key" :disabled="item.disabled">
        <template #title>
          <svg-icon v-if="item.icon" :name="item.icon" size="xl" class="item-icon" />
          <span>{{ item.label }}</span>
        </template>
        <template v-if="item.children">
          <menu-item :route-list="item.children" />
        </template>
      </el-submenu>

      <!-- v-if group -->
      <el-menu-item-group v-if="item.type === 'group'">
        <template #title>
          <span>{{ item.label }}</span>
        </template>
        <template v-if="item.children">
          <menu-item :route-list="item.children" />
        </template>
      </el-menu-item-group>

      <!-- v-if item -->
      <el-menu-item
        v-if="item.type === 'item'"
        :index="item.key"
        @click="onMenuItemClick($event, item)"
        :disabled="item.disabled"
      >
        <svg-icon v-if="item.icon" :name="item.icon" size="xl" class="item-icon" />
        <span>{{ item.label }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { MenuItemProps } from '../../typings'
import Variables from '@/assets/styles/variables.scss'

export default defineComponent({
  name: 'MenuItem',
  props: {
    routeList: {
      type: Array as PropType<RouteRecordRaw[]>,
      required: true
    }
  },
  emits: ['itemClick'],
  setup(props, context) {
    const router = useRouter()
    const onMenuItemClick = (event: any, item: MenuItemProps) => {
      if (item.onClick) {
        item.onClick(event, item)
        context.emit('itemClick', event, item)
        return
      }
      router.push({ name: item.key })
    }

    const menuItems = computed(() => {
      return props.routeList.map((item) => {
        let temp: MenuItemProps = { key: item.name as string }
        if (item.meta) {
          temp = { ...temp, ...item.meta }
        }
        if (item.children) {
          temp.children = item.children
        }
        return temp
      })
    })

    const getItemShow = computed(() => (item: MenuItemProps) => {
      /**
       * 这里暂时不写关于用户权限控制的逻辑了，因为我也不知道你们会怎么存储用户的role字段
       * 权限控制思路：
       * 1. 假设你的role字段存在了store.userModule.role中
       * 2. 使用instanceof判断一下menuitem中的roles是数组还是字符串
       * 3. 如果是字符串：return store.userModule.role === item.roles
       * 4. 如果是数组：return item.roles.includes(store.userModule.role)
       * 5. 但是要注意修改一下分支结构，因为item.hidden的优先级在item.roles前面
       */
      return !item.hidden
    })

    return {
      menuItems,
      Variables,
      onMenuItemClick,
      getItemShow
    }
  }
})
</script>

<style lang="scss">
.asideBar-menu,
.el-menu--popup {
  .item-icon {
    margin-right: $space--md;
    fill: $aside-bar__text-color !important;
    transition: fill 300ms;
  }

  .el-menu-item {
    &.is-active {
      svg {
        fill: $aside-bar__text-color--active !important;
      }
    }

    svg {
      fill: $aside-bar__text-color !important;
    }
  }
}
</style>
