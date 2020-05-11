import { GetterTree, MutationTree, ActionTree } from 'vuex'

export const state = () => ({
  loginPanel: false,
  loginSmsPanel: false
})
type CurrentState = ReturnType<typeof state>

export const getters: GetterTree<CurrentState, CurrentState> = {
  loginPanel: state => state.loginPanel,
  loginSmsPanel: state => state.loginSmsPanel
}

export const mutations: MutationTree<CurrentState> = {
  SET_LOGIN_PANEL: (state, loginPanel: boolean) => {
    state.loginPanel = loginPanel
  },
  SET_LOGIN_SMS_PANEL: (state, loginSmsPanel: boolean) => {
    state.loginSmsPanel = loginSmsPanel
  }
}

export const actions: ActionTree<CurrentState, CurrentState> = {}
