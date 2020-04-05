<template>
  <v-navigation-drawer expand-on-hover app hide-overlay permanent>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>{{ mdiPotSteam }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="title">
          江湖客栈
        </v-list-item-title>
        <v-list-item-subtitle>
          江湖幸甚有你
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense nav>
      <template v-for="item in routersNav">
        <!-- 多级路由 -->
        <v-list-group
          v-if="item.children && item.children.length && isShowNav(item.auth)"
          :key="item.key"
          :group="item.key"
          no-action
          :prepend-icon="item.icon"
        >
          <template #activator>
            <v-list-item-content>
              {{ item.name }}
            </v-list-item-content>
          </template>
          <div v-for="el in item.children" :key="el.key">
            <v-list-item v-if="isShowNav(el.auth)" link :to="{ name: el.key }">
              <v-list-item-icon>
                <v-icon>{{ el.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ el.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>

        <!-- 单级路由 -->
        <v-list-item v-else-if="isShowNav(item.auth)" :key="item.key" link :to="{ name: item.key }">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { mdiPotSteamOutline, mdiPotSteam } from '@mdi/js'

interface IRouteItem {
  key: string,
  name: string,
  auth: string,
  icon: string,
  children?: IRouteItem[]
}

@Component({
  name: 'app-aside'
})
export default class AppAside extends Vue {
  mdiPotSteamOutline = mdiPotSteamOutline
  mdiPotSteam = mdiPotSteam

  @Getter('userInfo', { namespace: 'context' }) userInfo: Record<string, any>
  get routersNav () {
    const router: any = this.$router
    const nav = []
    for (const item of router.options.routes) {
      if (!item.name && !item.meta) { continue }
      if (item.meta.hidden) {
        continue
      }
      const el: IRouteItem = {
        key: item.name,
        name: item.meta.name,
        auth: item.meta.auth,
        icon: item.meta.icon
      }
      if (item.children) {
        el.children = []
        for (const childEl of item.children) {
          if (!childEl.name && !childEl.meta) { continue }
          if (childEl.meta.hidden) {
            continue
          }
          el.children.push({
            key: childEl.name,
            name: childEl.meta.name,
            auth: childEl.meta.auth,
            icon: childEl.meta.icon
          })
        }
      }
      nav.push(el)
    }
    return nav
  }

  isShowNav (authStr: string) {
    if (!authStr) { return true }
    if (!this.userInfo || !this.userInfo.auths) { return false }
    return this.userInfo.auths.includes(authStr)
  }
}
</script>

<style lang="stylus" scoped>
</style>
