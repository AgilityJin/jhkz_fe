declare module 'vue/types/vue' {
  // 扩展vue类型
  interface Vue {}
  interface VueConstructor {
    options: {
      name: string
    }
  }
}
