<template>
  <v-navigation-drawer :value="isDrawerShow" app hide-overlay permanent>
    aside
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'app-aside'
})
export default class AppAside extends Vue {
  @Getter('isDrawerShow', { namespace: 'context' })
  isDrawerShow: boolean

  created () {
    console.log(this.isDrawerShow)
  }
}
</script>

<style lang="stylus" scoped>
</style>
