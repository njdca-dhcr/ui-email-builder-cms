import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { shouldShowEmailPartsFromEmailTemplate } from '../shouldShowEmailPartsFromEmailTemplate'

describe('shouldShowEmailPartsFromEmailTemplate', () => {
  describe('email components', () => {
    it('marks the proper components as visible when they are not required', () => {
      const nameComponent = buildUniqueEmailComponent('Name', {
        visibleByDefault: true,
        required: false,
      })
      const bodyComponent = buildUniqueEmailComponent('Body', {
        visibleByDefault: false,
        required: false,
      })
      const emailTemplate = buildUniqueEmailConfig({
        components: [nameComponent, bodyComponent],
      })
      const result = shouldShowEmailPartsFromEmailTemplate(emailTemplate)
      expect(result).toEqual({ [nameComponent.id]: true, [bodyComponent.id]: false })
    })

    it('marks the proper components as visible when they are required', () => {
      const nameComponent = buildUniqueEmailComponent('Name', {
        visibleByDefault: true,
        required: true,
      })
      const bodyComponent = buildUniqueEmailComponent('Body', {
        visibleByDefault: false,
        required: true,
      })
      const emailTemplate = buildUniqueEmailConfig({
        components: [nameComponent, bodyComponent],
      })
      const result = shouldShowEmailPartsFromEmailTemplate(emailTemplate)
      expect(result).toEqual({ [nameComponent.id]: true, [bodyComponent.id]: true })
    })
  })

  describe('email subcomponents', () => {
    it('handles email subcomponents properly when not required', () => {
      const introSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Intro',
        visibleByDefault: true,
        required: false,
      })
      const statusSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Status',
        visibleByDefault: false,
        required: false,
      })
      const bodyComponent = buildUniqueEmailComponent('Body', {
        subComponents: [introSubComponent, statusSubComponent],
      })
      const emailTemplate = buildUniqueEmailConfig({ components: [bodyComponent] })

      const result = shouldShowEmailPartsFromEmailTemplate(emailTemplate)
      expect(result).toEqual({
        [bodyComponent.id]: true,
        [introSubComponent.id]: true,
        [statusSubComponent.id]: false,
      })
    })

    it('handles email subcomponents properly when required', () => {
      const introSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Intro',
        visibleByDefault: true,
        required: true,
      })
      const statusSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Status',
        visibleByDefault: false,
        required: true,
      })
      const bodyComponent = buildUniqueEmailComponent('Body', {
        subComponents: [introSubComponent, statusSubComponent],
      })
      const emailTemplate = buildUniqueEmailConfig({ components: [bodyComponent] })

      const result = shouldShowEmailPartsFromEmailTemplate(emailTemplate)
      expect(result).toEqual({
        [bodyComponent.id]: true,
        [introSubComponent.id]: true,
        [statusSubComponent.id]: true,
      })
    })
  })

  it('handles a mix of email components and subcomponents properly', () => {
    const introSubComponent = buildUniqueEmailSubComponent('Body', {
      kind: 'Intro',
      visibleByDefault: true,
      required: false,
    })
    const statusSubComponent = buildUniqueEmailSubComponent('Body', {
      kind: 'Status',
      visibleByDefault: false,
      required: true,
    })
    const nameComponent = buildUniqueEmailComponent('Name', {
      visibleByDefault: false,
      required: false,
    })
    const bodyComponent = buildUniqueEmailComponent('Body', {
      visibleByDefault: false,
      required: true,
      subComponents: [introSubComponent, statusSubComponent],
    })
    const emailTemplate = buildUniqueEmailConfig({
      components: [nameComponent, bodyComponent],
    })

    const result = shouldShowEmailPartsFromEmailTemplate(emailTemplate)
    expect(result).toEqual({
      [nameComponent.id]: false,
      [bodyComponent.id]: true,
      [introSubComponent.id]: true,
      [statusSubComponent.id]: true,
    })
  })
})
