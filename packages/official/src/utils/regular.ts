// 用户名校验
export const userNameReg = /^[a-zA-Z0-9][a-zA-Z0-9_]{5,12}$/

// 密码正则
export const passWordReg = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,16}$/

// 版本号校验正则
export const apkVersionReg = /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/

// 身份证
export const cardNameReg = /^[\u4E00-\u9FA5]{1,16}(·[\u4E00-\u9FA5]{1,16})*$/

// 真实姓名校验 ： 2-26位字符，以汉字开头，支持数字结尾，中间不能包含数字
export const realNameReg = /^(([\u4E00-\u9FA5]+)(·[\u4E00-\u9FA5]+)*([0-9]*$))$/

// 手机号码校验
export const phoneNumReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/

// url正则
export const urlReg = /^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/

// 小数点后两位
export const maximumDecimal = /^\d+(\.\d{1,2})?$/

// 匹配所有空格
export const spaceReg = /\s*/g

// 匹配所有英文及数字
export const englishAndNum = /^[a-zA-Z0-9]+$/
