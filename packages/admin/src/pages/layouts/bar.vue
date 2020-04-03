<template>
  <v-app-bar app>
    <!-- <v-app-bar-nav-icon /> -->
    <v-toolbar-title>{{ currentTime | formatDate }}</v-toolbar-title>
    <v-spacer />
    <v-menu bottom>
      <template v-slot:activator="{ on }">
        <v-btn fab small tile icon v-on="on">
          <v-icon>
            {{ mdiAccount }}
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logoutDialog = true">
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="logoutDialog" max-width="300px">
      <v-card>
        <v-card-title>提示</v-card-title>

        <v-card-text>您确认要退出系统吗?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="logoutDialog = false">
            取消
          </v-btn>
          <v-btn color="primary" text @click="logout">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { mdiAccount } from '@mdi/js'

export default Vue.extend({
  name: 'AppBar',
  data () {
    return {
      currentTime: null,
      mdiAccount,
      logoutDialog: false
    }
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
