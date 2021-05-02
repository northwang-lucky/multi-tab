<template>
  <div class="testForm">
    <el-alert title="页面说明" type="info" close-text="晓得了" show-icon>
      因为作者是一个二次元，同时也是原神粉，所以这里制作一个关于原神的小问卷表单，
      用来测试keep-alive。不过<b>并没有连接服务器</b>，不会收集大家的数据的
    </el-alert>
    <el-divider />
    <el-form :model="genshinImpactData" label-position="top">
      <el-row :gutter="currentGutter">
        <el-col :span="8">
          <el-form-item label="游戏昵称：">
            <el-input v-model="genshinImpactData.nickname" placeholder="请输入您的游戏昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="UID：">
            <el-input v-model="genshinImpactData.uid" placeholder="请输入您的UID" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="currentGutter">
        <el-col :span="8">
          <el-form-item label="世界等级：">
            <el-input v-model="genshinImpactData.level" placeholder="请输入您的世界等级">
              <template #append>级</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在服务器：">
            <el-radio-group v-model="genshinImpactData.server">
              <el-radio label="官服" />
              <el-radio label="B站服" />
              <el-radio label="其他渠道服" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="已有的角色：">
        <el-checkbox-group v-model="genshinImpactData.roles" :style="{ marginTop: '-15px' }">
          <template v-for="item in genshinImpactRoles" :key="item.nationality">
            <el-divider content-position="left">{{ item.nationality }}</el-divider>
            <el-checkbox v-for="role in item.roles" :key="role" :label="role" />
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-divider />
      <el-form-item class="btn-container">
        <el-button type="primary" size="large" round :style="{ width: '150px' }" @click="onSubmit">
          提 交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'TestForm',
  setup() {
    const genshinImpactData = ref({
      nickname: '',
      uid: '',
      level: '',
      server: '',
      roles: []
    })

    const genshinImpactRoles = reactive([
      {
        nationality: '蒙德',
        roles: [
          '琴',
          '安伯',
          '丽莎',
          '凯亚',
          '迪卢克',
          '雷泽',
          '温迪',
          '可莉',
          '班尼特',
          '诺艾尔',
          '菲谢尔',
          '莫娜',
          '迪奥娜',
          '阿贝多',
          '砂糖',
          '罗莎莉亚',
          '优菈'
        ]
      },
      {
        nationality: '璃月',
        roles: [
          '魈',
          '北斗',
          '凝光',
          '香菱',
          '行秋',
          '重云',
          '刻晴',
          '七七',
          '钟离',
          '达达利亚',
          '辛焱',
          '甘雨',
          '胡桃',
          '烟绯'
        ]
      }
    ])

    const onSubmit = () => console.log(genshinImpactData.value)

    return {
      currentGutter: 40,
      genshinImpactData,
      genshinImpactRoles,
      onSubmit
    }
  }
})
</script>

<style lang="scss">
.testForm {
  @include app-main-wrapper;

  .btn-container {
    @include flex(center, center);
  }

  .el-form-item__label {
    font-weight: bold;
  }
}
</style>
