import { BannerValue } from 'src/appTypes'
import { Colors } from 'src/templates/styles'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { stateById } from 'src/utils/statesAndTerritories'

export const defaultBannerValue = (): BannerValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const state = stateById(stateAbbreviation)
  const lowercasedAbbreviation = stateAbbreviation.toLowerCase()

  return {
    backgroundColor: Colors.black,
    primaryText: `${state.name} Department of Labor and Workforce Development`,
    primaryLink: `https://www.${lowercasedAbbreviation}.gov/labor/`,
    secondaryLink: `https://myunemployment.${lowercasedAbbreviation}.gov/`,
  }
}
