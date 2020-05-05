<template>
  <v-app-bar app>
    <!-- <v-app-bar-nav-icon /> -->
    <v-toolbar-title>{{ currentTime | formatDate }}</v-toolbar-title>
    <v-spacer />
    {{ userInfo.nickname || userInfo.name || '' }}
    <v-menu bottom>
      <template v-slot:activator="{ on }">
        <v-btn fab small tile icon v-on="on">
          <v-icon>
            {{ mdiAccount }}
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="passwordDialog = true">
          <v-list-item-title>修改密码</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logoutDialog = true">
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 修改密码 -->
    <v-dialog v-model="passwordDialog" max-width="350px" @click:outside="closePasswordPanel">
      <v-card :loading="passwordDialogLoading">
        <v-card-title>修改密码</v-card-title>

        <v-card-text>
          <v-form ref="passwordEdit" :model="passwordEditValid">
            <v-text-field v-model="passwordForm.oldPassword" :rules="rules.oldPassword" autofocus type="password" label="*密码" />
            <v-text-field v-model="passwordForm.password" :rules="rules.password" type="password" label="*新密码" />
            <v-text-field
              v-model="confirmPassword"
              :error-messages="confirmPasswordError"
              :rules="rules.confirmPassword"
              type="password"
              label="*确认新密码"
              @blur="validateConfirmPassword"
              @change="validateConfirmPassword"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closePasswordPanel">
            取消
          </v-btn>
          <v-btn text color="blue darken-1" @click="putPassword">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="logoutDialog" max-width="300px">
      <v-card>
        <v-card-title>提示</v-card-title>

        <v-card-text>您确认要退出系统吗?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="logoutDialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="logout">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { mdiAccount } from '@mdi/js'
import { refReset, refValidate } from '../../utils/validate'
import { required, maxLength, minLength } from '~/utils/validate'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '~/config/limit-length'

export default Vue.extend({
  name: 'AppBar',
  data () {
    return {
      currentTime: null,
      mdiAccount,
      logoutDialog: false,
      passwordDialog: false,
      passwordEditValid: false,
      passwordDialogLoading: false,
      passwordForm: {
        oldPassword: '',
        password: ''
      },
      confirmPassword: '',
      confirmPasswordError: '',
      rules: {
        oldPassword: [
          required('请填写原密码'),
          minLength(PASSWORD_MIN_LENGTH, `密码长度不可小于${PASSWORD_MIN_LENGTH}`),
          maxLength(PASSWORD_MAX_LENGTH, `密码长度不可大于${PASSWORD_MAX_LENGTH}`)
        ],
        password: [
          required('请填写新密码'),
          minLength(PASSWORD_MIN_LENGTH, `密码长度不可小于${PASSWORD_MIN_LENGTH}`),
          maxLength(PASSWORD_MAX_LENGTH, `密码长度不可大于${PASSWORD_MAX_LENGTH}`)
        ]
      }
    }
  },
  computed: {
    ...mapGetters('context', ['userInfo'])
  },
  created () {
    const self = this
    const updateCurrentTime = function () {
      self.currentTime = new Date()
      setTimeout(updateCurrentTime, 1000)
    }
    updateCurrentTime()
  },
  methods: {
    ...mapActions('context', ['clearUserInfo']),
    async putPassword () {
      const validate = await refValidate(this.$refs, 'passwordEdit')
      if (!validate) { return }
      this.passwordDialogLoading = true
      await this.$api.updateUserPassword(this.passwordForm, {
        payload: `/${this.userInfo.userId}`
      })
      this.closePasswordPanel()
      this.$msg.success('修改密码成功')
    },
    closePasswordPanel () {
      refReset(this.$refs, 'passwordEdit')
      this.passwordDialog = false
      this.confirmPasswordError = ''
      this.passwordDialogLoading = false
    },
    validateConfirmPassword () {
      if (!this.confirmPassword) { this.confirmPasswordError = '请确认新密码'; return }
      if (this.confirmPassword !== this.passwordForm.password) {
        this.confirmPasswordError = '两次输入的密码不一致'
        return
      }
      this.confirmPasswordError = ''
    },
    logout () {
      this.clearUserInfo()
      this.$msg.globalSuccess('退出成功')
      setTimeout(() => {
        this.$router.push({
          name: 'login'
        })
      }, 1000)
    }
  }
})
</script>

<style lang="stylus" scoped>
</style>
