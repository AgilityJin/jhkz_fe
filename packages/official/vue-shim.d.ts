declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '~/*'
declare module '@/*'

declare module 'vue/types/vue' {
  // 扩展vue类型
  interface Vue {}
  interface VueConstructor {
    options: {
      name: string
    }
  }
}

// declare module '@nuxt/types' {
//   // 扩展 context 类型
//   interface NuxtAppOptions {}
// }

declare module 'vuex/types/index' {
  // 扩展 store 类型
  interface Store<S> {}
}
