<template>
  <div class="jhkz-services">
    <app-container>
      <div class="jhkz-services__item-container">
        <div class="text-center">
          <div class="jhkz-services__logo" />
        </div>
        <div class="jhkz-services__item-box">
          <div v-for="(item, index) in 8" :key="index" class="jhkz-services__item" :class="`jhkz-services__item_${item}`" />
        </div>
      </div>
    </app-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'home-services'
})
export default class HomeServicesComp extends Vue {}
</script>

<style lang="stylus" scoped>
$bg := '../../assets/images/bg-lxg.png'
$logo := '../../assets/images/logo-2.png'
$item1 := '../../assets/images/item-1.png'
$item2 := '../../assets/images/item-2.png'
$item3 := '../../assets/images/item-3.png'
$item4 := '../../assets/images/item-4.png'
$item5 := '../../assets/images/item-5.png'
$item6 := '../../assets/images/item-6.png'
$item7 := '../../assets/images/item-7.png'
$item8 := '../../assets/images/item-8.png'

+block(services)
  height 580px
  background url($bg) no-repeat center
  background-size cover
  +element(item-box)
    display inline-block
  +element(item-container)
    display inline-block
    float right
    margin-top 124px
    margin-right 108px
  +element(item)
    display inline-block
    width 63px
    height 242px
    background-size cover
    cursor pointer
    margin-left 15px
    &:hover
      transform translateY(-5%)
    +modifier(1)
      background url($item1) no-repeat center
    +modifier(2)
      background url($item2) no-repeat center
    +modifier(3)
      background url($item3) no-repeat center
    +modifier(4)
      background url($item4) no-repeat center
    +modifier(5)
      background url($item5) no-repeat center
    +modifier(6)
      background url($item6) no-repeat center
    +modifier(7)
      background url($item7) no-repeat center
    +modifier(8)
      background url($item8) no-repeat center
  +element(logo)
    display inline-block
    margin-bottom 23px
    width 287px
    height 143px
    background url($logo) no-repeat center
    background-size cover
</style>
