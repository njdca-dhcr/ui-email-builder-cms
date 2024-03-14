import Config from '../../gatsby-config'
import { appModeAsStateAbbreviation, isAllStatesMode } from './appMode'
import { StateAbbreviation, stateById } from './statesAndTerritories'

const getEnv = (): 'development' | 'production' => {
  return Config.siteMetadata?.env as any
}

const DEVELOPMENT_SITE_URL = 'http://localhost:8000'

const NJ_SITE_URL = 'https://main.dor49a0hhc0bh.amplifyapp.com'

const ICON_URL = 'https://beta.nj.gov/files/dol-uimod-email/icons'

const netlifySiteUrl = (site: string): string => {
  return `https://email-builder-beta-${site}.netlify.app`
}

export const siteUrl = (): string => {
  if (getEnv() === 'development') {
    return DEVELOPMENT_SITE_URL
  }

  const stateAbbreviation = appModeAsStateAbbreviation()

  if (stateAbbreviation === 'NJ') {
    return NJ_SITE_URL
  } else if (stateAbbreviation) {
    const state = stateById(stateAbbreviation)
    return netlifySiteUrl(state.name.toLowerCase())
  } else {
    return netlifySiteUrl('all-states-secret')
  }
}

export const buildSiteUrl = (path: string): string => {
  return siteUrl() + path
}

export const buildIconUrl = (icon: string): string => {
  return ICON_URL + icon
}
