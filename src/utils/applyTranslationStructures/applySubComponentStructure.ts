import { EmailParts } from 'src/appTypes'
import {
  applyIntroStructure,
  applyRulesRightsRegulationsStructure,
  applyStatusStructure,
  applySupplementalContentStructure,
  applyDirectiveStructure,
  applyLoginDetailsStructure,
  applyInformationalBoxStructure,
  applyAdditionalContentStructure,
  applyDateRangeStructure,
  applyTitleStructure,
  applyProgramNameStructure,
  applyDirectiveButtonStructure,
} from './applySubComponentStructures'

export const applySubComponentStructure = (
  subcomponentA: EmailParts.Unique.SubComponent,
  subcomponentB: EmailParts.Unique.SubComponent,
): EmailParts.Unique.SubComponent => {
  switch (subcomponentA.kind) {
    case 'Intro':
      return applyIntroStructure(
        subcomponentA as EmailParts.Intro,
        subcomponentB as EmailParts.Intro,
      )
    case 'RulesRightsRegulations':
      return applyRulesRightsRegulationsStructure(
        subcomponentA as EmailParts.RulesRightsRegulations,
        subcomponentB as EmailParts.RulesRightsRegulations,
      )

    case 'Status':
      return applyStatusStructure(
        subcomponentA as EmailParts.Status,
        subcomponentB as EmailParts.Status,
      )
    case 'SupplementalContent':
      return applySupplementalContentStructure(
        subcomponentA as EmailParts.SupplementalContent,
        subcomponentB as EmailParts.SupplementalContent,
      )
    case 'Directive':
      return applyDirectiveStructure(
        subcomponentA as EmailParts.Directive,
        subcomponentB as EmailParts.Directive,
      )
    case 'LoginDetails':
      return applyLoginDetailsStructure(
        subcomponentA as EmailParts.LoginDetails,
        subcomponentB as EmailParts.LoginDetails,
      )
    case 'InformationalBox':
      return applyInformationalBoxStructure(
        subcomponentA as EmailParts.InformationalBox,
        subcomponentB as EmailParts.InformationalBox,
      )
    case 'AdditionalContent':
      return applyAdditionalContentStructure(
        subcomponentA as EmailParts.AdditionalContent,
        subcomponentB as EmailParts.AdditionalContent,
      )
    case 'DateRange':
      return applyDateRangeStructure(
        subcomponentA as EmailParts.DateRange,
        subcomponentB as EmailParts.DateRange,
      )
    case 'Title':
      return applyTitleStructure(
        subcomponentA as EmailParts.Title,
        subcomponentB as EmailParts.Title,
      )
    case 'ProgramName':
      return applyProgramNameStructure(
        subcomponentA as EmailParts.ProgramName,
        subcomponentB as EmailParts.ProgramName,
      )
    case 'DirectiveButton':
      return applyDirectiveButtonStructure(
        subcomponentA as EmailParts.DirectiveButton,
        subcomponentB as EmailParts.DirectiveButton,
      )
    case 'DepartmentSeal':
      return subcomponentB
    default:
      throw new Error(`SubComponent kind not recognized: ${subcomponentA.kind}`)
  }
}
