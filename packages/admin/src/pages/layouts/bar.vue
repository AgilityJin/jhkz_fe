<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="taggleDrawer" />
    <v-toolbar-title>Page title</v-toolbar-title>
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
import { Vue, Component } from 'vue-property-decorator'
import { mdiAccount } from '@mdi/js'
import { Getter, Mutation } from 'vuex-class'

@Component({
  name: 'app-bar'
})
export default class AppBar extends Vue {
  mdiAccount = mdiAccount

  @Mutation('UPDATE_DRAWER_SHOW', { namespace: 'context' })
  UPDATE_DRAWER_SHOW: Function

  @Getter('isDrawerShow', { namespace: 'context' })
  isDrawerShow: boolean

  taggleDrawer = () => {
    // FIXME: 此处getter始终没能拿到
    console.log(this.isDrawerShow)
    this.UPDATE_DRAWER_SHOW(!this.isDrawerShow)
  }
}
</script>

<style lang="stylus" scoped>
</style>
