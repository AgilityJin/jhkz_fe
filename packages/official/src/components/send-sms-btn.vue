<template>
  <v-btn class="jhkz-send-sms-btn" :disabled="sendStatus" color="#C30D23" @click="sendSmsCaptcha">
    <span v-if="!sendStatus" class="white--text">{{ text }}</span>
    <span v-else>{{ delaytime }}s可重试</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'app-send-sms-btn'
})
export default class AppSendSmsBtn extends Vue {
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

  sendSmsCaptcha () {
    this.sendStatus = true
    this.modifierText()
  }
}
</script>

<style lang="stylus" scoped>
// +block(send-sms-btn)
</style>
