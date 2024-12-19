import isEqual from 'lodash.isequal'
import { EmailParts, EmailTemplate, EmailTranslation } from 'src/appTypes'

export const areEmailSubComponentsEqual = (
  subComponentA: EmailParts.Unique.SubComponent,
  subComponentB: EmailParts.Unique.SubComponent,
): boolean => {
  return isEqual(subComponentA, subComponentB)
}

export const areEmailComponentsEqual = (
  componentA: EmailParts.Unique.Component,
  componentB: EmailParts.Unique.Component,
): boolean => {
  const { subComponents: subComponentsA, ...restA } = componentA
  const { subComponents: subComponentsB, ...restB } = componentB

  return isEqual(restA, restB) && isEqual(subComponentsA ?? [], subComponentsB ?? [])
}

export const areEmailTranslationsEqual = (
  translationA: EmailTranslation.Unique,
  translationB: EmailTranslation.Unique,
): boolean => {
  const { components: componentsA, ...restA } = translationA
  const { components: componentsB, ...restB } = translationB

  return (
    isEqual(restA, restB) &&
    componentsA.every((component, i) => areEmailComponentsEqual(component, componentsB[i]))
  )
}

export const areEmailTemplatesEqual = (
  emailTemplateA: EmailTemplate.Unique.Config,
  emailTemplateB: EmailTemplate.Unique.Config,
): boolean => {
  const { translations: translationsA, ...restA } = emailTemplateA
  const { translations: translationsB, ...restB } = emailTemplateB

  return (
    isEqual(restA, restB) &&
    (translationsA ?? []).every((translation, i) =>
      areEmailTranslationsEqual(translation, (translationsB ?? [])[i]),
    )
  )
}
