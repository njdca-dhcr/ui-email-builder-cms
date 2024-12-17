import { EmailParts, EmailTemplate, EmailTranslation } from 'src/appTypes'

export const addOrRemoveTranslationLinks = (
  emailTemplate: EmailTemplate.Unique.Config,
): EmailTemplate.Unique.Config => {
  const translations = emailTemplate.translations ?? []

  if (translations.length === 1) {
    return {
      ...emailTemplate,
      translations: translations.map(removeTranslationLinks),
    }
  } else {
    return {
      ...emailTemplate,
      translations: translations.map(addTranslationLinks),
    }
  }
}

const addTranslationLinks = (translation: EmailTranslation.Unique): EmailTranslation.Unique => {
  const existingTranslationLinks = translation.components.find(
    ({ kind }) => kind === 'TranslationLinks',
  )

  if (existingTranslationLinks) {
    return translation
  } else {
    const components = [...translation.components]

    const translationLinks: EmailParts.TranslationLinks = {
      kind: 'TranslationLinks',
      id: 'translation-links',
    }

    const bannerIndex = components.findIndex(({ kind }) => kind === 'Banner') ?? 0

    components.splice(bannerIndex, 0, translationLinks)

    return {
      ...translation,
      components,
    }
  }
}

const removeTranslationLinks = (translation: EmailTranslation.Unique): EmailTranslation.Unique => {
  return {
    ...translation,
    components: translation.components.filter(({ kind }) => kind !== 'TranslationLinks'),
  }
}
