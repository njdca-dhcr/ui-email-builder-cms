import { EmailParts } from 'src/appTypes'
import { applySubComponentStructure } from './applySubComponentStructure'

const applyDefaultValues = <T>(defaultValueA: T, defaultValueB: T, fields: (keyof T)[]): T => {
  const newDefaultValue = { ...defaultValueB }

  fields.forEach((field) => {
    newDefaultValue[field] = defaultValueA[field] ?? defaultValueB[field]
  })

  return newDefaultValue
}

const applyEmailPartValues = <T extends EmailParts.Unique.Part>(
  partA: T,
  partB: T,
  fields: string[],
): T => {
  return {
    ...partB,
    defaultValue: applyDefaultValues(
      partA.defaultValue ?? {},
      partB.defaultValue ?? {},
      fields as any[],
    ),
  }
}

export const applyTranslationLinksStructure = (
  componentA: EmailParts.TranslationLinks,
  componentB: EmailParts.TranslationLinks,
): EmailParts.TranslationLinks => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}

export const applyBodyStructure = (
  componentA: EmailParts.Unique.Component<'Body'>,
  componentB: EmailParts.Unique.Component<'Body'>,
): EmailParts.Unique.Component<'Body'> => {
  const subComponentsA = componentA.subComponents ?? []
  const subComponentsB = componentB.subComponents ?? []

  return {
    ...applyEmailPartValues(componentA, componentB, ['visible']),
    subComponents: subComponentsB.map((subComponentB, i) =>
      applySubComponentStructure(subComponentsA[i], subComponentB),
    ),
  }
}

export const applyFooterStructure = (
  componentA: EmailParts.Unique.Component<'Footer'>,
  componentB: EmailParts.Unique.Component<'Footer'>,
): EmailParts.Unique.Component<'Footer'> => {
  const subComponentsA = componentA.subComponents ?? []
  const subComponentsB = componentB.subComponents ?? []

  return {
    ...applyEmailPartValues(componentA, componentB, ['visible']),
    subComponents: subComponentsB.map((subComponentB, i) =>
      applySubComponentStructure(subComponentsA[i], subComponentB),
    ),
  }
}

export const applyHeaderStructure = (
  componentA: EmailParts.Unique.Component<'Header'>,
  componentB: EmailParts.Unique.Component<'Header'>,
): EmailParts.Unique.Component<'Header'> => {
  const subComponentsA = componentA.subComponents ?? []
  const subComponentsB = componentB.subComponents ?? []

  return {
    ...applyEmailPartValues(componentA, componentB, ['visible']),
    subComponents: subComponentsB.map((subComponentB, i) =>
      applySubComponentStructure(subComponentsA[i], subComponentB),
    ),
  }
}

export const applyNameStructure = (
  componentA: EmailParts.Name,
  componentB: EmailParts.Name,
): EmailParts.Name => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}
