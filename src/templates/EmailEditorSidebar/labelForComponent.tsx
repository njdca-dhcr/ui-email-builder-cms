import { EmailParts } from 'src/appTypes'

export const labelForComponent = (componentKind: EmailParts.Kinds.Component): string => {
  switch (componentKind) {
    case 'StateSeal':
      return 'State Seal'
    default:
      return componentKind
  }
}
