import { EmailTemplate } from 'src/appTypes'

export const labelForComponent = (componentKind: EmailTemplate.ComponentKind): string => {
  switch (componentKind) {
    case 'StateSeal':
      return 'State Seal'
    default:
      return componentKind
  }
}
