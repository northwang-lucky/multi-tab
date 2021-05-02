<template>
  <svg
    class="svgIcon"
    :class="[className, { pointer }]"
    :style="{ '--icon-color': color, '--icon-size': Variables[iconSize] }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Variables from '@/assets/styles/variables.scss'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    color: String,
    className: String,
    name: {
      type: String,
      required: true
    },
    size: String,
    pointer: Boolean
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`)
    const iconSize = computed(() => `SIZE_${props.size?.toUpperCase()}`)

    return {
      iconName,
      iconSize,
      Variables
    }
  }
})
</script>

<style lang="scss">
.svgIcon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: var(--icon-color);
  font-size: var(--icon-size);

  &:focus {
    outline: 0;
  }

  &.pointer {
    cursor: pointer;
  }
}
</style>
