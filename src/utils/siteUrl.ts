import kebabCase from 'lodash.kebabcase'
import Config from '../../gatsby-config'
import { appModeAsStateAbbreviation } from './appMode'
import { stateById } from './statesAndTerritories'

const getEnv = (): 'development' | 'production' => {
  return Config.siteMetadata?.env as any
}

const DEVELOPMENT_SITE_URL = 'http://localhost:8000'

const NJ_SITE_URL = 'https://beta.nj.gov/files/dol-uimod-email'

const ALL_STATES_SITE_URL = 'https://email-builder-all-states-secret.netlify.app'

const ICONS_PATH = '/icons'

const STATE_SEALS_PATH = '/state-seals'

const DEPARTMENT_SEALS_PATH = '/department-seals'

const netlifySiteUrl = (site: string): string => {
  return `https://email-builder-beta-${kebabCase(site)}.netlify.app`
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
    return netlifySiteUrl(state.name)
  } else {
    return ALL_STATES_SITE_URL
  }
}

export const buildSiteUrl = (path: string): string => {
  return siteUrl() + path
}

export const buildIconUrl = (icon: string): string => {
  return buildSiteUrl(ICONS_PATH + icon)
}

export const buildStateSealUrl = (stateSeal: string): string => {
  return buildSiteUrl(STATE_SEALS_PATH + stateSeal)
}

export const buildDepartmentSealUrl = (departmentSeal: string): string => {
  return buildSiteUrl(DEPARTMENT_SEALS_PATH + departmentSeal)
}
