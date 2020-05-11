<template>
  <v-app>
    <app-nav />
    <v-content class="jhkz-app-content" app>
      <v-container class="jhkz-app-container" fluid>
        <nuxt />
      </v-container>
    </v-content>
    <app-dialog-login :value="loginPanel" @close="SET_LOGIN_PANEL(false)" />
    <app-dialog-sms-login :value="loginSmsPanel" @close="SET_LOGIN_SMS_PANEL(false)" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppNav from '~/pages/layouts/app-nav.vue'
import AppDialogLogin from '~/components/login-dialog.vue'
import AppDialogSmsLogin from '~/components/sms-login-dialog.vue'
import { Getter, Mutation } from 'vuex-class'

@Component({
  components: {
    AppNav,
    AppDialogLogin,
    AppDialogSmsLogin
  }
})
export default class DefaultLayout extends Vue {
  @Getter('loginPanel', { namespace: 'context' }) loginPanel: boolean
  @Getter('loginSmsPanel', { namespace: 'context' }) loginSmsPanel: boolean

  @Mutation('SET_LOGIN_PANEL', { namespace: 'context' }) SET_LOGIN_PANEL: Function
  @Mutation('SET_LOGIN_SMS_PANEL', { namespace: 'context' }) SET_LOGIN_SMS_PANEL: Function
}
</script>

<style lang="stylus">
+block(app-content)
  .v-content__wrap
    display flex
</style>

<style lang="stylus" scoped>
+block(app-container)
  position relative
  padding 0
+block(app-content)
  background rgba(248, 248, 248, 1)
</style>
