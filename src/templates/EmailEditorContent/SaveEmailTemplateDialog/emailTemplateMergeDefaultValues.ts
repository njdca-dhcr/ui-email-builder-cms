import { EmailParts, EmailTemplate, EmailTranslation, Language } from 'src/appTypes'

export const emailTemplateMergeDefaultValues = (
  emailTemplate: EmailTemplate.Unique.Config,
  emailPartsContentData: Record<string, any>,
  language: Language,
): EmailTemplate.Unique.Config => {
  return {
    ...emailTemplate,
    translations: emailTemplate.translations?.map((translation) =>
      translation.language === language
        ? {
            ...translation,
            components: translation.components?.map((component) => ({
              ...component,
              defaultValue: emailPartsContentData[component.id] ?? component.defaultValue,
              subComponents: component.subComponents?.map((subComponent) => ({
                ...subComponent,
                defaultValue: emailPartsContentData[subComponent.id] ?? subComponent.defaultValue,
              })),
            })),
          }
        : translation,
    ),
  }
}

export const mergeSubComponentDefaultValue = (
  subComponent: EmailParts.Unique.SubComponent,
  data: Record<string, any>,
): EmailParts.Unique.SubComponent => {
  return { ...subComponent, defaultValue: data[subComponent.id] ?? subComponent.defaultValue }
}

export const mergeComponentDefaultValue = (
  component: EmailParts.Unique.Component,
  data: Record<string, any>,
): EmailParts.Unique.Component => {
  return {
    ...component,
    defaultValue: data[component.id] ?? component.defaultValue,
    subComponents: (component.subComponents ?? []).map((subComponent) =>
      mergeSubComponentDefaultValue(subComponent, data),
    ),
  }
}

export const mergeTranslationValues = ({
  translation,
  previewText,
  data,
}: {
  translation: EmailTranslation.Unique
  previewText: string
  data: Record<string, any>
}): EmailTranslation.Unique => {
  return {
    ...translation,
    previewText,
    components: translation.components.map((component) =>
      mergeComponentDefaultValue(component, data),
    ),
  }
}

export const mergeEmailTemplateValues = ({
  data,
  description,
  emailTemplate,
  language,
  name,
  previewText,
  tagNames,
}: {
  data: Record<string, any>
  description: string
  emailTemplate: EmailTemplate.Unique.Config
  language: Language
  name: string
  previewText: string
  tagNames: string[]
}): EmailTemplate.Unique.Config => {
  const translations = emailTemplate.translations ?? []
  return {
    ...emailTemplate,
    name,
    description,
    tagNames,
    translations: translations.map((translation) =>
      translation.language === language
        ? mergeTranslationValues({ translation, data, previewText })
        : translation,
    ),
  }
}
