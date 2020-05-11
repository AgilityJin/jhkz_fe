<template>
  <v-dialog v-model="dialogPanel" :max-width="maxWidth" class="jhkz-dialog">
    <v-card class="jhkz-dialog__container">
      <v-card-title class="jhkz-dialog__title" :class="`jhkz-dialog__title_${titleBgIndex}`">
        <div>
          <h3 class="headline">
            {{ title }}
          </h3>
          <h5 class="body-2">
            {{ subtitle }}
          </h5>
        </div>
      </v-card-title>
      <v-card-text class="jhkz-dialog__content">
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
  @Prop({ type: Number, default: 1 }) titleBgIndex?: number
  @Prop({ type: [Number, String], default: '400' }) maxWidth?: number | string
  @Prop({ type: String, default: '' }) title?: string
  @Prop({ type: String, default: '' }) subtitle?: string

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
$titleBg1 := '../../assets/images/dialog-bg-1.png'
$titleBg2 := '../../assets/images/dialog-bg-2.png'

+block(dialog)
  +element(content)
    padding-top 20px !important
  +element(title)
    display flex
    justify-content center
    padding 0 !important
    height 130px
    color #fff
    text-align center
    h3
      font-size 26px !important
      line-height 2
    +modifier(1)
      background url($titleBg1) no-repeat center
      background-size cover
    +modifier(2)
      background url($titleBg2) no-repeat center
      background-size cover
</style>
