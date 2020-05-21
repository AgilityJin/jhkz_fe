import { IApiContextType } from '@helper-gdp/utils'
import { Api } from '~/plugins/api.plugin'
import { Msg } from '~/plugins/message.plugin'

declare module 'vue/types/vue' {
  // 扩展vue类型
  interface Vue {
    $api: typeof Api & IApiContextType
    $msg: typeof Msg,
    options: {
      name: string
    }
    $vuetify: any
  }
  interface VueConstructor {
    options: {
      name: string
    }
  }
}

declare module '@nuxt/types' {
  // 扩展 context 类型
  interface NuxtAppOptions {
    $api: typeof Api & IApiContextType,
    $msg: typeof Msg,
  }
}

declare module 'vuex/types/index' {
  // 扩展 store 类型
  interface Store<S> {
    $api: typeof Api & IApiContextType,
    $msg: typeof Msg,
  }
}
