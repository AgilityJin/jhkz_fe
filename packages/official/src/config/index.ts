import { version } from '~/../package.json'

export const IS_PROD = process.env.ENV === 'prod'

export const CustomerServiceQQ = '194703103' // 客服qq

export const ICP = '鲁ICP备20007448号' // 备案号

export const ICP_URL = 'http://www.beian.miit.gov.cn'

export const TECHNICAL_SUPPORT_EMAIL = 'Agility_Jin@outlook.com' // 技术支持邮箱

export const envConfig = {
  adminAddress: process.env.ADMIN_ADDRESS
}

export const APP_ENV = {
  version,
  platform: 'official',
  apiHost: '/api/official/v1'
}

export const CONTEXT_KEY = 'CUSTOMER_CONTEXT'
