import { ProgramNameNJPreset, ProgramNameValue } from 'src/appTypes'
import { isAppMode } from 'src/utils/appMode'

export const defaultProgramNameValue = (): ProgramNameValue => {
  if (isAppMode('NJ')) {
    return {
      preset: ProgramNameNJPreset.DependencyBenefits,
      name: 'Dependency Benefits',
      backgroundColor: '#E1E291',
    }
  } else {
    return {
      preset: ProgramNameNJPreset.DependencyBenefits,
      name: 'Program Name',
      backgroundColor: '#CCBDDF',
    }
  }
}
