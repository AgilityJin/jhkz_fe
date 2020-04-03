import { IApiContextType } from '@helper-gdp/utils'
import { Api } from '~/plugins/api.plugin'
import { Msg } from '~/plugins/message.plugin'

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module '~/*'
declare module '@/*'

declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof Api & IApiContextType,
    $msg: typeof Msg,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: typeof Api & IApiContextType,
    $msg: typeof Msg,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: typeof Api & IApiContextType,
    $msg: typeof Msg,
  }
}
