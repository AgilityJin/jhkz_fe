<template>
  <v-row dense class="jhkz-user">
    <v-col v-loading="userInfoLoading" cols="4">
      <div v-loading="uploadAvatarLoading" class="jhkz-user__avatar text-center">
        <v-avatar tile :size="250">
          <img
            :src="form.avatar"
            alt="未设置头像"
          >
          <div v-if="editUserInfo" class="jhkz-user__avatar-setting" @click="uploadAvatar">
            更换头像
          </div>
        </v-avatar>
      </div>
      <v-form ref="userInfo" :model="formValid">
        <v-text-field
          v-model="form.nickname"
          :disabled="!editUserInfo"
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
              :disabled="!editUserInfo"
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
        <v-radio-group v-model="form.gender" :disabled="!editUserInfo" row>
          <v-radio label="男" :value="1" />
          <v-radio label="女" :value="0" />
          <v-radio label="保密" :value="-1" />
          <template #prepend>
            <label class="jhkz-user__label">性别：</label>
          </template>
        </v-radio-group>
      </v-form>
      <div class="text-center">
        <v-btn v-if="!editUserInfo" text color="primary" @click="startEdit">
          修改个人信息
        </v-btn>
        <v-btn v-if="editUserInfo" text color="primary" @click="saveEdit">
          保存
        </v-btn>
        <v-btn v-if="editUserInfo" text @click="cancelEdit">
          取消
        </v-btn>
      </div>
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
    <app-popup v-model="passwordPopup" :content-style="{ textAlign: 'center' }" :max-width="600" title="密码修改" @close="closePasswordPopup">
      <div class="jhkz-user__dialog-content">
        <p>您的手机号：<span class="font-weight-bold">{{ form.phone | maskString({ start: 3, end: 7 }) }}</span></p>
        <v-form ref="passwordEdit" :model="passwordFormValid">
          <v-text-field
            v-model="passwordForm.smsCode"
            class="jhkz-user-dialog__captcha-input"
            dense
            outlined
            :rules="rules.smsCode"
            label="短信验证码"
            clearable
          >
            <template v-slot:append-outer>
              <app-send-sms-btn :phone="form.phone" type="password-setting" />
            </template>
          </v-text-field>
          <v-text-field
            v-model="passwordForm.password"
            :rules="rules.password"
            dense
            outlined
            label="设置登录密码"
            clearable
          />
        </v-form>
        <v-btn v-debounce="modifierPassword" :loading="passwordEditLoading" block color="#C30D23">
          <span class="white--text">确 定</span>
        </v-btn>
      </div>
    </app-popup>

    <!-- 头像上传 -->
    <v-file-input v-show="false" ref="avatarInput" accept="image/*" label="截图上传" @change="avatarChange" />
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { mdiPlus } from '@mdi/js'
import { Getter, Mutation } from 'vuex-class'
import { cloneDeep } from 'lodash'
import { asyncTask } from '@helper-gdp/utils'
import { required, length, minLength, maxLength, isNum } from '../../utils/validate'
import { AppPopup } from '~/components'
import AppSendSmsBtn from '~/components/send-sms-btn.vue'
import { CAPTCHA_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '~/config/limit-length'

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
  passwordEditLoading = false
  uploadAvatarLoading = false
  userInfoLoading = false
  editUserInfo = false
  mdiPlus = mdiPlus
  themePrimary = this.$vuetify.theme.themes.light.primary
  cacheForm: any = null
  form = {
    avatar: '',
    avatarCoverUrl: '',
    nickname: '',
    birthday: '',
    gender: -1,
    phone: ''
  }

  passwordForm = {
    smsCode: '',
    password: ''
  }

  rules = {
    smsCode: [
      required('请提供验证码'),
      isNum('请提供数字验证码'),
      length(CAPTCHA_LENGTH, `请提供${CAPTCHA_LENGTH}位验证码`)
    ],
    password: [
      required('请设置密码'),
      minLength(PASSWORD_MIN_LENGTH, `密码长度不可小于${PASSWORD_MIN_LENGTH}位`),
      maxLength(PASSWORD_MAX_LENGTH, `密码长度不可大于${PASSWORD_MAX_LENGTH}位`)
    ]
  }

  @Ref('passwordEdit') passwordEditRef: any
  @Ref('userInfo') userInfoRef: any
  @Ref('avatarInput') avatarInputRef: any
  @Getter('userInfo', { namespace: 'context' }) userInfo: any
  @Mutation('SET_USER_INFO', { namespace: 'context' }) SET_USER_INFO: Function

  created () {
    if (this.userInfo) {
      this.form = {
        avatar: this.userInfo.avatar,
        avatarCoverUrl: this.userInfo.imageCoverUrl,
        nickname: this.userInfo.nickname,
        birthday: this.userInfo.birthday,
        gender: this.userInfo.gender === null ? -1 : this.userInfo.gender,
        phone: this.userInfo.phone
      }
    }
  }

  uploadAvatar () {
    this.avatarInputRef.$refs.input.click()
  }

  async avatarChange (file: any) {
    if (!file) { return }
    const formData = new FormData()
    formData.append('file', file)
    this.uploadAvatarLoading = true
    const result = await this.$api.uploadImage(formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    this.uploadAvatarLoading = false
    this.form.avatar = result.imageUrl
    this.form.avatarCoverUrl = result.imageCoverUrl
  }

  closePasswordPopup () {
    this.passwordEditRef.reset()
    this.passwordPopup = false
  }

  async modifierPassword () {
    const validate = this.passwordEditRef.validate()
    if (!validate) { return }
    this.passwordEditLoading = true
    const [err] = await asyncTask(this.$api.modifierPassword({
      uuid: this.userInfo.uuid,
      password: this.passwordForm.password,
      smsCode: Number(this.passwordForm.smsCode)
    }))
    this.passwordEditLoading = false
    if (err) { return }
    this.$msg.success('密码修改成功')
    this.closePasswordPopup()
  }

  async saveEdit () {
    const validate = this.userInfoRef.validate()
    if (!validate) { return }
    const params = {
      nickname: this.form.nickname,
      birthday: this.form.birthday,
      gender: this.form.gender,
      avatar: this.form.avatar,
      avatarCoverUrl: this.form.avatarCoverUrl
    }
    this.userInfoLoading = true
    const [err] = await asyncTask(this.$api.updateUser(params, {
      payload: `/${this.userInfo.uuid}`
    }))
    this.userInfoLoading = false
    if (err) { return }
    this.$msg.success('修改个人信息成功')
    this.SET_USER_INFO(Object.assign({}, this.userInfo, params))
    this.editUserInfo = false
    this.cacheForm = null
  }

  cancelEdit () {
    this.form = cloneDeep(this.cacheForm)
    this.editUserInfo = false
  }

  startEdit () {
    this.cacheForm = cloneDeep(this.form)
    this.editUserInfo = true
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
  +element(avatar-setting)
    cursor pointer
    position absolute
    bottom 0
    color #fff
    background rgba(102, 102, 102, .51)
    width 100%
    height 38px
    line-height 38px
  +element(avatar)
    position relative
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
