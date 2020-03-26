<template>
  <v-app>
    <app-nav />
    <v-content>
      <nuxt />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppNav from '~/pages/layouts/app-nav.vue'
import AppFooter from '~/pages/layouts/app-footer.vue'
@Component({
  components: {
    AppNav,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="stylus">
html {
  overflow-y auto
  font-size 14px
}
</style>
