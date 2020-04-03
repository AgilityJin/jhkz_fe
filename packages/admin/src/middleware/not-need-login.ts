import { Middleware } from '@nuxt/types'
import { getStorage } from '~/utils'
import { CONTEXT_KEY } from '~/config'

const validateExpires = (expiresIn: number) => Date.now() < expiresIn

const NotNeedLogin: Middleware = ({ store, redirect }) => {
  if (process.client) {
    let userInfo = store.state.context.userInfo
    if (!userInfo) {
      const cacheUserInfo = getStorage(CONTEXT_KEY)
      if (cacheUserInfo) {
        store.commit('context/UPDATE_USER_INFO', cacheUserInfo)
        userInfo = store.state.context.userInfo
      } else {
        return
      }
    }

    const validate = validateExpires(userInfo.expiresIn)

    if (validate) {
      return redirect('/home')
    } else {
      store.dispatch('context/clearUserInfo')
    }
  }
}

export default NotNeedLogin
