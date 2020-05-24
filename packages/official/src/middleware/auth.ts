import { Middleware } from '@nuxt/types'
import { CONTEXT_KEY } from '~/config'
import { getStorage, clearStorage } from '~/utils'
import { Msg } from '~/plugins/message.plugin'

const validateExpires = (expiresIn: number) => Date.now() < expiresIn

const AuthMiddleware: Middleware = ({ store, redirect }) => {
  if (!process.client) { return }
  let userInfo = store.state.context.userInfo
  if (!userInfo) {
    const cacheUserInfo = getStorage(CONTEXT_KEY)
    if (cacheUserInfo) {
      store.commit('context/SET_USER_INFO', cacheUserInfo)
      userInfo = store.state.context.userInfo
    } else {
      Msg.globalError('请先登录')
      store.commit('context/SET_LOGIN_PANEL', true)
      return redirect('/')
    }
  }

  const validate = validateExpires(userInfo.expiresIn)
  if (!validate) {
    store.commit('context/SET_USER_INFO', null)
    clearStorage(CONTEXT_KEY)
    Msg.globalError('用户登录信息已过期')
    store.commit('context/SET_LOGIN_PANEL', true)
    return redirect('/')
  }
}

export default AuthMiddleware
