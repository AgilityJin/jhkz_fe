import format from 'date-fns/format'

// yyyy-MM-dd HH:mm:ss 年月日时分秒
export const formatDate = (val: number | Date, opts: string = 'yyyy-MM-dd HH:mm:ss') => {
  if (!val) { return val }
  if (typeof val !== 'string' && typeof val !== 'number' && !(val instanceof Date)) { return val }
  return format(val, opts)
}
