<template>
  <div class="menu1">
    <span>Menu1</span>
    <el-divider />
    <el-input v-model="str" placeholder="随便写点东西测试缓存" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Menu1',
  setup() {
    const str = ref('')
    return { str }
  }
})
</script>

<style lang="scss">
.menu1 {
  @include app-main-wrapper;
}
</style>
