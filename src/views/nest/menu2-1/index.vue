<template>
  <div class="menu2-1">
    <span>Menu2-1</span>
    <el-divider />
    <el-input v-model="str" placeholder="随便写点东西测试缓存" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Menu2-1',
  setup() {
    const str = ref('')
    return { str }
  }
})
</script>

<style lang="scss">
.menu2-1 {
  @include app-main-wrapper;
}
</style>
