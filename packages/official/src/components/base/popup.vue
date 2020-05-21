<template>
  <v-dialog v-model="dialogPanel" :max-width="maxWidth" class="jhkz-popup">
    <v-card class="jhkz-popup__container">
      <v-card-title class="jhkz-popup__title">
        {{ title }}
      </v-card-title>

      <v-card-text class="jhkz-popup__content" :style="contentStyle">
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch, Emit } from 'vue-property-decorator'

@Component({
  name: 'app-dialog'
})
export default class AppDialogComp extends Vue {
  @Model('input', { type: Boolean }) value: boolean
  @Prop({ type: [Number, String], default: 400 }) maxWidth?: number | string
  @Prop({ type: String, default: '提示' }) title?: string
  @Prop({ type: Object, required: false }) contentStyle?: object

  dialogPanel = false

  @Watch('dialogPanel')
  dialogPanelWatch (val: boolean) {
    if (val === this.value) { return }
    this.$emit('input', val)
    if (val === false) {
      this.close()
    }
  }

  @Watch('value', { immediate: true })
  valueWatch (val: boolean) {
    if (val === this.dialogPanel) { return }
    this.dialogPanel = val
  }

  @Emit()
  close () {}
}
</script>

<style lang="stylus" scoped>
+block(popup)
  +element(content)
    padding 30px !important
  +element(title)
    padding 0 16px !important
    height 45px
    background #2D2D2D
    color #fff
    font-size 16px
    font-weight bold
</style>
