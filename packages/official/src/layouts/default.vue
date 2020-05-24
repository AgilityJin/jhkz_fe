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
    <app-dialog-register :value="registerPanel" @close="SET_REGISTER_PANEL(false)" />
    <app-dialog-retrieve :value="retrievePanel" @close="SET_RETRIEVE_PANEL(false)" />
    <app-dialog-join :value="joinPanel" @close="SET_JOIN_PANEL(false)" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { getStorage, clearStorage } from '../utils'
import { CONTEXT_KEY } from '../config'
import AppNav from '~/pages/layouts/app-nav.vue'
import AppDialogLogin from '~/components/login-dialog.vue'
import AppDialogSmsLogin from '~/components/sms-login-dialog.vue'
import AppDialogRegister from '~/components/register-dialog.vue'
import AppDialogRetrieve from '~/components/retrieve-dialog.vue'
import AppDialogJoin from '~/components/join-dialog.vue'

@Component({
  components: {
    AppNav,
    AppDialogLogin,
    AppDialogSmsLogin,
    AppDialogRegister,
    AppDialogRetrieve,
    AppDialogJoin
  }
})
export default class DefaultLayout extends Vue {
  @Getter('loginPanel', { namespace: 'context' }) loginPanel: boolean
  @Getter('loginSmsPanel', { namespace: 'context' }) loginSmsPanel: boolean
  @Getter('registerPanel', { namespace: 'context' }) registerPanel: boolean
  @Getter('retrievePanel', { namespace: 'context' }) retrievePanel: boolean
  @Getter('joinPanel', { namespace: 'context' }) joinPanel: boolean
  @Getter('userInfo', { namespace: 'context' }) userInfo: any

  @Mutation('SET_LOGIN_PANEL', { namespace: 'context' }) SET_LOGIN_PANEL: Function
  @Mutation('SET_LOGIN_SMS_PANEL', { namespace: 'context' }) SET_LOGIN_SMS_PANEL: Function
  @Mutation('SET_REGISTER_PANEL', { namespace: 'context' }) SET_REGISTER_PANEL: Function
  @Mutation('SET_RETRIEVE_PANEL', { namespace: 'context' }) SET_RETRIEVE_PANEL: Function
  @Mutation('SET_JOIN_PANEL', { namespace: 'context' }) SET_JOIN_PANEL: Function
  @Mutation('SET_USER_INFO', { namespace: 'context' }) SET_USER_INFO: Function

  @Action('recordUvPv', { namespace: 'context' }) recordUvPv: Function

  authInit () {
    const ctx = this.userInfo || getStorage(CONTEXT_KEY)
    if (!ctx) { return }
    if (!ctx.expiresIn || Date.now() >= ctx.expiresIn) {
      this.SET_USER_INFO(null)
      clearStorage(CONTEXT_KEY)
    }
  }

  created () {
    this.authInit()
    this.recordUvPv({
      type: 'pv'
    })
    // Temporary until it gets fixed
    this.$vuetify.theme.themes.light.primary = '#C30D23'
    this.$vuetify.theme.applyVueMeta23()
  }

  mounted () {
    this.$meta().refresh()
  }
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
