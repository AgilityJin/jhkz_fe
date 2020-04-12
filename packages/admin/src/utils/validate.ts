import { phoneNumReg } from './regular'

export const refReset = (refs: any, refName: string) => {
  const ref: any = refs[refName]
  if (ref) {
    return ref.reset()
  }
  throw new Error(`Ref ${refName} is not defined`)
}

export const refValidate = (refs: any, refName: string): boolean => {
  const ref: any = refs[refName]
  if (ref) {
    return ref.validate()
  }
  throw new Error(`Ref ${refName} is not defined`)
}

export const required = (errorMsg = 'value is required') => (value: any) => !!value || errorMsg

export const maxLength = (limitLength: number, errorMsg = '') => (value: string) => {
  if (!value) { return true }
  return (value.length <= limitLength) || errorMsg
}

export const minLength = (limitLength: number, errorMsg = '') => (value: string) => {
  if (!value) { return true }
  return (value.length >= limitLength) || errorMsg
}

export const length = (length: number, errorMsg = '') => (value: string) => {
  if (!value) { return true }
  return (value.length === length) || errorMsg
}

export const isPhone = (errorMsg = '') => (value: string) => {
  if (!value) { return true }
  return (phoneNumReg.test(value)) || errorMsg
}
