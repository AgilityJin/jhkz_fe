<template>
  <div
    :style="{
      display: isLineBlock ? 'inline-block' : 'block',
      color,
      whiteSpace: nowarp ? 'nowrap' : 'inherit'
    }"
    class="lc-text-ellipsis"
  >
    <span @click="$emit('click')">{{ limitedText }}</span>
  </div>
</template>

<script lang="ts">
/**
 * Created by xiaomin.jin on 2020-03-11 16:04:15
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'jhkz-text-ellipsis'
})
export default class TextEllipsis extends Vue {
  @Prop({ type: String, required: true }) text!: string
  @Prop({ type: Number, required: false }) limit: number = 0
  @Prop({ type: Boolean, required: false }) isLineBlock: boolean = false
  @Prop({ type: String, required: false }) color: string = 'inherit'
  @Prop({ type: Boolean, required: false }) nowarp: boolean = false

  // 被限制长度后的文本内容
  get limitedText () {
    if (!this.text || typeof this.text !== 'string') { return '' }
    const text = this.text as string
    if (this.limit < 1) { return text }
    if (text.length <= this.limit) { return text }

    return text.slice(0, this.limit) + '...'
  }
}
</script>

<style lang="stylus" scoped>
+block(text-ellipsis) {
  font-size inherit
}
</style>
