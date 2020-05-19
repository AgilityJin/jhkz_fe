<template>
  <v-app-bar class="jhkz-nav" app>
    <div class="jhkz-nav__box">
      <v-toolbar-title class="jhkz-nav__toolbar">
        <div class="jhkz-nav__logo" />
        <span class="jhkz-nav__caption caption">专业综合网游售后服务平台</span>
      </v-toolbar-title>
      <v-tabs centered class="jhkz-nav__tabs" height="100%">
        <v-tab :to="{ name: 'home' }">
          首页
        </v-tab>
        <v-tab v-if="false">
          我的代练
        </v-tab>
        <v-tab :to="{ name: 'userCenter' }">
          用户中心
        </v-tab>
      </v-tabs>
      <div class="jhkz-nav__aside">
        <v-text-field
          background-color="#e1e1e0"
          placeholder="游戏、代练名称"
          rounded
          dense
          class="jhkz-nav__aside-input"
          type="text"
          :append-icon="mdiMagnify"
        />
        {{ userInfo && userInfo.nickname || '' }}
        <v-menu
          v-if="userInfo"
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-avatar class="pointer" color="indigo" v-on="on">
              <img
                v-if="userInfo.avatarCoverUrl"
                :src="userInfo.avatarCoverUrl"
                :alt="userInfo.nickname"
              >
              <v-icon v-else dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </template>

          <v-list>
            <v-list-item
              :disabled="$route.name === 'userCenterUser'"
              @click="$router.push({ name: 'userCenterUser' })"
            >
              <v-list-item-title>个人设置</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else style="display: inline-block;">
          <a class="jhkz-nav__btn" @click="openPanel('password')">登录</a>
          |
          <a class="jhkz-nav__btn" @click="openPanel('register')">注册</a>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiMagnify, mdiAccountOutline } from '@mdi/js'
import { Mutation, Getter } from 'vuex-class'

@Component({
  name: 'app-nav'
})
export default class AppNav extends Vue {
  mdiMagnify = mdiMagnify
  mdiAccountOutline = mdiAccountOutline

  @Getter('userInfo', { namespace: 'context' }) userInfo: any
  @Mutation('SET_LOGIN_PANEL', { namespace: 'context' }) SET_LOGIN_PANEL: Function
  @Mutation('SET_REGISTER_PANEL', { namespace: 'context' }) SET_REGISTER_PANEL: Function

  openPanel (type: 'password' | 'register') {
    switch (type) {
      case 'register':
        this.SET_REGISTER_PANEL(true)
        break
      case 'password':
        this.SET_LOGIN_PANEL(true)
        break
    }
  }
}
</script>

<style lang="stylus">
+block(nav)
  / .v-toolbar
    box-shadow 0px 0px 24px 0px rgba(114, 114, 114, 0.28)
  > .v-toolbar__content
    justify-content center
    padding 0
</style>

<style lang="stylus" scoped>
$logo := '../../assets/images/logo-1.png';
+block(nav)
  height 62px
  line-height 62px
  color $base-font-color-2
  background-color #fff !important
  +element(btn)
    color: #666666
    &:hover
      color #C30D23
  +element(tabs)
    width auto
  +element(toolbar)
    display flex
    align-items center
    height 100%
  +element(aside-input)
    display inline-block
    font-size 14px
    margin-right 24px
  +element(aside)
    float right
    font-size 18px
  +element(box)
    display flex
    width 100%
    max-width 1480px
    height 100%
  +element(caption)
    position relative
    bottom -10px
  +element(logo)
    display inline-block
    width 126px
    height 32px
    background url($logo) center no-repeat
    background-size cover
</style>
