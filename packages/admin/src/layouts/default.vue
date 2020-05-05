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
import { Getter } from 'vuex-class'
import AppAside from '~/pages/layouts/aside.vue'
import AppBar from '~/pages/layouts/bar.vue'

@Component({
  middleware: ['auth'],
  components: {
    AppAside,
    AppBar
  },
  head () {
    return {
      title: this.userInfo && this.userInfo.merchant && this.userInfo.merchant.name
    }
  }
})
export default class DefaultLayout extends Vue {
  @Getter('userInfo', { namespace: 'context' }) userInfo: Record<string, any>
}
</script>
