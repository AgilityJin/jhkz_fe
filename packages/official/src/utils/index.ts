import { OSReg } from './regular'

/* storage start */
// export const getStorage = (key: string, isNeedParse = true) => {
//   const str = localStorage.getItem(key)
//   if (!str) { return null }
//   return isNeedParse ? JSON.parse(str) : str
// }

// export const setStorage = (key: string, data: any, isNeedStringify = true) => {
//   const d = isNeedStringify ? JSON.stringify(data) : data
//   localStorage.setItem(key, d)
// }

// export const clearStorage = (key: string) => localStorage.removeItem(key)
/* storage end */

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
