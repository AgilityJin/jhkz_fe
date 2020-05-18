import { Plugin } from '@nuxt/types'
import { AxiosError } from 'axios'
import { Request } from '@helper-gdp/utils'
import { Msg } from './message.plugin'
import { APP_ENV, CONTEXT_KEY } from '~/config'
import * as Svc from '~/service'
import { getStorage } from '~/utils'

export const Api = new Request({
  config: {
    baseURL: APP_ENV.apiHost,
    headers: {
      platform: APP_ENV.platform
    }
  },
  requestList: Svc,
  requestInterceptor: (config) => {
    const userInfo = getStorage(CONTEXT_KEY)
    config.headers.merchantId = userInfo && userInfo.merchantId
    if (userInfo && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `bearer ${userInfo.token}`
    }
    return config
  },
  // 业务异常
  responseInterceptor: (resp) => {
    if (resp.data && resp.data.statusCode === 200) {
      return resp.data.data
    }
    const errMsg = (resp.data && resp.data.message) || '操作失败'
    Msg.warning(errMsg)
    throw new Error(errMsg)
  },
  token: {
    getToken: () => {
      const userInfo = getStorage(CONTEXT_KEY)
      if (userInfo && userInfo.token) {
        return `bearer ${userInfo.token}`
      }
      return ''
    }
  },
  // 请求异常
  responseErrorInterceptor: (err) => {
    if (err.response && err.response.status) {
      handleError(err, err.response.status)
    } else {
      Msg.error(err.message)
    }
    return err.stack || err.name
  }
})

const installApi:Plugin = (_, inject) => {
  inject('api', Api)
}

export default installApi

function handleError (_: AxiosError, status: number) {
  switch (status) {
    case 301:
    case 302:
      Msg.error('请求被转移')
      break
    case 400:
      Msg.error('请求异常')
      break
    case 401:
      Msg.error('用户身份认证失败')
      break
    case 403:
      Msg.error('请求资源不可用')
      break
    case 404:
      Msg.error('访问的页面或接口地址未找到')
      break
    case 405:
      Msg.error('当前请求方法不被允许')
      break
    case 413:
      Msg.error('请求被上传的资源体积过大移')
      break
    case 500:
      Msg.error('服务器内部错误，无法完成请求')
      break
    case 501:
      Msg.error('服务器不支持请求的功能，无法完成请求')
      break
    default:
      Msg.error('发生未知错误')
      break
  }
}
