<template>
  <v-card class="jhkz-user-center__main">
    <nuxt />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'user-center-main'
})
export default class UserCenterMainComp extends Vue {}
</script>

<style lang="stylus" scoped>
+block(user-center)
  +element(main)
    height 100%
</style>
