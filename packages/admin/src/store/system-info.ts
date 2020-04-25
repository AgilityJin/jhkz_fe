import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  auths: [],
  gameCategories: []
})

type SystemState = ReturnType<typeof state>

export const getters: GetterTree<SystemState, SystemState> = {
  auths: state => state.auths,
  gameCategories: state => state.gameCategories
}

export const mutations: MutationTree<SystemState> = {
  UPDATE_AUTHS: (state, auths) => (state.auths = auths),
  UPDATE_GAME_CATEGORIES: (state, gameCategories) => (state.gameCategories = gameCategories)
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
  },

  async getGameCategories ({ commit, getters }, params = {}) {
    const { force } = params
    if (force || !getters.gameCategories || !getters.gameCategories.length) {
      const result = await this.$api.getSystemInfo({
        type: 'game-categories'
      })
      if (result && result.length) {
        commit('UPDATE_GAME_CATEGORIES', result)
      }
    }
    return getters.gameCategories
  }
}
