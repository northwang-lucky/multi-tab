<template>
  <el-drawer v-model="visable" title="系统设置" :size="300" append-to-body>
    <div class="settings-container">
      <ul>
        <li>
          <strong class="settings-label">主题色</strong>
          <div class="settings-item settings-theme">
            <div
              v-for="theme in themes"
              :key="theme.name"
              :style="{ backgroundColor: theme.color }"
              class="theme-block"
              @click="onThemeClick(theme.name)"
            />
          </div>
        </li>
        <li>
          <el-divider />
        </li>
        <li>
          <strong class="settings-label">标签栏</strong>
          <div class="settings-item settings-showTags">
            <el-switch v-model="showTagsView" active-text="显示" inactive-text="隐藏" />
          </div>
        </li>
        <li>
          <el-divider />
        </li>
        <li>
          <strong class="settings-label">侧边栏</strong>
          <div class="settings-item settings-asideWidth">
            <span class="item-label">宽度：</span>
            <el-input-number v-model="asideWidth" size="mini" />
          </div>
        </li>
      </ul>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { Theme, ThemeListItem } from '@/typings'
import Consts from '@/consts'
import Setting from '@/setting'

export default defineComponent({
  name: 'SettingPane',
  props: {
    moduleValue: Boolean
  },
  emits: ['update:moduleValue'],
  setup(props, context) {
    const visable = computed({
      get: () => props.moduleValue,
      set: (value) => context.emit('update:moduleValue', value)
    })

    const store = useStore()
    const onThemeClick = (theme: Theme) => {
      store.commit(Consts.MutationKey.SET_THEME, theme)
    }

    const themes = ref<ThemeListItem[]>(Setting.THEME_LIST)
    const showTagsView = computed({
      get: () => store.state.settingModule.showTagsView,
      set: (value) => store.commit(Consts.MutationKey.SET_SHOW_TAGS_VIEW, value)
    })

    const asideWidth = computed({
      get: () => store.state.settingModule.asideWidth,
      set: (value) => store.commit(Consts.MutationKey.SET_ASIDE_WIDTH, value)
    })

    return {
      visable,
      themes,
      onThemeClick,
      showTagsView,
      asideWidth
    }
  }
})
</script>

<style lang="scss">
.settings-container {
  padding: 0 $space--2xl;

  .settings-label {
    &::before {
      content: '';
      width: 5px;
      height: 1em;
      display: inline-block;
      margin-right: $space--sm;
      border-radius: 2px;
      background-color: $color--primary;
      transform: translateY(2.5px);
    }
  }

  .settings-item {
    margin-top: $space--lg;

    .item-label {
      font-size: $font-size--sm;
    }
  }

  .settings-theme {
    @include flex(center);

    .theme-block {
      cursor: pointer;
      width: 25px;
      height: 25px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      margin-right: $space--md;
    }
  }

  .settings-asideWidth {
    @include flex(center, space-between);
  }
}
</style>
