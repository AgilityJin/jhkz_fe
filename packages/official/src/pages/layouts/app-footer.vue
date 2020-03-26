<template>
  <v-footer color="#6599f9" class="jhkz-footer" app absolute padless>
    <v-row align="center">
      <v-col cols="12">
        <v-btn
          v-for="item in links"
          :key="item.url"
          :href="item.url"
          color="#fff"
          text
          small
        >
          {{ item.name }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        联系我们
        <v-btn class="qqchat" icon @click="goQqChat">
          <v-icon color="#fff" size="24px">
            {{ qqIcon }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        技术支持: {{ TECHNICAL_SUPPORT_EMAIL }}
      </v-col>
      <v-col cols="12">
        <v-btn color="#fff" text small href="http://www.beian.miit.gov.cn">
          {{ ICP }}
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiQqchat } from '@mdi/js'
import { getOS } from '~/utils'
import { CustomerServiceQQ, TECHNICAL_SUPPORT_EMAIL, ICP } from '~/config'

@Component({
  name: 'app-footer'
})
export default class AppFooter extends Vue {
  links = [
    {
      name: '友情链接',
      url: '#'
    },
    {
      name: '友情链接',
      url: '#'
    },
    {
      name: '友情链接',
      url: '#'
    }
  ]

  qqIcon = mdiQqchat
  TECHNICAL_SUPPORT_EMAIL = TECHNICAL_SUPPORT_EMAIL
  ICP = ICP

  get envOS () {
    const env = getOS()
    if (env.iPhone || env.android || env.iPad) {
      return 'mobile'
    }
    return 'pc'
  }

  goQqChat () {
    const url = this.envOS === 'mobile'
      ? `mqqwpa://im/chat?chat_type=wpa&uin=${CustomerServiceQQ}&version=1&src_type=web&web_src=http:://wpa.b.qq.com`
      : `http://wpa.qq.com/msgrd?v=3&uin=${CustomerServiceQQ}&site=在线客服&menu=yes`
    window.open(url)
  }
}
</script>

<style lang="stylus" scoped>
+block(footer)
  text-align center
  color #fff
</style>
