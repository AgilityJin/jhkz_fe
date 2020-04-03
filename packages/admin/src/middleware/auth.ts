import { Middleware } from '@nuxt/types'
import { getStorage } from '~/utils'
import { CONTEXT_KEY } from '~/config'

const validateExpires = (expiresIn: number) => Date.now() < expiresIn

const AuthMiddleware: Middleware = ({ store, redirect }) => {
  if (process.client) {
    let userInfo = store.state.context.userInfo
    // 用户上下文存在性校验
    if (!userInfo) {
      const cacheUserInfo = getStorage(CONTEXT_KEY)
      if (cacheUserInfo) {
        store.commit('context/UPDATE_USER_INFO', cacheUserInfo)
        userInfo = store.state.context.userInfo
      } else {
        return redirect('/login')
      }
    }

    // 用户上下文是否在有效期内校验
    const validate = validateExpires(userInfo.expiresIn)
    if (!validate) {
      store.dispatch('context/clearUserInfo')
      return redirect('/login')
    }
  }
}

export default AuthMiddleware
