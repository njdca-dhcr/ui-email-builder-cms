import { faker } from '@faker-js/faker'
import { DateRangeValue, EmailTemplate, NameValue } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/factories'
import { emailTemplateMergeDefaultValues } from '../emailTemplateMergeDefaultValues'

describe('emailTemplateMergeDefaultValues', () => {
  describe('components', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let nameComponent: EmailTemplate.Name

    beforeEach(() => {
      nameComponent = buildUniqueEmailComponent('Name', {
        defaultValue: { name: faker.lorem.word() },
      })
      emailTemplate = buildUniqueEmailConfig({
        components: [nameComponent],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newNameValue: NameValue = { name: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(emailTemplate, {
        [nameComponent.id]: newNameValue,
      })
      expect(result.components).toEqual([{ ...nameComponent, defaultValue: newNameValue }])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {})
      expect(result.components).toEqual([nameComponent])
    })
  })

  describe('subcomponents', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let headerComponent: EmailTemplate.Header
    let dateRangeSubComponent: EmailTemplate.DateRange

    beforeEach(() => {
      dateRangeSubComponent = buildUniqueEmailSubComponent('Header', {
        kind: 'DateRange',
        defaultValue: { range: faker.lorem.word() },
      })

      headerComponent = buildUniqueEmailComponent('Header', {
        subComponents: [dateRangeSubComponent],
      })
      emailTemplate = buildUniqueEmailConfig({
        components: [headerComponent],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newDateRangeValue: DateRangeValue = { range: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(emailTemplate, {
        [dateRangeSubComponent.id]: newDateRangeValue,
      })
      expect(result.components).toEqual([
        {
          ...headerComponent,
          subComponents: [{ ...dateRangeSubComponent, defaultValue: newDateRangeValue }],
        },
      ])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {})
      expect(result.components).toEqual([headerComponent])
    })
  })
})
