import { DepartmentSealValue } from 'src/appTypes'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { departmentSealsForState } from 'src/utils/departmentSeals'

export const defaultDepartmentSealValue = (): DepartmentSealValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const [departmentSeal] = departmentSealsForState(stateAbbreviation)

  return { seal: departmentSeal?.imageName ?? 'US-DOL.png' }
}
