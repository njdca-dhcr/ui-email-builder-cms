import { EmailTemplate } from 'src/appTypes'

export const emailTemplateMergeDefaultValues = (
  emailTemplate: EmailTemplate.Unique.Config,
  emailPartsContentData: Record<string, any>,
): EmailTemplate.Unique.Config => {
  return {
    ...emailTemplate,
    components: emailTemplate.components?.map((component) => ({
      ...component,
      defaultValue: emailPartsContentData[component.id] ?? component.defaultValue,
      subComponents: component.subComponents?.map((subComponent) => ({
        ...subComponent,
        defaultValue: emailPartsContentData[subComponent.id] ?? subComponent.defaultValue,
      })),
    })),
  }
}
