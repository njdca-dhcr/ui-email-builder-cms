import { faker } from '@faker-js/faker'
import { DateRangeValue, EmailParts, EmailTemplate, Language, NameValue } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/factories'
import { emailTemplateMergeDefaultValues } from '../emailTemplateMergeDefaultValues'

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
