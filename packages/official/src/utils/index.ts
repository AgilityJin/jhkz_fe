import { OSReg } from './regular'

export const getStorage = (key: string, isNeedParse = true) => {
  const str = localStorage.getItem(key)
  if (!str) { return null }
  return isNeedParse ? JSON.parse(str) : str
}

export const setStorage = (key: string, data: any, isNeedStringify = true) => {
  const d = isNeedStringify ? JSON.stringify(data) : data
  localStorage.setItem(key, d)
}

export const clearStorage = (key: string) => localStorage.removeItem(key)

// handle table page
// export const totalPage = (totalCount: number, pagesize: number) => {
//   if (totalCount % pagesize === 0) {
//     return parseInt(String(totalCount / pagesize), 10)
//   } else {
//     return parseInt(String(totalCount / pagesize + 1), 10)
//   }
// }

/**
 * @name 获取当前系统环境
 */
export function getOS () {
  if (navigator && navigator.userAgent) {
    const os = navigator.userAgent.match(OSReg)
    if (os) {
      switch (os[1].toLowerCase()) {
        case 'iphone':
        case 'ipod':
          return { iPhone: true, iOS: true }
        case 'ipad':
          return { iPad: true, iOS: true }
        case 'android':
          return { android: true }
        default:
          return { pc: true }
      }
    } else { return { pc: true } }
  }
  return {}
}

/**
 * @name 打开目标qq会话界面
 * @param qq 待开启的会话目标qq号
 */
export function openQqChat (qq: string | number) {
  const env = getOS()
  const url = env.pc
    ? `http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=在线客服&menu=yes`
    : `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=http:://wpa.b.qq.com`
  window.open(url)
}

// TODO: test
export function shareQq () {
  const params: any = {
    url: 'https://baidu.com',
    desc: '测试官网消息发送',
    title: '测试',
    summary: '摘要',
    // pics: undefined, // 分享图片(可选)
    // flash: ‘‘, /*视频地址(可选)*/
    site: 'https://jianghukezhan.vip/admin', /* 分享来源(可选) 如：QQ分享 */
    style: '203',
    width: 16,
    height: 16
  }
  const urlParams = []
  for (const key in params) {
    const item = params[key]
    urlParams.push(`${key}=${item}`)
  }
  window.open(`http://connect.qq.com/widget/shareqq/index.html?${urlParams.join('&')}`, 'blank')
}
