<template>
  <div style="width: 100%; height: 100%; overflow: hidden">
    <div class="login__bg" :class="{ blur: isInputFocus }" />
  </div>
  <div class="login">
    <div class="login-container">
      <div class="title">
        <h3>{{ Setting.SYSTEM_NAME }}</h3>
      </div>
      <div class="inputs">
        <el-form ref="loginForm" :model="loginFormData" :rules="loginRules" class="input-form">
          <el-form-item prop="username">
            <el-input
              v-model="loginFormData.username"
              prefix-icon="el-icon-user"
              placeholder="用户名：admin"
              @focus="isInputFocus = true"
              @blur="isInputFocus = false"
              @keyup.enter="onLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              prefix-icon="el-icon-lock"
              placeholder="密码：admin"
              show-password
              @focus="isInputFocus = true"
              @blur="isInputFocus = false"
              @keyup.enter="onLogin"
            />
          </el-form-item>
          <el-row :gutter="16">
            <el-col :span="17">
              <el-form-item prop="checkcode">
                <el-input
                  v-model="loginFormData.checkcode"
                  prefix-icon="el-icon-key"
                  placeholder="请输入验证码"
                  class="input__checkcode"
                  @focus="isInputFocus = true"
                  @blur="isInputFocus = false"
                  @keyup.enter="onLogin"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <img src="@/assets/images/check-code.png" class="checkcode" />
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="checkbox">
        <el-checkbox v-model="isRemember" label="记住密码（假的）" />
      </div>
      <div class="button">
        <el-button type="primary" :loading="loading" :style="{ width: '100%' }" @click="onLogin">
          登&nbsp;录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Rules } from 'async-validator'
import Setting from '@/setting'
import DataStorage from '@/utils/storage'
import Utils from '@/utils'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()

    const loginForm = ref()
    const loginFormData = reactive({
      username: 'admin',
      password: 'admin',
      checkcode: ''
    })
    const isRemember = ref(false)

    const loginRules = reactive<Rules>({
      username: {
        required: true,
        message: '请输入用户名'
      },
      password: {
        required: true,
        message: '请输入密码'
      },
      checkcode: {
        required: true,
        message: '请输入验证码'
      }
    })

    const isInputFocus = ref(false)

    const loading = ref(false)
    const onLogin = () => {
      loginForm.value.validate((isValid: boolean) => {
        if (!isValid) return
        const { username, password, checkcode } = loginFormData
        if (username !== 'admin' || password !== 'admin') {
          window.$toast('error', '用户名或密码错误')
          return
        }
        if (checkcode !== '7') {
          window.$toast('error', '验证码错误')
          return
        }
        // 正式开发时，请使用vuex进行登录操作，同时请将isLogin替换为user模块中的isLogin
        loading.value = true
        Utils.wait(1000).then(() => {
          const storage = new DataStorage()
          storage.setItem('isLogin', true)
          router.push('/')
          loading.value = false
        })
      })
    }

    return {
      Setting,
      loginForm,
      loginFormData,
      loginRules,
      isRemember,
      loading,
      onLogin,
      isInputFocus
    }
  }
})
</script>

<style lang="scss">
.login__bg {
  width: inherit;
  height: inherit;
  background: url('../../assets/images/login-bg.jpg') no-repeat center;
  background-size: cover;
  position: relative;
  transition: filter 300ms;

  &.blur {
    filter: brightness(50%);
  }
}

.login {
  .login-container {
    width: 400px;
    padding: $space--2xl $space--4xl $space--4xl;
    background-color: $color--white;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flex(center, center, column);

    .title {
      color: $color--gray;
      margin-bottom: $space--4xl;
    }

    .inputs {
      width: 100%;

      .input-form {
        .el-input--prefix {
          .el-input__inner {
            padding-left: 38px;
          }

          .el-input__prefix {
            .el-input__icon {
              width: 32px;
              font-size: $font-size--lg;
            }
          }
        }

        .checkcode {
          width: 100%;
        }
      }
    }

    .checkbox {
      width: 100%;
      margin-bottom: $space--xl;
    }

    .button {
      width: 100%;
    }
  }
}
</style>
