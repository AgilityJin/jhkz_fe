<template>
  <v-app-bar class="jhkz-nav" color="#6599f9" app dense>
    <v-toolbar-title>江湖客栈</v-toolbar-title>
    <v-spacer />
    <v-btn color="#fff" target="block" :href="adminAddress" text class="margin-right-10">
      员工入口
      <v-icon right>
        {{ mdiAccountTie }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiAccountTie } from '@mdi/js'
import { envConfig } from '~/config'

@Component({
  name: 'app-nav'
})
export default class AppNav extends Vue {
  mdiAccountTie = mdiAccountTie
  adminAddress = envConfig.adminAddress
}
</script>

<style lang="stylus" scoped>
.margin-right-10 {
  margin-right 10px
}
+block(nav)
  color #fff
</style>
