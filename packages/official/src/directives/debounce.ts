import Vue, { VNode } from 'vue'
import debounce from 'lodash/debounce'
/**
 * @name 屏蔽重复点击调用方法
 * @description 默认间隔500ms,最大累计不超过1500ms,点击即可触发回调方法
 * 使用实例:
 * 1. 无传值调用: v-debounce="function"
 * 2. 传值调用: v-debounce="[function, param1, param2, ...arguments]"所有参数都会传递给function
 * 3. 使用时替代click指令, dom prop上绑定即可.
 */
export const funcDebounce = Vue.directive('debounce', {
  bind: (el: HTMLElement, { value, arg }, _: VNode) => {
    const delayTime = Number(arg || 500) // 设置调用间隔, 默认500ms
    let callback: () => void // 用来存放回调方法
    if (typeof value === 'function') {
      callback = value // 无传值时直接绑定回调方法
    } else if (Array.isArray(value) && value.length > 0) {
      // 当value为数组且长度大于证明用户采取了传值形式使用指令
      // 首位function合法性校验
      if (typeof value[0] === 'function') {
        const func = value[0]
        const agrs = value.slice(1)
        callback = () => {
          func(...agrs)
        }
      } else {
        throw new TypeError(
          '[DebounceError]: 传值调用时, 数组首位应当是所需回调的方法.'
        )
      }
    } else {
      // 不合法的使用抛出异常
      throw new TypeError(
        '[DebounceError]: 请设置指令需调用的方法,如需传值请使用[func,param1, params2, ...arguments]形式.'
      )
    }
    el.onclick = debounce(
      () => {
        callback()
      },
      delayTime,
      {
        leading: true,
        trailing: false,
        maxWait: 1500
      }
    )
  }
})
