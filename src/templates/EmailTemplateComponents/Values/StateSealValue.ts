import { StateSealValue } from 'src/appTypes'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { stateById } from 'src/utils/statesAndTerritories'

export const defaultStateSealValue = (): StateSealValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const state = stateById(stateAbbreviation)
  const stateName = state.id === 'US' ? '[Insert State]' : state.name
  return {
    additionalDisclaimer: `The ${stateName} Department of Labor and Workforce Development is an equal opportunity employer and provides equal opportunity programs. Auxiliary aids and services are available upon request to assist individuals with disabilities.`,
    stateAbbreviation: stateAbbreviation ?? 'US',
  }
}
