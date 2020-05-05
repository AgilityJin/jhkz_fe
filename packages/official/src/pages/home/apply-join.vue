<template>
  <div class="jhkz-apply-join text-center">
    <h2>综合网游售后服务平台</h2>
    <h4>简单 | 专业 | 便捷</h4>
    <v-btn class="jhkz-apply-join__btn" :width="275" :height="55" color="#C30D23">
      <span class="headline" style="color: #fff;">申请入驻</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'home-apply-join'
})
export default class HomeApplyJoinComp extends Vue {}
</script>

<style lang="stylus" scoped>
+block(apply-join)
  padding-top 110px
  padding-bottom 12px
  h2
    color #666666
    font-size 40px
  h4
    color #666666
    font-size 24px
  +element(btn)
    margin 15px 0
</style>
