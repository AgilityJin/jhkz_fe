<template>
  <v-dialog v-model="dialogStatus" class="jhkz-confirm" :max-width="maxWidth">
    <v-card :loading="loading">
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>{{ message }}</v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialogStatus = false">
          {{ cancelText }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch, Emit } from 'vue-property-decorator'

@Component({
  name: 'jhkz-confirm'
})
export default class ConfirmComp extends Vue {
  @Model('input', { type: Boolean }) value: boolean
  @Prop(String) message: string
  @Prop({ type: String, default: '500px' }) maxWidth?: string
  @Prop({ type: String, default: '提示' }) title?: string
  @Prop({ type: String, default: '取消' }) cancelText?: string
  @Prop({ type: String, default: '确认' }) confirmText?: string
  @Prop({ type: Boolean, default: false }) loading?: boolean

  dialogStatus = false

  @Watch('dialogStatus')
  dialogStatusWatch (val: boolean) {
    if (val === this.value) { return }
    this.$emit('input', val)
    if (val === false) {
      this.close()
    }
  }

  @Watch('value', { immediate: true })
  valueWatch (val: boolean) {
    if (val === this.dialogStatus) { return }
    this.dialogStatus = val
  }

  @Emit()
  close () {}

  @Emit()
  confirm () {}
}
</script>

<style lang="stylus" scoped>
+block(confirm) {
}
</style>
