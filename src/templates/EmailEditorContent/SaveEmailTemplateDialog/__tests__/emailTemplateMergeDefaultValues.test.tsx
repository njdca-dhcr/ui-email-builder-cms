import { faker } from '@faker-js/faker'
import {
  DateRangeValue,
  EmailParts,
  EmailTemplate,
  EmailTranslation,
  Language,
  NameValue,
} from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/factories'
import {
  emailTemplateMergeDefaultValues,
  mergeComponentDefaultValue,
  mergeEmailTemplateValues,
  mergeSubComponentDefaultValue,
  mergeTranslationValues,
} from '../emailTemplateMergeDefaultValues'

describe('emailTemplateMergeDefaultValues', () => {
  let language: Language

  beforeEach(() => {
    language = 'english'
  })

  describe('components', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let nameComponent: EmailParts.Name

    beforeEach(() => {
      nameComponent = buildUniqueEmailComponent('Name', {
        defaultValue: { name: faker.lorem.word() },
      })
      emailTemplate = buildUniqueEmailConfig({
        translations: [buildEmailTranslation({ language, components: [nameComponent] })],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newNameValue: NameValue = { name: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(
        emailTemplate,
        {
          [nameComponent.id]: newNameValue,
        },
        language,
      )
      expect(result.translations![0].components).toEqual([
        { ...nameComponent, defaultValue: newNameValue },
      ])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {}, language)
      expect(result.translations![0].components).toEqual([nameComponent])
    })
  })

  describe('subcomponents', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let headerComponent: EmailParts.Header
    let dateRangeSubComponent: EmailParts.DateRange

    beforeEach(() => {
      dateRangeSubComponent = buildUniqueEmailSubComponent({
        kind: 'DateRange',
        defaultValue: { range: faker.lorem.word() },
      })

      headerComponent = buildUniqueEmailComponent('Header', {
        subComponents: [dateRangeSubComponent],
      })
      emailTemplate = buildUniqueEmailConfig({
        translations: [{ language, components: [headerComponent] }],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newDateRangeValue: DateRangeValue = { range: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(
        emailTemplate,
        {
          [dateRangeSubComponent.id]: newDateRangeValue,
        },
        language,
      )
      expect(result.translations![0].components).toEqual([
        {
          ...headerComponent,
          subComponents: [{ ...dateRangeSubComponent, defaultValue: newDateRangeValue }],
        },
      ])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {}, language)
      expect(result.translations![0].components).toEqual([headerComponent])
    })
  })
})

describe('mergeSubComponentDefaultValue', () => {
  it('returns a subcomponent with with an updated default value', async () => {
    const subComponent = buildUniqueEmailSubComponent({
      kind: 'ProgramName',
      defaultValue: { name: faker.lorem.word() },
    })
    const data = { [subComponent.id]: { name: faker.lorem.words(3) } }
    const result = mergeSubComponentDefaultValue(subComponent, data)
    expect(result).toEqual({ ...subComponent, defaultValue: data[subComponent.id] })
  })

  it('uses the existing default value if none exists in the given data', async () => {
    const subComponent = buildUniqueEmailSubComponent({
      kind: 'ProgramName',
      defaultValue: { name: faker.lorem.word() },
    })
    const result = mergeSubComponentDefaultValue(subComponent, {})
    expect(result).toEqual(subComponent)
  })
})

describe('mergeComponentDefaultValue', () => {
  it('returns a component with with an updated default value', async () => {
    const component = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const data = { [component.id]: { name: faker.lorem.words(3) } }
    const result = mergeComponentDefaultValue(component, data)
    expect(result).toEqual({ ...component, defaultValue: data[component.id], subComponents: [] })
  })

  it('uses the existing default value if none exists in the given data', async () => {
    const component = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const result = mergeComponentDefaultValue(component, {})
    expect(result).toEqual({ ...component, subComponents: [] })
  })

  it('merges the default values of its subcomponents', async () => {
    const subComponent = buildUniqueEmailSubComponent({
      kind: 'ProgramName',
      defaultValue: { name: faker.lorem.word() },
    })
    const component = buildUniqueEmailComponent('Header', {
      subComponents: [subComponent],
    })

    const data = { [subComponent.id]: { name: faker.lorem.words(3) } }
    const result = mergeComponentDefaultValue(component, data)
    expect(result.subComponents).toEqual([mergeSubComponentDefaultValue(subComponent, data)])
  })
})

describe('mergeTranslationValues', () => {
  it('merges the default values of its components and the preview text', async () => {
    const component = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const translation = buildEmailTranslation({
      components: [component],
      previewText: faker.lorem.paragraph(),
    })
    const previewText = faker.lorem.paragraph()
    const data = { [component.id]: { name: faker.lorem.words(3) } }

    const result = mergeTranslationValues({ translation, previewText, data })
    expect(result).toEqual({
      ...translation,
      previewText,
      components: [{ ...component, defaultValue: data[component.id], subComponents: [] }],
    })
  })
})

describe('mergeEmailTemplateValues', () => {
  let emailTemplate: EmailTemplate.Unique.Config
  let language: Language
  let data: Record<string, any>
  let previewText: string
  let name: string
  let description: string
  let tagNames: string[]
  let englishTranslation: EmailTranslation.Unique
  let spanishTranslation: EmailTranslation.Unique
  let component: EmailParts.Unique.Component

  beforeEach(async () => {
    language = 'english'
    component = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    spanishTranslation = buildEmailTranslation({ language: 'spanish', components: [component] })
    englishTranslation = buildEmailTranslation({
      language,
      previewText: faker.lorem.paragraph(),
      components: [component],
    })
    emailTemplate = buildUniqueEmailConfig({
      translations: [spanishTranslation, englishTranslation],
    })
    data = { [component.id]: { name: faker.lorem.paragraph() } }
    previewText = faker.lorem.paragraph()
    name = faker.lorem.words(3)
    description = faker.lorem.words(3)
    tagNames = [faker.lorem.word(), faker.lorem.word()]
  })

  it('returns an email template with the given name', async () => {
    const result = mergeEmailTemplateValues({
      emailTemplate,
      language,
      previewText,
      data,
      name,
      description,
      tagNames,
    })
    expect(result.id).toEqual(emailTemplate.id)
    expect(result.name).toEqual(name)
  })

  it('returns an email template with the given description', async () => {
    const result = mergeEmailTemplateValues({
      emailTemplate,
      language,
      previewText,
      data,
      name,
      description,
      tagNames,
    })
    expect(result.description).toEqual(description)
  })

  it('returns an email template with the given tag names', async () => {
    const result = mergeEmailTemplateValues({
      emailTemplate,
      language,
      previewText,
      data,
      name,
      description,
      tagNames,
    })
    expect(result.tagNames).toEqual(tagNames)
  })

  it('returns an email template with an updated translation for the given language', async () => {
    const result = mergeEmailTemplateValues({
      emailTemplate,
      language,
      previewText,
      data,
      name,
      description,
      tagNames,
    })
    expect(result.translations).toEqual([
      spanishTranslation,
      {
        ...englishTranslation,
        previewText,
        components: [{ ...component, subComponents: [], defaultValue: data[component.id] }],
      },
    ])
  })
})
