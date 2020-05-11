<template>
  <div :style="dividerStyles" :class="'jhkz-divider_' + direction" class="jhkz-divider">
    <div :style="textPadding" :class="'jhkz-divider__text_' + contentPosition" class="jhkz-divider__text">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'app-divider'
})
export default class Divider extends Vue {
  // 分割线方向 FIXME: vertical 尚未完善
  @Prop({ type: String, default: 'horizontal' }) direction?: 'horizontal' | 'vertical'
  // 内容位置
  @Prop({ type: String, default: 'center' }) contentPosition?: 'center' | 'left' | 'right'
  // 文本内边距
  @Prop({ type: String, default: '0 15px' }) contentPadding?: string
  // 分割线颜色
  @Prop({ type: String, default: '#F5F5F5' }) color?: string
  // 分割线外间距
  @Prop({ type: String, default: 'auto' }) marginLeft?: string
  @Prop({ type: String, default: 'auto' }) marginRight?: string
  @Prop({ type: String, default: 'auto' }) marginTop?: string
  @Prop({ type: String, default: 'auto' }) marginBottom?: string

  get dividerStyles () {
    return {
      backgroundColor: this.color,
      marginLeft: this.direction === 'vertical' ? this.marginLeft : 'auto',
      marginRight: this.direction === 'vertical' ? this.marginRight : 'auto',
      marginTop: this.direction === 'horizontal' ? this.marginTop : 'auto',
      marginBottom: this.direction === 'horizontal' ? this.marginBottom : 'auto'
    }
  }

  get textPadding () {
    return {
      padding: this.contentPadding
    }
  }
}
</script>

<style lang="stylus" scoped>
+block(divider)
  position relative
  +modifier(horizontal)
    display block
    height 1px
  +modifier(vertical)
    display inline-block
    width 1px
    height 1em
    vertical-align: middle;
  +element(text)
    position: absolute;
    background-color: #fff;
    +modifier(center)
      left 50%
      transform translate3d(-50%, -50%, 0)
    +modifier(left)
      left 20px
      transform translate3d(0, -50%, 0)
    +modifier(right)
      right 20px
      transform translate3d(0, -50%, 0)
</style>
