<template>
  <div class="jhkz-services">
    <app-container>
      <div class="jhkz-services__item-container">
        <div class="text-center">
          <div class="jhkz-services__logo" />
        </div>
        <div class="jhkz-services__item-box">
          <div v-for="(item, index) in services" :key="index" class="jhkz-services__item" :class="`jhkz-services__item_${index + 1}`" @click="item.callback" />
        </div>
      </div>
    </app-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { CUSTOMER_SERVICE_QQ, APPEARANCE_CONSIGNMENT_QQ, ACCOUNT_CONSIGNMENT_URL, GOLD_CONSIGNMENT_URL } from '~/config'
import { openQqChat } from '~/utils'

@Component({
  name: 'home-services'
})
export default class HomeServicesComp extends Vue {
  services = [
    {
      name: 'PVP日常代练',
      callback: () => {
        this.openChat(CUSTOMER_SERVICE_QQ)
        this.recordUvPv({
          target: CUSTOMER_SERVICE_QQ
        })
      }
    },
    {
      name: 'PVE日常代练',
      callback: () => {
        this.openChat(CUSTOMER_SERVICE_QQ)
        this.recordUvPv({
          target: CUSTOMER_SERVICE_QQ
        })
      }
    },
    {
      name: '竞技场代练',
      callback: () => {
        this.openChat(CUSTOMER_SERVICE_QQ)
        this.recordUvPv({
          target: CUSTOMER_SERVICE_QQ
        })
      }
    },
    {
      name: '资历代练',
      callback: () => {
        this.openChat(CUSTOMER_SERVICE_QQ)
        this.recordUvPv({
          target: CUSTOMER_SERVICE_QQ
        })
      }
    },
    {
      name: '金币售卖',
      callback: () => {
        this.openUrl(GOLD_CONSIGNMENT_URL)
        this.recordUvPv({
          target: GOLD_CONSIGNMENT_URL
        })
      }
    },
    {
      name: '账号代售',
      callback: () => {
        this.openUrl(ACCOUNT_CONSIGNMENT_URL)
        this.recordUvPv({
          target: ACCOUNT_CONSIGNMENT_URL
        })
      }
    },
    {
      name: '外观代售',
      callback: () => {
        this.openChat(APPEARANCE_CONSIGNMENT_QQ)
        this.recordUvPv({
          target: APPEARANCE_CONSIGNMENT_QQ
        })
      }
    },
    {
      name: '外观代抢',
      callback: () => {
        this.openChat(CUSTOMER_SERVICE_QQ)
        this.recordUvPv({
          target: CUSTOMER_SERVICE_QQ
        })
      }
    }
  ]

  @Action('recordUvPv', { namespace: 'context' }) recordUvPv: Function

  openUrl (url: string) {
    window.open(url, 'blank')
  }

  openChat (targetQq: string | number) {
    openQqChat(targetQq)
  }
}
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
