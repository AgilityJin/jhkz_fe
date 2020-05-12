import { GetterTree, MutationTree, ActionTree } from 'vuex'

export const state = () => ({
  loginPanel: false,
  loginSmsPanel: false,
  registerPanel: false,
  retrievePanel: false
})
type CurrentState = ReturnType<typeof state>

export const getters: GetterTree<CurrentState, CurrentState> = {
  loginPanel: state => state.loginPanel,
  loginSmsPanel: state => state.loginSmsPanel,
  registerPanel: state => state.registerPanel,
  retrievePanel: state => state.retrievePanel
}

export const mutations: MutationTree<CurrentState> = {
  SET_LOGIN_PANEL: (state, loginPanel: boolean) => {
    state.loginPanel = loginPanel
  },
  SET_LOGIN_SMS_PANEL: (state, loginSmsPanel: boolean) => {
    state.loginSmsPanel = loginSmsPanel
  },
  SET_REGISTER_PANEL: (state, registerPanel: boolean) => {
    state.registerPanel = registerPanel
  },
  SET_RETRIEVE_PANEL: (state, retrievePanel: boolean) => {
    state.retrievePanel = retrievePanel
  }
}

export const actions: ActionTree<CurrentState, CurrentState> = {}
