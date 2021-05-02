<template>
  <el-breadcrumb separator="/" class="pathBreadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
        <router-link v-if="item.type !== 'group'" :to="{ name: item.name }">
          {{ item.label }}
        </router-link>
        <span v-else class="no-redirect">{{ item.label }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { MenuItemType } from '@/layout/components/AsideBar/typings'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { BreadcrumbItemProps } from '../../typings'

export default defineComponent({
  name: 'PathBreadcrumb',
  setup() {
    const route = useRoute()
    const breadcrumb = computed<BreadcrumbItemProps[]>(() => {
      let result = route.meta.breadcrumb as BreadcrumbItemProps[]
      if (!result) {
        result = [{ name: 'workbench', label: '工作台', type: 'item' as MenuItemType }]
      }
      if (result[0].name !== 'workbench') {
        result.unshift({ name: 'workbench', label: '工作台', type: 'item' as MenuItemType })
      }
      return result
    })

    return {
      breadcrumb
    }
  }
})
</script>

<style lang="scss">
.pathBreadcrumb {
  &.el-breadcrumb {
    display: inline-block;
    line-height: 50px;

    a {
      font-weight: normal;
    }

    .no-redirect {
      color: $breadcrumb__no-redirect--color;
    }

    .el-breadcrumb__item {
      &:last-child {
        a {
          color: $breadcrumb__no-redirect--color !important;
        }
      }
    }
  }
}
</style>
