import { GetterTree, MutationTree, ActionTree } from 'vuex'

export const state = () => ({})
type CurrentState = ReturnType<typeof state>

export const getters: GetterTree<CurrentState, CurrentState> = {}

export const mutations: MutationTree<CurrentState> = {}

export const actions: ActionTree<CurrentState, CurrentState> = {}
