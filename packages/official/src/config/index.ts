import { version } from '~/../package.json'
export * from './constants'

export const IS_PROD = process.env.ENV === 'prod'

export const envConfig = {
  adminAddress: process.env.ADMIN_ADDRESS
}

export const APP_ENV = {
  version,
  platform: 'official',
  apiHost: '/api/official/v1'
}

export const CONTEXT_KEY = 'CUSTOMER_CONTEXT'
