export const refValidate = (refs: any, refName: string): boolean => {
  const ref: any = refs[refName]
  return ref.validate()
}

export const isRequired = (value: any, errorMsg = 'value is required') => !!value || errorMsg
