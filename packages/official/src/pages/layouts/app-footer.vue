<template>
  <div class="jhkz-footer">
    <div class="jhkz-footer__link">
      <app-container>
        <div class="jhkz-footer__links">
          <v-row>
            <v-col>
              剑网三友情链接
            </v-col>
            <v-col>
              江湖客栈客服
            </v-col>
          </v-row>
          <v-divider style="border-color: #494949;" />
          <v-row>
            <v-col>
              <div class="pointer" @click="openChat(APPEARANCE_CONSIGNMENT_QQ)">
                外观交易推荐
                <span class="jhkz-footer__tip">
                  （云间小舍）
                </span>
              </div>
              <div class="pointer" @click="openUrl(ACCOUNT_CONSIGNMENT_URL)">
                账号代售推荐
                <span class="jhkz-footer__tip">
                  （风暴代售）
                </span>
              </div>
              <div class="pointer" @click="openUrl(GOLD_CONSIGNMENT_URL)">
                游戏金币推荐
                <span class="jhkz-footer__tip">
                  （老宅金币）
                </span>
              </div>
            </v-col>
            <v-col>
              <div>
                <v-btn :width="98" :height="28" color="#C30D23" @click="openChat(CUSTOMER_SERVICE_QQ)">
                  <v-icon color="#fff" left>
                    {{ mdiQqchat }}
                  </v-icon>
                  <span style="color: #fff;">在线咨询</span>
                </v-btn>
              </div>
              <div class="jhkz-footer__tip">
                在线时间(9:00-21:00)
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="jhkz-footer__aside">
          <div class="jhkz-footer__logo" />
          <div class="text-center">
            <div class="jhkz-footer__tm-code" />
            <div class="jhkz-footer__code-desc">
              天猫店铺
            </div>
          </div>
        </div>
      </app-container>
    </div>
    <div class="jhkz-footer__copyright">
      备案号: <a target="_blank" :href="ICP_URL">{{ ICP }}</a>&emsp;技术支持: {{ TECHNICAL_SUPPORT_EMAIL }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiQqchat } from '@mdi/js'
import { CUSTOMER_SERVICE_QQ, ICP, TECHNICAL_SUPPORT_EMAIL, ICP_URL, ACCOUNT_CONSIGNMENT_URL, GOLD_CONSIGNMENT_URL, APPEARANCE_CONSIGNMENT_QQ } from '~/config'
import { openQqChat } from '~/utils'

@Component({
  name: 'app-nav'
})
export default class AppNav extends Vue {
  ICP = ICP
  TECHNICAL_SUPPORT_EMAIL = TECHNICAL_SUPPORT_EMAIL
  ICP_URL = ICP_URL
  mdiQqchat = mdiQqchat
  CUSTOMER_SERVICE_QQ = CUSTOMER_SERVICE_QQ
  ACCOUNT_CONSIGNMENT_URL = ACCOUNT_CONSIGNMENT_URL
  GOLD_CONSIGNMENT_URL = GOLD_CONSIGNMENT_URL
  APPEARANCE_CONSIGNMENT_QQ = APPEARANCE_CONSIGNMENT_QQ

  openUrl (url: string) {
    window.open(url, 'blank')
  }

  openChat (targetQq: string | number) {
    openQqChat(targetQq)
  }
}
</script>

<style lang="stylus" scoped>
$logo := '../../assets/images/logo-3.png'
$shopCode := '../../assets/images/shop-code.png'

.pointer
  cursor pointer

+block(footer)
  +element(aside)
    display flex
    float right
    align-items center
  +element(code-desc)
    margin-top 20px
    font-size 12px
  +element(tm-code)
    width 98px
    height 98px
    background url($shopCode) no-repeat center
    background-size cover
  +element(logo)
    margin-right 50px
    width 194px
    height 69px
    background url($logo) no-repeat center
    background-size cover
  +element(tip)
    color #797979
  +element(links)
    display inline-block
    width 436px
    line-height 2
  +element(link)
    padding 30px 0
    background #171717
    color #fff
  +element(copyright)
    text-align center
    color #fff
    font-size 12px
    height 62px
    line-height 62px
    background #000000
</style>
