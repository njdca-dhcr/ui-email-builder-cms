import { EmailTemplate } from 'src/appTypes'
import { ShouldShowEmailPartContextData } from 'src/templates/ShouldShowEmailPart'

export const shouldShowEmailPartsFromEmailTemplate = (
  config: EmailTemplate.Unique.Config,
): ShouldShowEmailPartContextData => {
  let data: ShouldShowEmailPartContextData = {}

  ;(config.components ?? []).forEach((component) => {
    data = { ...data, [component.id]: component.required || component.visibleByDefault }
    ;(component.subComponents ?? []).forEach((subComponent) => {
      data = { ...data, [subComponent.id]: subComponent.required || subComponent.visibleByDefault }
    })
  })

  return data
}
