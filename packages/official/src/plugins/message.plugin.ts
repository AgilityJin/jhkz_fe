import { Plugin } from '@nuxt/types'
import { Notification, Message } from 'element-ui'

class MsgRoot {
  success = Notification.success
  info = Notification.info
  error = Notification.error
  warning = Notification.warning
  globalSuccess = Message.success
  globalError = Message.error
  globalWarning = Message.warning
  globalInfo = Message.info
}

export const Msg = new MsgRoot()

const installMsg:Plugin = (_, inject) => {
  inject('msg', Msg)
}

export default installMsg
