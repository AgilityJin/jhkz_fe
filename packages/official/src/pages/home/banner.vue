<template>
  <v-carousel
    v-model="swiperIndex"
    cycle
    height="440"
    class="jhkz-banner"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item>
      <div class="jhkz-banner__item  jhkz-banner__item_1">
        <app-container>
          <div class="item-content">
            <p>找了游戏代练</p>
            <p>上不了游戏也可以查询代练进度?</p>
            <p>-</p>
            <strong>江湖客栈，可以！</strong>
            <p class="item-content__tips">
              代练进度
              <v-chip small text-color="#000" color="yellow">
                <span class="item-content__tips-size">随时随地查询</span>
              </v-chip>
              |
              <v-chip small text-color="#000" color="yellow">
                <span class="item-content__tips-size">游戏截图展示</span>
              </v-chip>
              | 确保进度真实性
            </p>
          </div>
          <div class="item-content__text-tips" />
        </app-container>
      </div>
    </v-carousel-item>
    <v-carousel-item>
      <div class="jhkz-banner__item  jhkz-banner__item_2" />
    </v-carousel-item>
    <v-carousel-item>
      <div class="jhkz-banner__item  jhkz-banner__item_3">
        <div class="item-content3">
          <strong class="ft-40">代练进度展示</strong>
          <br>
          <strong class="ft-40">-</strong>
          <br>
          <p>查询方式多种可选</p>
          <p>游戏账号 | 手机号 | 订单号</p>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'home-banner'
})
export default class HomeBannerPage extends Vue {
  swiperIndex = 0
}
</script>

<style lang="stylus" scoped>
$banner1 := '../../assets/images/banner-1.png'
$banner2 := '../../assets/images/banner-2.png'
$banner3 := '../../assets/images/banner-3.png'
$banner1-text := '../../assets/images/banner-1-text.png'

.ft-40
  font-size 40px
.item-content3
  position absolute
  right 143px
  top 90px
  width 325px
  color #fff
  font-size 24px
  line-height 1.3
  text-align right
  p
    margin 0
    line-height 1.3

.item-content
  margin 105px 0 0 105px
  p
    margin 0
    line-height 1
  &__text-tips
    position relative
    float right
    right 78px
    bottom 13px
    width 363px
    height 131px
    background url($banner1-text) no-repeat center
    background-size cover
  &__tips
    font-size 24px
    &-size
      font-size 24px

+block(banner)
  +element(item)
    position relative
    width 100%
    height 100%
    background red
    +modifier(3)
      background url($banner3) no-repeat center
      background-size cover
    +modifier(2)
      background url($banner2) no-repeat center
      background-size cover
    +modifier(1)
      background url($banner1) no-repeat center
      background-size cover
      & .item-content
        font-size 40px
        color #fff
</style>
