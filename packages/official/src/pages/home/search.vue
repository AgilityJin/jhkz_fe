<template>
  <div class="jhkz-home-search">
    <h3>代练服务进度查询，就上江湖客栈</h3>
    <div class="jhkz-home-search__input-box">
      <v-text-field
        placeholder="输入您要查询的订单号"
        outlined
        class="jhkz-home-search__search headline"
        type="text"
        dense
        :height="56"
        depressed
        background-color="#fff"
      >
        <template v-slot:prepend-inner>
          <v-icon :size="44">
            {{ mdiMagnify }}
          </v-icon>
        </template>
        <template v-slot:append>
          <v-btn :width="117" :height="56" large color="#C30D23">
            <span class="headline" style="color: #fff;">查 询</span>
          </v-btn>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiMagnify } from '@mdi/js'

@Component({
  name: 'home-search'
})
export default class HomeSearchComp extends Vue {
  mdiMagnify = mdiMagnify
}
</script>

<style lang="stylus">
+block(home-search)
  .v-input__slot
    padding-right 0 !important
  .v-input__append-inner
    margin-top 0 !important
</style>

<style lang="stylus" scoped>
+block(home-search)
  padding-top 90px
  height 360px
  +element(search)
    position absolute
    margin auto
    left 0
    right 0
    top 0
    bottom 0
    width 702px
  +element(input-box)
    position relative
    height 56px
  h3
    margin-bottom 54px
    text-align center
    color #666666
    font-size 26px
    font-weight bold
</style>
