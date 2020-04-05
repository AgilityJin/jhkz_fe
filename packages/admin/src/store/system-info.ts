import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  auths: []
})

type SystemState = ReturnType<typeof state>

export const getters: GetterTree<SystemState, SystemState> = {
  auths: state => state.auths
}

export const mutations: MutationTree<SystemState> = {
  UPDATE_AUTHS: (state, auths) => (state.auths = auths)
}

export const actions: ActionTree<SystemState, SystemState> = {
  async getAuths ({ commit, getters }, params = {}) {
    const { force } = params
    if (force || !getters.auths || !getters.auths.length) {
      const result = await this.$api.getAuths()
      if (result && result.length) {
        commit('UPDATE_AUTHS', result)
      }
    }
    return getters.auths
  }
}
