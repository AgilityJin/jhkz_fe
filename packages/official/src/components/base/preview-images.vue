<template>
  <v-overlay :value="dialogPanel" :z-index="zIndex" @click.native="closePreview">
    <v-btn
      color="primary"
      dark
      small
      fixed
      top
      right
      fab
      @click.stop="closePreview"
    >
      <v-icon>{{ mdiCloseCircle }}</v-icon>
    </v-btn>
    <v-img max-width="90vw" max-height="90vh" contain :src="currentImage" @click.stop="clickImage" />
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Watch } from 'vue-property-decorator'
import { mdiCloseCircle } from '@mdi/js'

@Component({
  name: 'preview-images'
})
export default class PreviewImages extends Vue {
  @Model('input', { type: Boolean }) value: boolean
  @Prop(Array) images: string[]
  @Prop({ type: Number, default: 0 }) index: number

  dialogPanel = false
  zIndex = 9999
  mdiCloseCircle = mdiCloseCircle

  get currentImage () {
    return this.images[this.index]
  }

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

  @Emit()
  clickImage () {}

  closePreview () {
    this.dialogPanel = false
  }
}
</script>

<style>

</style>
