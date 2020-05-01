<template>
  <v-app-bar :height="62" class="jhkz-nav" app>
    <div class="jhkz-nav__box">
      <v-toolbar-title>
        <div class="jhkz-nav__logo" />
        <span class="caption">专业综合网游售后服务平台</span>
      </v-toolbar-title>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'app-nav'
})
export default class AppNav extends Vue {}
</script>

<style lang="stylus">
+block(nav)
  / .v-toolbar
    box-shadow 0px 0px 24px 0px rgba(114, 114, 114, 0.28)
</style>

<style lang="stylus" scoped>
$logo := '../../assets/images/logo-1.png';
+block(nav)
  color $base-font-color-2
  background-color #fff !important
  +element(box)
    position absolute
    margin auto
    left 0
    right 0
    width 100%
    max-width 1480px
  +element(logo)
    display inline-block
    width 126px
    height 32px
    background url($logo) center no-repeat
    background cover
</style>
