<template>
  <teleport to="#tagsPager">
    <transition name="fade-transform-y">
      <div
        v-show="show"
        class="tagsPager"
        :style="rootStyle"
        @mouseover="$emit('hover', 'over')"
        @mouseleave="$emit('hover', 'leave')"
      >
        <div class="arrow left" @click="$emit('arrowClick', 'left')">
          <svg-icon name="arrow-left" size="md" color="#696969" />
        </div>
        <div class="arrow right" @click="$emit('arrowClick', 'right')">
          <svg-icon name="arrow-right" size="md" color="#696969" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'TagsPager',
  props: {
    visable: Boolean,
    rootStyle: Object
  },
  emits: ['update:visable', 'arrowClick', 'hover'],
  setup(props, context) {
    let root = document.getElementById('tagsPager')
    if (!root) {
      root = document.createElement('div')
      root.id = 'tagsPager'
      document.body.appendChild(root)
    }

    const show = computed({
      get: () => props.visable,
      set: (value) => context.emit('update:visable', value)
    })

    return {
      show
    }
  }
})
</script>

<style lang="scss">
.tagsPager {
  @include flex(center);
  position: fixed;
  background-color: $color--white;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba($color: #000, $alpha: 0.25);

  .arrow {
    @include flex(center, center);
    width: 25px;
    height: 25px;
    cursor: pointer;

    &.left {
      border-right: 1px solid $color--line;
    }
  }
}
</style>
