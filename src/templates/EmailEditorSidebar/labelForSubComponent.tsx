import { EmailTemplate } from 'src/appTypes'

export const labelForSubComponent = (
  subComponentKind: EmailTemplate.SubComponentKind<EmailTemplate.ComponentKind>,
): string => {
  switch (subComponentKind) {
    case 'AdditionalContent':
      return 'Additional Content'
    case 'SupplementalContent':
      return 'Supplemental Content'
    case 'ProgramName':
      return 'Program Name'
    case 'RulesRightsRegulations':
      return 'Rules, Rights, and Regulations'
    default:
      return subComponentKind
  }
}
