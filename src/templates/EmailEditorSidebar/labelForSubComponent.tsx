import { EmailTemplate } from 'src/appTypes'

export const labelForSubComponent = (subComponentKind: EmailTemplate.SubComponentKind): string => {
  switch (subComponentKind) {
    case 'AdditionalContent':
      return 'Additional Content'
    case 'DateRange':
      return 'Date Range'
    case 'DepartmentSeal':
      return 'Department Seal'
    case 'DirectiveButton':
      return 'Directive Button'
    case 'InformationalBox':
      return 'Informational Box'
    case 'LoginDetails':
      return 'Login Support'
    case 'SupplementalContent':
      return 'Supplemental Content'
    case 'ProgramName':
      return 'Program Name'
    case 'RulesRightsRegulations':
      return 'What else should they know?'
    default:
      return subComponentKind
  }
}
