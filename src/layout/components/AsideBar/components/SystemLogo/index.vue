<template>
  <div class="asideBar-header">
    <transition name="aside-bar-logo-anim">
      <div v-show="collapse" class="asideBar-header__logo">
        <slot name="logo" />
      </div>
    </transition>
    <transition name="aside-bar-header-anim">
      <div v-show="!collapse" class="asideBar-header-container">
        <div class="asideBar-header__logo">
          <slot name="logo" />
        </div>
        &nbsp;
        <div class="asideBar-header__label">
          <slot name="label" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SystemLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss">
.asideBar-header {
  cursor: pointer;
  @include flex(center);
  font: {
    weight: bold;
    size: $font-size--md;
  }
  color: $aside-bar__header--color;
  height: $aside-bar__header--height;
  position: relative;

  .asideBar-header-container {
    @include flex(center);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .asideBar-header__label {
      white-space: nowrap;
    }
  }

  > .asideBar-header__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
