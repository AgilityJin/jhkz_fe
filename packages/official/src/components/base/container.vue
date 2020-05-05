<template>
  <div class="jhkz-container">
    <div class="jhkz-container__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'app-container'
})
export default class AppContainerComp extends Vue {}
</script>

<style lang="stylus" scoped>
+block(container)
  display flex
  justify-content center
  width 100%
  +element(content)
    position relative
    width 100%
    height 100%
    max-width 1480px
</style>
