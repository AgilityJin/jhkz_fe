import { fill } from 'lodash'

export const maskString = (val: string, opts: any = {}) => {
  if (!val) { return val }
  const maskStr = opts.symbol || '*'
  const startIndex = opts.start || 0
  const endIndex = opts.end

  return fill(val.split(''), maskStr, startIndex, endIndex).join('')
}
