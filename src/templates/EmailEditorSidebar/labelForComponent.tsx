import { EmailTemplate } from 'src/appTypes'

export const labelForComponent = (componentKind: EmailTemplate.Kinds.Component): string => {
  switch (componentKind) {
    case 'StateSeal':
      return 'State Seal'
    default:
      return componentKind
  }
}
