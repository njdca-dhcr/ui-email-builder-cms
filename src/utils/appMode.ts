import Config from '../../gatsby-config'
import { StateAbbreviation } from './statesAndTerritories'

export type AppMode = StateAbbreviation | 'ALL'

export const appMode = (): AppMode => {
  return (Config.siteMetadata?.appMode as any) ?? 'NJ'
}

export const isAppMode = (mode: AppMode): boolean => {
  return appMode() === mode
}

export const isAllStatesMode = (): boolean => {
  return isAppMode('ALL')
}

export const isStateMode = (): boolean => {
  return !isAllStatesMode()
}

export const appModeAsStateAbbreviation = (): null | StateAbbreviation => {
  const mode = appMode()
  if (mode === 'ALL') {
    return null
  } else {
    return mode
  }
}

const UNRESTRICTED_MODES: AppMode[] = ['ALL', 'NJ']

export const isRestricted = (): boolean => {
  return !UNRESTRICTED_MODES.includes(appMode())
}
