<template>
  <div class="jhkz-my-order">
    <h3 class="title">
      我的订单
      <v-row>
        <v-input />
      </v-row>
    </h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MyOrderPage extends Vue {
}
</script>

<style lang="stylus" scoped>
+block(my-order)
  padding  33px 33px 33px 40px
</style>
