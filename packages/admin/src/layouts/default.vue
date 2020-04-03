<template>
  <v-app>
    <app-aside />
    <app-bar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppAside from '~/pages/layouts/aside.vue'
import AppBar from '~/pages/layouts/bar.vue'

@Component({
  middleware: ['auth'],
  components: {
    AppAside,
    AppBar
  }
})
export default class DefaultLayout extends Vue {}
</script>
