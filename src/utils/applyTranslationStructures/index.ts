import { EmailTemplate } from 'src/appTypes'
import { applyTranslationStructure } from './applyTranslationStructure'

export const applyTranslationStructures = (
  emailTemplate: EmailTemplate.Unique.Config,
): EmailTemplate.Unique.Config => {
  if (!emailTemplate.translations) return emailTemplate

  const [englishTranslation, ...otherTranslations] = emailTemplate.translations

  return {
    ...emailTemplate,
    translations: [
      englishTranslation,
      ...otherTranslations.map((otherTranlsation) =>
        applyTranslationStructure(englishTranslation, otherTranlsation),
      ),
    ],
  }
}
