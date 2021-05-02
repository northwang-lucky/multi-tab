<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Utils from './utils'
import DataStorage from './utils/storage'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const storage = new DataStorage()

    onMounted(() => {
      // 这里是判断是否登录，并返回应位于的界面（正式开发请将isLogin替换为user模块中的isLogin）
      if (!storage.getItem<boolean>('isLogin')) {
        router.push('/login')
      }
      const loadingNode = document.getElementById('loading-anim')
      if (loadingNode) {
        // 这里延时是为了展示loading动画，正式开发的项目请删除延时部分，使用下面注释的代码
        Utils.wait(1500).then(() => {
          loadingNode.style.transition = 'all 400ms'
          loadingNode.style.transform = 'scale(2)'
          loadingNode.style.opacity = '0'
          Utils.wait(400).then(() => loadingNode.remove())
        })
        // loadingNode.style.transition = 'all 400ms'
        // loadingNode.style.transform = 'scale(2)'
        // loadingNode.style.opacity = '0'
        // Utils.wait(400).then(() => loadingNode.remove())
      }
    })
  }
})
</script>
