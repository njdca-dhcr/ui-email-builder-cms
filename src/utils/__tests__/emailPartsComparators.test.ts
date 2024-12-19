import { faker } from '@faker-js/faker'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import {
  areEmailComponentsEqual,
  areEmailSubComponentsEqual,
  areEmailTemplatesEqual,
  areEmailTranslationsEqual,
} from '../emailPartsComparators'

describe('areEmailSubComponentsEqual', () => {
  it('is true when the subcomponents are the same', async () => {
    const subComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const other = { ...subComponent }

    expect(areEmailSubComponentsEqual(subComponent, other)).toEqual(true)
    expect(areEmailSubComponentsEqual(other, subComponent)).toEqual(true)
  })

  it('is false when the subcomponents are different', async () => {
    const subComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const other = {
      ...subComponent,
      defaultValue: { ...subComponent.defaultValue, status: faker.lorem.word() },
    }

    expect(areEmailSubComponentsEqual(subComponent, other)).toEqual(false)
    expect(areEmailSubComponentsEqual(other, subComponent)).toEqual(false)
  })
})

describe('areEmailComponentsEqual', () => {
  it('is true when the components are the same', async () => {
    const component = buildUniqueEmailComponent('Header')
    const other = { ...component }

    expect(areEmailComponentsEqual(component, other)).toEqual(true)
    expect(areEmailComponentsEqual(other, component)).toEqual(true)
  })

  it('is false when the components are different', async () => {
    const component = buildUniqueEmailComponent('Header')
    const other: any = { ...component, kind: 'Banner' }

    expect(areEmailComponentsEqual(component, other)).toEqual(false)
    expect(areEmailComponentsEqual(other, component)).toEqual(false)
  })

  describe('subcomponents', () => {
    it('is true when the only difference is one has undefined for subcomponents and the other has an empty array', async () => {
      const component = buildUniqueEmailComponent('Header', { subComponents: undefined })
      const other = { ...component, subComponents: [] }

      expect(areEmailComponentsEqual(component, other)).toEqual(true)
      expect(areEmailComponentsEqual(other, component)).toEqual(true)
    })

    it('is false when the subcomponents are different', async () => {
      const subComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
      const component = buildUniqueEmailComponent('Header', { subComponents: [subComponent] })
      const other = {
        ...component,
        subComponents: [
          {
            ...subComponent,
            defaultValue: { ...subComponent.defaultValue, status: faker.lorem.word() },
          },
        ],
      }

      expect(areEmailComponentsEqual(component, other)).toEqual(false)
      expect(areEmailComponentsEqual(other, component)).toEqual(false)
    })
  })
})

describe('areEmailTranslationsEqual', () => {
  it('is true when the email templates are the same', async () => {
    const component = buildUniqueEmailComponent('Body', { subComponents: [] })
    const translation = buildEmailTranslation({ language: 'english', components: [component] })
    const other = { ...translation, components: [{ ...component, subComponents: undefined }] }

    expect(areEmailTranslationsEqual(translation, other)).toEqual(true)
    expect(areEmailTranslationsEqual(other, translation)).toEqual(true)
  })

  it('is false when the email templates are different', async () => {
    const subComponent = buildUniqueEmailSubComponent({ kind: 'InformationalBox' })
    const component = buildUniqueEmailComponent('Body', { subComponents: [subComponent] })
    const translation = buildEmailTranslation({ language: 'english', components: [component] })
    const other = {
      ...translation,
      components: [
        {
          ...component,
          subComponents: [
            {
              ...subComponent,
              defaultValue: { ...subComponent.defaultValue, title: faker.lorem.word() },
            },
          ],
        },
      ],
    }

    expect(areEmailTranslationsEqual(translation, other)).toEqual(false)
    expect(areEmailTranslationsEqual(other, translation)).toEqual(false)
  })
})

describe('areEmailTemplatesEqual', () => {
  it('is true when the email templates are the same', async () => {
    const component = buildUniqueEmailComponent('Body', { subComponents: [] })
    const translation = buildEmailTranslation({ language: 'english', components: [component] })
    const emailTemplate = buildUniqueEmailConfig({ translations: [translation] })
    const other = {
      ...emailTemplate,
      translations: [{ ...translation, components: [{ ...component, subComponents: undefined }] }],
    }

    expect(areEmailTemplatesEqual(emailTemplate, other)).toEqual(true)
    expect(areEmailTemplatesEqual(other, emailTemplate)).toEqual(true)
  })

  it('is false when the email templates are different', async () => {
    const subComponent = buildUniqueEmailSubComponent({ kind: 'InformationalBox' })
    const component = buildUniqueEmailComponent('Body', { subComponents: [subComponent] })
    const translation = buildEmailTranslation({ language: 'english', components: [component] })
    const emailTemplate = buildUniqueEmailConfig({ translations: [translation] })
    const other = {
      ...emailTemplate,
      translations: [
        {
          ...translation,
          components: [
            {
              ...component,
              subComponents: [
                {
                  ...subComponent,
                  defaultValue: { ...subComponent.defaultValue, title: faker.lorem.word() },
                },
              ],
            },
          ],
        },
      ],
    }

    expect(areEmailTemplatesEqual(emailTemplate, other)).toEqual(false)
    expect(areEmailTemplatesEqual(other, emailTemplate)).toEqual(false)
  })
})
