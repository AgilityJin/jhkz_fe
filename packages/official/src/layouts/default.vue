<template>
  <v-app>
    <app-nav />
    <v-content class="jhkz-content" app>
      <v-container class="jhkz-container" fluid>
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
+block(content)
  background rgba(248, 248, 248, 1)
+block(container)
  max-width 1480px
</style>
