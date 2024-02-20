import Config from '../../gatsby-config'
import { isAllStatesMode } from './appMode'

const getEnv = (): 'development' | 'production' => {
  return Config.siteMetadata?.env as any
}

const DEVELOPMENT_SITE_URL = 'http://localhost:8000'

const NJ_SITE_URL = 'https://main.dor49a0hhc0bh.amplifyapp.com'

const ALL_STATES_SITE_URL = 'https://email-builder-beta.netlify.app'

export const siteUrl = (): string => {
  if (getEnv() === 'development') {
    return DEVELOPMENT_SITE_URL
  }

  if (isAllStatesMode()) {
    return ALL_STATES_SITE_URL
  }

  return NJ_SITE_URL
}

export const buildSiteUrl = (path: string): string => {
  return siteUrl() + path
}
