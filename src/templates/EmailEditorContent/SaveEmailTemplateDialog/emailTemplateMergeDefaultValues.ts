import { EmailParts, EmailTemplate, EmailTranslation, Language } from 'src/appTypes'

export const mergeSubComponentDefaultValue = (
  subComponent: EmailParts.Unique.SubComponent,
  data: Record<string, any>,
): EmailParts.Unique.SubComponent => {
  const defaultValue = data[subComponent.id] ?? subComponent.defaultValue

  return defaultValue ? { ...subComponent, defaultValue } : subComponent
}

export const mergeComponentDefaultValue = (
  component: EmailParts.Unique.Component,
  data: Record<string, any>,
): EmailParts.Unique.Component => {
  const defaultValue = data[component.id] ?? component.defaultValue
  const subComponents = (component.subComponents ?? []).map((subComponent) =>
    mergeSubComponentDefaultValue(subComponent, data),
  )

  return defaultValue
    ? { ...component, defaultValue, subComponents }
    : { ...component, subComponents }
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

interface MergeEmailTemplateValuesOptions {
  data: Record<string, any>
  description: string
  emailTemplate: EmailTemplate.Unique.Config
  language: Language
  name: string
  previewText: string
  tagNames: string[]
}

export const mergeEmailTemplateValues = ({
  data,
  description,
  emailTemplate,
  language,
  name,
  previewText,
  tagNames,
}: MergeEmailTemplateValuesOptions): EmailTemplate.Unique.Config => {
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
