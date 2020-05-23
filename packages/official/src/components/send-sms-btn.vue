<template>
  <v-btn class="jhkz-send-sms-btn" :disabled="sendStatus" color="#C30D23" @click="sendSms">
    <span v-if="!sendStatus" class="white--text">{{ text }}</span>
    <span v-else>{{ delaytime }}s可重试</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { asyncTask } from '@helper-gdp/utils'
import { phoneNumReg } from '../utils/regular'

@Component({
  name: 'app-send-sms-btn'
})
export default class AppSendSmsBtn extends Vue {
  @Prop(String) phone: string
  @Prop(String) type: 'login' | 'register' | 'password-setting'
  @Prop({ type: String, default: '发送验证码' }) text?: string

  sendStatus = false
  delaytime = 60

  modifierText () {
    const self = this
    function timer () {
      if (self.delaytime <= 0) {
        self.sendStatus = false
        self.delaytime = 60
      } else {
        self.delaytime -= 1
        setTimeout(timer, 1000)
      }
    }
    timer()
  }

  sendSms () {
    if (!phoneNumReg.test(this.phone)) {
      this.$msg.warning('请提供正确的手机号码')
      return
    }
    switch (this.type) {
      case 'password-setting':
        this.sendSmsPasswordSetting()
        break

      default:
        this.sendSmsCaptcha()
        break
    }
  }

  async sendSmsPasswordSetting () {
    this.sendStatus = true
    const [err] = await asyncTask(this.$api.sendUserSms({
      phone: this.phone,
      type: this.type
    }))
    if (err) {
      this.sendStatus = false
      return
    }
    this.modifierText()
  }

  async sendSmsCaptcha () {
    this.sendStatus = true
    const [err] = await asyncTask(this.$api.sendSms({
      phone: this.phone,
      type: this.type
    }))
    if (err) {
      this.sendStatus = false
      return
    }
    this.modifierText()
  }
}
</script>

<style lang="stylus" scoped>
// +block(send-sms-btn)
</style>
