import { GetterTree, ActionTree, MutationTree } from 'vuex'

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
  }
}

export const actions: ActionTree<RootState, RootState> = {
  test () {}
}
