<template>
  <app-dialog
    v-model="dialogPanel"
    title="入驻申请表"
    class="jhkz-dialog-login-register"
    subtitle="<欢迎您加入江湖客栈售后服务平台>"
    :title-bg-index="2"
    @close="dialogPanel = false"
  >
    <div style="margin-bottom: 15px" class="text-center subtitle-1">
      暂未开放,如需提前预约,请点击<a @click="openChat(CUSTOMER_SERVICE_QQ)">
        这里
      </a>联系我们
    </div>
  </app-dialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch, Emit } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { AppDialog } from '.'
import { CUSTOMER_SERVICE_QQ } from '~/config'
import { openQqChat } from '~/utils'

@Component({
  name: 'app-dialog-join',
  components: {
    AppDialog
  }
})
export default class AppDialogRegisterComp extends Vue {
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
  close () {}

  @Action('recordUvPv', { namespace: 'context' }) recordUvPv: Function

  dialogPanel = false
  CUSTOMER_SERVICE_QQ = CUSTOMER_SERVICE_QQ

  openChat (qq: number | string) {
    openQqChat(qq)
    this.recordUvPv({
      target: qq
    })
  }
}
</script>

<style lang="stylus">
+block(dialog-login-register) {
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
