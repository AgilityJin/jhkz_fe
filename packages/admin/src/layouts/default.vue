<template>
  <v-app>
    <v-ngvigation-drawer v-mode="drawer" app>
      test
    </v-ngvigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  drawer = null
  routeMap = [
    {
      name: '订单管理',
      target: 'order',
      auth: 'order'
    }
  ]
}
</script>
