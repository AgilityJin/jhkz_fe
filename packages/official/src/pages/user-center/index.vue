<template>
  <app-container class="jhkz-user-center" :container-style="{ height: '100%' }" :content-style="contentStyle">
    <v-row align="center">
      <v-col class="jhkz-user-center__container" :cols="2">
        <user-center-aside />
      </v-col>
      <v-col class="jhkz-user-center__container" :cols="10">
        <user-center-main />
      </v-col>
    </v-row>
  </app-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserCenterAside from './aside.vue'
import UserCenterMain from './main.vue'

@Component({
  head: {
    title: '用户中心'
  },
  middleware: ['auth'],
  components: {
    UserCenterAside,
    UserCenterMain
  }
})
export default class UserCenterPage extends Vue {
  contentStyle = {
    display: 'flex'
  }
}
</script>

<style lang="stylus" scoped>
+block(user-center)
  +element(container)
    height 800px
</style>
