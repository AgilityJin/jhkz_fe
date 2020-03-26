<template>
  <div class="demo-index display-2">
    welcome to {{ name }}.
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppHome extends Vue {
  name = 'JHKZ'
}
</script>

<style lang="stylus" scoped>
+block(index)
  font-size 24px
  text-align center
</style>
