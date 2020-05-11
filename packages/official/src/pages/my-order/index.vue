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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class MyOrderPage extends Vue {
  @Prop(String) status: 'in-progress' | 'finished'

  @Watch('status', { immediate: true })
  statusWatch (val: 'in-progress' | 'finished') {
    // if (val === this.status) { return }
    console.log(val)
  }
}
</script>

<style lang="stylus" scoped>
+block(my-order)
  padding  33px 33px 33px 40px
</style>
