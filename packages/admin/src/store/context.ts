import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CONTEXT_KEY } from '~/config'

const stateObj = {
  userInfo: null,
  isDrawerShow: true
}
export const state = () => (stateObj)
type RootState = typeof stateObj

export const getters: GetterTree<RootState, RootState> = {
  userInfo: (state) => {
    if (state.userInfo) { return state.userInfo }
    const userInfo = localStorage.getItem(CONTEXT_KEY)
    return userInfo ? JSON.parse(userInfo) : {}
  },
  isDrawerShow: state => state.isDrawerShow
}

export const mutations: MutationTree<RootState> = {
  UPDATE_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(userInfo))
  },
  UPDATE_DRAWER_SHOW: (state, isShow: boolean) => {
    console.log('object', isShow)
    state.isDrawerShow = isShow
  }
}

export const actions: ActionTree<RootState, RootState> = {
  clearUserInfo ({ commit }) {
    commit('UPDATE_USER_INFO', null)
    localStorage.removeItem(CONTEXT_KEY)
  }
}
