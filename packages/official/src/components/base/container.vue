<template>
  <div :style="containerStyle" class="jhkz-container">
    <div :style="contentStyle" :class="contentClass" class="jhkz-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'app-container'
})
export default class AppContainerComp extends Vue {
  @Prop(String) contentClass?: string
  @Prop(Object) containerStyle?: Record<string, string | number>
  @Prop(Object) contentStyle?: Record<string, string | number>
}
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
