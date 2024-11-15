import { EmailTemplate, Language } from 'src/appTypes'

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
