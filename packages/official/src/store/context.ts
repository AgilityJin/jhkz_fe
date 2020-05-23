import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { getStorage, setStorage } from '~/utils'
import { CONTEXT_KEY } from '~/config'

export const state = () => ({
  loginPanel: false,
  loginSmsPanel: false,
  registerPanel: false,
  retrievePanel: false,
  joinPanel: false,
  userInfo: null
})
type CurrentState = ReturnType<typeof state>

export const getters: GetterTree<CurrentState, CurrentState> = {
  loginPanel: state => state.loginPanel,
  loginSmsPanel: state => state.loginSmsPanel,
  registerPanel: state => state.registerPanel,
  retrievePanel: state => state.retrievePanel,
  joinPanel: state => state.joinPanel,
  userInfo: (state) => {
    if (state.userInfo) { return state.userInfo }
    const context = getStorage(CONTEXT_KEY)
    if (context) { return context }
    return null
  }
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
  },
  SET_JOIN_PANEL: (state, joinPanel: boolean) => {
    state.joinPanel = joinPanel
  },
  SET_USER_INFO: (state, userInfo: any) => {
    state.userInfo = userInfo
    setStorage(CONTEXT_KEY, userInfo)
  }
}

export const actions: ActionTree<CurrentState, CurrentState> = {}
