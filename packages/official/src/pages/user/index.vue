<template>
  <v-row dense class="jhkz-user">
    <v-col cols="4">
      <div class="jhkz-user__avatar text-center">
        <v-avatar tile :size="250">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </div>
      <v-form ref="userInfo" :model="formValid">
        <v-text-field
          v-model="form.nickname"
          clearable
          dense
          autofocus
          outlined
          label="昵称"
        >
          <template #prepend>
            <label class="jhkz-user__label">昵称：</label>
          </template>
        </v-text-field>
        <v-menu
          ref="birthday"
          v-model="birthdayMenu"
          :close-on-content-click="false"
          :return-value.sync="form.birthday"
          transition="scroll-x-transition"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.birthday"
              clearable
              dense
              outlined
              label="生日"
              readonly
              v-on="on"
            >
              <template #prepend>
                <label class="jhkz-user__label">生日：</label>
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            v-model="form.birthday"
            class="max-width"
            scrollable
            :allowed-dates="allowedBirthday"
            :first-day-of-week="0"
            locale="zh-cn"
          >
            <v-spacer />
            <v-btn text color="primary" @click="birthdayMenu = false">
              取消
            </v-btn>
            <v-btn text color="primary" @click="$refs.birthday.save(form.birthday)">
              确认
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-radio-group v-model="form.gender" row>
          <v-radio label="男" :value="1" />
          <v-radio label="女" :value="0" />
          <v-radio label="保密" :value="-1" />
          <template #prepend>
            <label class="jhkz-user__label">性别：</label>
          </template>
        </v-radio-group>
      </v-form>
    </v-col>
    <v-col cols="8">
      <div class="jhkz-user__list">
        <div class="jhkz-user__list__item">
          <div class="jhkz-user__list__item__icon">
            <div class="jhkz-user__list__item__icon_password" />
          </div>
          <div class="jhkz-user__list__item__content">
            密码
          </div>
          <div class="jhkz-user__list__item__btn">
            <v-btn outlined color="#BFBFBF" @click="passwordPopup = true">
              <v-icon :color="themePrimary">
                {{ mdiPlus }}
              </v-icon>
              <span style="color: #000000">更改</span>
            </v-btn>
          </div>
        </div>
        <div class="jhkz-user__list__item">
          <div class="jhkz-user__list__item__icon">
            <div class="jhkz-user__list__item__icon_phone" />
          </div>
          <div class="jhkz-user__list__item__content">
            手机
            <div>手机绑定为：{{ form.phone | maskString({ start: 3, end: 7 }) }}</div>
          </div>
          <div class="jhkz-user__list__item__btn">
            <v-btn disabled outlined color="#BFBFBF">
              <v-icon :color="themePrimary">
                {{ mdiPlus }}
              </v-icon>
              <span style="color: #000000">更改</span>
            </v-btn>
          </div>
        </div>
        <div class="jhkz-user__list__item">
          <div class="jhkz-user__list__item__icon">
            <div class="jhkz-user__list__item__icon_email" />
          </div>
          <div class="jhkz-user__list__item__content">
            邮箱
            <div v-if="form.email">
              邮箱绑定为：{{ form.email | maskString({ start: 4, end: form.email.length -4 }) }}
            </div>
            <div v-else>
              尚未绑定
            </div>
          </div>
          <div class="jhkz-user__list__item__btn">
            <v-btn disabled outlined color="#BFBFBF">
              <v-icon :color="themePrimary">
                {{ mdiPlus }}
              </v-icon>
              <span style="color: #000000">更改</span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-col>

    <!-- 密码修改popup -->
    <app-popup v-model="passwordPopup" :content-style="{ textAlign: 'center' }" :max-width="600" title="密码修改">
      <div class="jhkz-user__dialog-content">
        <p>您的手机号：<span class="font-weight-bold">{{ form.phone | maskString({ start: 3, end: 7 }) }}</span></p>
        <v-form ref="passwordEdit" :model="passwordFormValid">
          <v-text-field
            v-model="passwordForm.password"
            dense
            outlined
            label="设置登录密码"
            clearable
          />
          <v-text-field
            v-model="passwordForm.captcha"
            class="jhkz-user-dialog__captcha-input"
            dense
            outlined
            label="短信验证码"
            clearable
          >
            <template v-slot:append-outer>
              <app-send-sms-btn :phone="form.phone" type="reset" />
            </template>
          </v-text-field>
        </v-form>
        <v-btn block color="#C30D23">
          <span class="white--text">确 定</span>
        </v-btn>
      </div>
    </app-popup>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiPlus } from '@mdi/js'
import { Getter } from 'vuex-class'
import { AppPopup } from '~/components'
import AppSendSmsBtn from '~/components/send-sms-btn.vue'

@Component({
  components: {
    AppPopup,
    AppSendSmsBtn
  }
})
export default class UserPage extends Vue {
  formValid = false
  birthdayMenu = false
  passwordPopup = false
  passwordFormValid = false
  mdiPlus = mdiPlus
  themePrimary = this.$vuetify.theme.themes.light.primary
  form = {
    nickname: '',
    gender: -1,
    phone: ''
  }

  passwordForm = {
    captcha: '',
    password: ''
  }

  @Getter('userInfo', { namespace: 'context' }) userInfo: any

  created () {
    if (this.userInfo) {
      this.form = {
        nickname: this.userInfo.nickname,
        gender: this.userInfo.gender || -1,
        phone: this.userInfo.phone
      }
    }
  }

  allowedBirthday (val: string) {
    return new Date() >= new Date(val)
  }
}
</script>

<style lang="stylus">
+block(user-dialog) {
  +element(captcha-input) {
    .v-input__append-outer {
      margin-top 0 !important
    }
  }
}
</style>

<style lang="stylus" scoped>
$password := '../../assets/images/password.png'
$phone := '../../assets/images/phone.png'
$email := '../../assets/images/email.png'

+block(user)
  padding  33px 33px 33px 40px
  +element(dialog-content)
    display inline-block
    width 266px
  +element(avatar)
    margin-bottom 33px
  +element(list)
    background #FAFAFA
    border 1px solid #BFBFBF
    border-radius 2px
    &__item
      position relative
      display flex
      align-items center
      height 116px
      &::after
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        content: '';
        transform: scaleY(.5);
        background-color: #BFBFBF;
      &__icon
        display flex
        justify-content center
        flex .3
        +modifier(email)
          width 45px
          height 49px
          background url($email) no-repeat center
          background-size cover
        +modifier(phone)
          width 27px
          height 45px
          background url($phone) no-repeat center
          background-size cover
        +modifier(password)
          width 45px
          height 45px
          background url($password) no-repeat center
          background-size cover
      &__btn
        flex .3
      &__content
        flex 1
  +element(label)
    min-width 50px
    font-size 14px
    line-height 25px
</style>
