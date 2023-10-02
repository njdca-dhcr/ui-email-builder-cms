import { EmailTemplate } from 'src/appTypes'

export const labelForSubComponent = (
  subComponentKind: EmailTemplate.SubComponentKind<EmailTemplate.ComponentKind>,
): string => {
  switch (subComponentKind) {
    case 'AdditionalContent':
      return 'Additional Content'
    case 'ProgramName':
      return 'Program Name'
    default:
      return subComponentKind
  }
}
