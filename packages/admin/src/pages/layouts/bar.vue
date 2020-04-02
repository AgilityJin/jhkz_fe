<template>
  <v-app-bar app>
    <v-app-bar-nav-icon />
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
        <v-list-item
          v-for="n in 5"
          :key="n"
          @click="() => {}"
        >
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiAccount } from '@mdi/js'

export default Vue.extend({
  name: 'AppBar',
  data () {
    return {
      currentTime: null,
      mdiAccount
    }
  },
  created () {
    const self = this
    const updateCurrentTime = function () {
      self.currentTime = new Date()
      setTimeout(updateCurrentTime, 1000)
    }
    updateCurrentTime()
  }
})
</script>

<style lang="stylus" scoped>
</style>
