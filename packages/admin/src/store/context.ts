import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CONTEXT_KEY } from '~/config'
import { setStorage, clearStorage } from '~/utils'

const stateObj = {
  userInfo: null
}
export const state = () => (stateObj)
type RootState = typeof stateObj

export const getters: GetterTree<RootState, RootState> = {
  userInfo: state => state.userInfo
}

export const mutations: MutationTree<RootState> = {
  UPDATE_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    setStorage(CONTEXT_KEY, userInfo)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  clearUserInfo ({ commit }) {
    commit('UPDATE_USER_INFO', null)
    clearStorage(CONTEXT_KEY)
  }
}
