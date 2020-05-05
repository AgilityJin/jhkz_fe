<template>
  <v-app>
    <app-nav />
    <v-content class="jhkz-app-content" app>
      <v-container class="jhkz-app-container" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppNav from '~/pages/layouts/app-nav.vue'

@Component({
  components: {
    [AppNav.options.name]: AppNav
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="stylus" scoped>
+block(app-container)
  position relative
  padding 0
+block(app-content)
  background rgba(248, 248, 248, 1)
</style>
