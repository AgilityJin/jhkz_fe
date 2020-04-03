import { Route, NavigationGuard } from 'vue-router'
import { CONTEXT_KEY } from '~/config'
import { getStorage } from '~/utils'

export const routeBeforeInterceptors: NavigationGuard = (to, _, next) => {
  const userContext = getStorage(CONTEXT_KEY)
  if (!userContext && to.name !== 'login') {
    next({
      name: 'login'
    })
  }
  next()
}

export const routeAfterInterceptors: (to: Route, from: Route) => any = () => {}
