export const refValidate = (refs: any, refName: string): boolean => {
  const ref: any = refs[refName]
  if (ref) {
    return ref.validate()
  }
  throw new Error(`Ref ${refName} is not defined`)
}

export const required = (errorMsg = 'value is required') => (value: any) => !!value || errorMsg
