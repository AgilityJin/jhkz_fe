<template>
  <app-dialog
    v-model="dialogPanel"
    title="登录个人中心"
    class="jhkz-dialog-login-sms"
    @close="dialogPanel = false"
  >
    <v-form ref="login" :model="loginFormValid">
      <v-text-field
        v-model="loginForm.phone"
        dense
        outlined
        :rules="rules.phone"
        autofocus
        label="手机号"
        clearable
      />
      <v-text-field
        v-model="loginForm.captcha"
        :rules="rules.captcha"
        class="jhkz-dialog-login-sms__captcha-input"
        dense
        clearable
        background-color="#fff"
        outlined
        label="短信验证码"
      >
        <template v-slot:append-outer>
          <app-send-sms-btn :phone="loginForm.phone" type="login" />
        </template>
      </v-text-field>
    </v-form>
    <v-btn v-debounce="submit" :loading="submitStatus" block :height="44" color="#C30D23">
      <span class="white--text">登 录</span>
    </v-btn>
    <app-divider margin-top="25px" margin-bottom="15px">
      第三方账号登录
    </app-divider>
    <div style="margin-bottom: 15px" class="text-center">
      暂未开放
    </div>
    <div style="color: #A0A0A0" class="text-center">
      <span class="pointer" @click="switchPanel('password')">密码登录</span>
      &ensp;|&ensp;
      <span class="pointer" @click="switchPanel('register')">注册账号</span>
      <!-- &ensp;|&ensp;
      <span class="pointer" @click="switchPanel('retrieve')">忘记密码</span> -->
    </div>
  </app-dialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch, Emit, Ref } from 'vue-property-decorator'
import { asyncTask } from '@helper-gdp/utils'
import { Mutation } from 'vuex-class'
import { required, isPhone, length } from '../utils/validate'
import { setStorage } from '../utils'
import { CONTEXT_KEY } from '../config'
import { AppDialog, AppDivider } from '.'
import AppSendSmsBtn from '~/components/send-sms-btn.vue'

@Component({
  name: 'app-dialog-sms-login',
  components: {
    AppDialog,
    AppDivider,
    AppSendSmsBtn
  }
})
export default class AppDialogLoginComp extends Vue {
  @Model('input', { type: Boolean }) value: boolean

  @Watch('dialogPanel')
  dialogPanelWatch (val: boolean) {
    if (val === this.value) { return }
    this.$emit('input', val)
    if (val === false) {
      this.close()
    }
  }

  @Watch('value', { immediate: true })
  valueWatch (val: boolean) {
    if (val === this.dialogPanel) { return }
    this.dialogPanel = val
  }

  @Emit()
  close () {
    this.loginRef.reset()
  }

  @Mutation('SET_LOGIN_PANEL', { namespace: 'context' }) SET_LOGIN_PANEL: Function
  @Mutation('SET_REGISTER_PANEL', { namespace: 'context' }) SET_REGISTER_PANEL: Function
  @Mutation('SET_RETRIEVE_PANEL', { namespace: 'context' }) SET_RETRIEVE_PANEL: Function
  @Mutation('SET_USER_INFO', { namespace: 'context' }) SET_USER_INFO: Function

  dialogPanel = false
  loginFormValid = false
  submitStatus = false

  loginForm = {
    phone: '',
    captcha: ''
  }

  rules = {
    phone: [
      required('请提供手机号'),
      isPhone('请提供正确的手机号')
    ],
    captcha: [
      required('请提供验证码'),
      length(4, '请提供正确的4位验证码')
    ]
  }

  @Ref('login') readonly loginRef: any

  switchPanel (type: 'password' | 'register' | 'retrieve') {
    this.dialogPanel = false
    switch (type) {
      case 'retrieve':
        this.SET_RETRIEVE_PANEL(true)
        break
      case 'register':
        this.SET_REGISTER_PANEL(true)
        break
      case 'password':
        this.SET_LOGIN_PANEL(true)
        break
    }
  }

  async submit () {
    const validate = this.loginRef.validate()
    if (!validate) { return }
    this.submitStatus = true
    const [err, userInfo] = await asyncTask(this.$api.smsLogin({
      phone: this.loginForm.phone,
      smsCode: Number(this.loginForm.captcha)
    }))
    this.submitStatus = false
    if (err) { return }
    this.$msg.globalSuccess('登录成功')
    setStorage(CONTEXT_KEY, userInfo)
    this.SET_USER_INFO(userInfo)
    this.dialogPanel = false
  }
}
</script>

<style lang="stylus">
+block(dialog-login-sms) {
  +element(captcha-input) {
    .v-input__append-outer {
      margin-top 0 !important
    }
  }
}
</style>

<style lang="stylus" scoped>
.pointer
  cursor pointer
</style>
