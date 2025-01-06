import { EmailParts } from 'src/appTypes'

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

export const applyIntroStructure = (
  componentA: EmailParts.Intro,
  componentB: EmailParts.Intro,
): EmailParts.Intro => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}

export const applyRulesRightsRegulationsStructure = (
  componentA: EmailParts.RulesRightsRegulations,
  componentB: EmailParts.RulesRightsRegulations,
): EmailParts.RulesRightsRegulations => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'variant',
    'showYourRightsDescription',
    'appealRightsShowInfo',
    'appealRightsShowInfoLabel',
    'appealRightsShowInstruction',
  ])
}

export const applyStatusStructure = (
  componentA: EmailParts.Status,
  componentB: EmailParts.Status,
): EmailParts.Status => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'boxColor',
    'icon',
    'showDescription',
    'showMissingDocumentDeadline',
    'showSupportiveInformation',
    'spaceAfter',
    'variant',
  ])
}

export const applySupplementalContentStructure = (
  componentA: EmailParts.SupplementalContent,
  componentB: EmailParts.SupplementalContent,
): EmailParts.SupplementalContent => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'variant',
    'benefitAmountBoxColor',
    'benefitAmountIcon',
  ])
}

export const applyDirectiveStructure = (
  componentA: EmailParts.Directive,
  componentB: EmailParts.Directive,
): EmailParts.Directive => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'showLabel',
    'showMultipleStepsSupportiveText',
    'showStep1AdditionalContent',
    'showStep2AdditionalContent',
    'showStep3AdditionalContent',
    'showTitle',
    'variant',
  ])
}

export const applyLoginDetailsStructure = (
  componentA: EmailParts.LoginDetails,
  componentB: EmailParts.LoginDetails,
): EmailParts.LoginDetails => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'variant',
    'loginDetailsIcon',
    'loginInformationIcon',
    'showLoginInformationBody',
  ])
}

export const applyInformationalBoxStructure = (
  componentA: EmailParts.InformationalBox,
  componentB: EmailParts.InformationalBox,
): EmailParts.InformationalBox => {
  return applyEmailPartValues(componentA, componentB, [
    'visible',
    'boxColor',
    'icon',
    'showSupportiveInformation',
  ])
}

export const applyAdditionalContentStructure = (
  componentA: EmailParts.AdditionalContent,
  componentB: EmailParts.AdditionalContent,
): EmailParts.AdditionalContent => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}

export const applyDateRangeStructure = (
  componentA: EmailParts.DateRange,
  componentB: EmailParts.DateRange,
): EmailParts.DateRange => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}

export const applyTitleStructure = (
  componentA: EmailParts.Title,
  componentB: EmailParts.Title,
): EmailParts.Title => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}

export const applyProgramNameStructure = (
  componentA: EmailParts.ProgramName,
  componentB: EmailParts.ProgramName,
): EmailParts.ProgramName => {
  return applyEmailPartValues(componentA, componentB, ['visible', 'backgroundColor', 'preset'])
}

export const applyDirectiveButtonStructure = (
  componentA: EmailParts.DirectiveButton,
  componentB: EmailParts.DirectiveButton,
): EmailParts.DirectiveButton => {
  return applyEmailPartValues(componentA, componentB, ['visible'])
}
