<template>
  <v-navigation-drawer expand-on-hover app hide-overlay permanent>
    aside
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'app-aside'
})
export default class AppAside extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
