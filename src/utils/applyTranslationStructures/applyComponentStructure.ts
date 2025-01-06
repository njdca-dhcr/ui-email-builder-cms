import { EmailParts } from 'src/appTypes'
import {
  applyBodyStructure,
  applyFooterStructure,
  applyHeaderStructure,
  applyNameStructure,
  applyTranslationLinksStructure,
} from './applyComponentStructures'

export const applyComponentStructure = (
  componentA: EmailParts.Unique.Component,
  componentB: EmailParts.Unique.Component,
): EmailParts.Unique.Component => {
  switch (componentA.kind) {
    case 'TranslationLinks':
      return applyTranslationLinksStructure(
        componentA as EmailParts.TranslationLinks,
        componentB as EmailParts.TranslationLinks,
      )
    case 'Body':
      return applyBodyStructure(componentA as EmailParts.Body, componentB as EmailParts.Body)
    case 'Footer':
      return applyFooterStructure(componentA as EmailParts.Footer, componentB as EmailParts.Footer)
    case 'Header':
      return applyHeaderStructure(componentA as EmailParts.Header, componentB as EmailParts.Header)
    case 'Name':
      return applyNameStructure(componentA as EmailParts.Name, componentB as EmailParts.Name)
    case 'Banner':
    case 'Disclaimer':
    case 'StateSeal':
      return componentB
    default:
      throw new Error(`Component kind not recognized: ${componentA.kind}`)
  }
}
