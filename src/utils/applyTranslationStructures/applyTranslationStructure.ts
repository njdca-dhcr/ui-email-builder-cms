import { EmailTranslation } from 'src/appTypes'
import { applyComponentStructure } from './applyComponentStructure'

export const applyTranslationStructure = (
  translationA: EmailTranslation.Unique,
  translationB: EmailTranslation.Unique,
): EmailTranslation.Unique => {
  const componentsA = translationA.components
  const componentsB = translationB.components
  return {
    ...translationB,
    components: componentsB.map((componentB, i) =>
      applyComponentStructure(componentsA[i], componentB),
    ),
  }
}
