<template>
  <v-card class="jhkz-user-center__aside">
    <v-navigation-drawer>
      <v-list dense nav>
        <v-list-group :prepend-icon="mdiTextBoxSearchOutline" value="true">
          <template #activator>
            <v-list-item-content>
              我的订单
            </v-list-item-content>
          </template>
          <v-list-item
            link
            :to="{
              name: 'myOrder',
              params: {
                status: 'in-progress'
              }
            }"
          >
            <v-list-item-icon />
            <v-list-item-content>
              <v-list-item-title>&emsp;代练中</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            :to="{
              name: 'myOrder',
              params: {
                status: 'finished'
              }
            }"
          >
            <v-list-item-icon />
            <v-list-item-content>
              <v-list-item-title>&emsp;已完成</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiTextBoxSearchOutline } from '@mdi/js'

@Component({
  name: 'user-center-aside'
})
export default class UserCenterAsideComp extends Vue {
  mdiTextBoxSearchOutline = mdiTextBoxSearchOutline
}
</script>

<style lang="stylus" scoped>
// +block(user-center)
//   +element(aside)
</style>
