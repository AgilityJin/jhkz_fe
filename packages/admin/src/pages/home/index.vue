<template>
  <div class="demo-index">
    <h1>江湖客栈后台管理系统</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { APP_ENV } from '~/config'

@Component
export default class YourComponent extends Vue {
  APP_ENV = APP_ENV

  created () {
  }
}
</script>

<style lang="stylus" scoped>
+block(index)
  font-size 24px
  text-align center
</style>
