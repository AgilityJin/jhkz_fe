<template>
  <v-card class="jhkz-user-center__aside">
    <v-navigation-drawer>
      <v-list dense nav>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            :to="{ name: item.routeName }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiTextBoxSearchOutline, mdiAccountOutline } from '@mdi/js'

@Component({
  name: 'user-center-aside'
})
export default class UserCenterAsideComp extends Vue {
  mdiTextBoxSearchOutline = mdiTextBoxSearchOutline
  item = 0
  items = [
    { text: '订单查询', icon: mdiTextBoxSearchOutline, routeName: 'userCenterMyOrder' },
    { text: '个人设置', icon: mdiAccountOutline, routeName: 'userCenterUser' }
  ]
}
</script>

<style lang="stylus" scoped>
// +block(user-center)
//   +element(aside)
</style>
