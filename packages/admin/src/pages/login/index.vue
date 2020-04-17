<template>
  <div class="jhkz-login">
    <div class="jhkz-login__panel">
      <h1 class="jhkz-login__title white--text">
        江湖客栈后台管理系统{{ VERSION }}
      </h1>
      <v-form ref="login" :model="formValid" @keyup.enter.native="submit">
        <v-text-field
          v-model="form.merchantCode"
          :prepend-inner-icon="mdiDomain"
          clearable
          dense
          :rules="rules.merchantCode"
          background-color="#fff"
          autofocus
          outlined
          label="商户码"
        />
        <v-text-field
          v-model="form.account"
          :prepend-inner-icon="mdiAccount"
          clearable
          dense
          :rules="rules.account"
          background-color="#fff"
          outlined
          label="账户"
        />
        <v-text-field
          v-model="form.password"
          :prepend-inner-icon="mdiOnepassword"
          :type="'password'"
          dense
          clearable
          :rules="rules.password"
          background-color="#fff"
          outlined
          label="密码"
        />
        <v-text-field
          v-model="form.captcha"
          class="jhkz-login__captcha-input"
          :prepend-inner-icon="mdiAlphabeticalVariant"
          dense
          clearable
          :rules="rules.captcha"
          background-color="#fff"
          outlined
          label="验证码"
        >
          <template v-slot:append-outer>
            <!-- eslint-disable-next-line -->
            <div v-debounce="getCaptcha" v-html="captcha" />
          </template>
        </v-text-field>
      </v-form>
      <v-btn v-debounce="submit" :loading="submitStatus" class="white--text" block color="#4395ff">
        登 录
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiAccount, mdiOnepassword, mdiAlphabeticalVariant, mdiDomain } from '@mdi/js'
import { asyncTask } from '@helper-gdp/utils'
import { Mutation } from 'vuex-class'
import { APP_ENV } from '~/config'
import { required, refValidate } from '~/utils/validate'

@Component({
  layout: 'empty',
  middleware: ['not-need-login'],
  head () {
    return {
      title: '登录'
    }
  }
})
export default class Login extends Vue {
  formValid = false
  submitStatus = false
  mdiAccount = mdiAccount
  mdiOnepassword = mdiOnepassword
  mdiAlphabeticalVariant = mdiAlphabeticalVariant
  mdiDomain = mdiDomain
  VERSION = APP_ENV.version
  captcha = null

  form = {
    account: '', // admin
    password: '', // xc9cAocBNLb9sETztThEBm
    captcha: '',
    merchantCode: ''
  }

  rules = {
    merchantCode: [
      required('请提供所属商户码')
    ],
    account: [
      required('请提供登录账户')
    ],
    password: [
      required('请提供登录密码')
    ],
    captcha: [
      required('请提供验证码')
    ]
  }

  created () {
    this.getCaptcha()
  }

  @Mutation('UPDATE_USER_INFO', { namespace: 'context' })
  UPDATE_USER_INFO: Function

  async submit () {
    const validate = refValidate(this.$refs, 'login')
    if (!validate) { return }
    this.submitStatus = true
    const [err, userInfo] = await asyncTask(this.$api.login(this.form))
    this.submitStatus = false
    if (err) { return }
    this.$msg.globalSuccess('登录成功')
    const self = this
    this.UPDATE_USER_INFO(userInfo)
    setTimeout(() => {
      self.$router.push({
        name: 'home'
      })
    }, 1000)
  }

  async getCaptcha () {
    const result = await this.$api.captcha()
    this.captcha = result
  }
}
</script>

<style lang="stylus">
+block(login) {
  +element(captcha-input) {
    .v-input__append-outer {
      margin-top 0 !important
    }
  }
}
</style>

<style lang="stylus" scoped>
+block(login) {
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  background: linear-gradient(-45deg, #2b5876, #555074, #243949, #12fff7);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
  +element(panel) {
    padding 20px
    width: 380px
    min-height: 440px
    max-width 80%
    background url('./login-panel.png') no-repeat center
    background-size cover
  }
  +element(title) {
    margin 40px 0 10px
    text-align center
    font-size $cn-max-font-size
  }
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
