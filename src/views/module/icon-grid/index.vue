<template>
  <div class="iconGrid">
    <el-alert title="页面说明" type="info" close-text="呵呵" show-icon>
      这里是所有用到的图标
    </el-alert>
    <div class="icon-container">
      <el-row>
        <template v-for="svg in svgList" :key="svg">
          <el-col :span="3">
            <el-tooltip :content="makeSvgLabel(svg)" placement="top">
              <div class="icon-box" @click.prevent="onIconClick($event, makeSvgLabel(svg))">
                <svg-icon :name="svg" size="4xl" color="#666" />
                <span class="icon-name">{{ svg }}</span>
              </div>
            </el-tooltip>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import Utils from '@/utils'
import copy from '@/plugins/clipboard'
import variables from '@/assets/styles/variables.scss'

export default defineComponent({
  name: 'IconGrid',
  setup() {
    const svgFiles = require.context('@/assets/icons/svg', false, /\.svg$/)
    const svgList = reactive(svgFiles.keys().map((path) => Utils.getFileName(path)))
    const makeSvgLabel = computed(() => (svg: string) => `<svg-icon name="${svg}" />`)
    const onIconClick = (event: MouseEvent, text: string) => copy(text, event)

    return {
      svgList,
      makeSvgLabel,
      onIconClick,
      variables
    }
  }
})
</script>

<style lang="scss">
.iconGrid {
  @include app-main-wrapper;

  .icon-container {
    .icon-box {
      @include flex(center, center, column);
      cursor: pointer;
      margin-top: $space--6xl;

      * {
        pointer-events: none;
      }

      .icon-name {
        margin-top: $space--sm;
      }
    }
  }
}
</style>
