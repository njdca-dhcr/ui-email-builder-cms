import { faker } from '@faker-js/faker'
import { renderEmailTranslationToString } from '../renderEmailTranslationToString'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUserShow,
  randomObject,
} from 'src/testHelpers'
import { CurrentUserEmailConfig } from 'src/network/users'

describe('renderEmailTranslationToString', () => {
  let title: string
  let status: string
  let name: string
  let previewText: string
  let translation: EmailTranslation.Unique
  let emailTemplate: EmailTemplate.Unique.Config
  let userInfo: CurrentUserEmailConfig

  beforeEach(async () => {
    title = faker.lorem.words(4)
    status = faker.lorem.words(2)
    name = faker.lorem.words(3)
    previewText = faker.lorem.paragraph()

    translation = buildEmailTranslation({
      previewText,
      components: [
        buildUniqueEmailComponent('Banner'),
        buildUniqueEmailComponent('Header', {
          subComponents: [
            buildUniqueEmailSubComponent({ kind: 'DateRange' }),
            buildUniqueEmailSubComponent({ kind: 'Title', defaultValue: { title } }),
          ],
        }),
        buildUniqueEmailComponent('Name', { defaultValue: { name } }),
        buildUniqueEmailComponent('Body', {
          subComponents: [
            buildUniqueEmailSubComponent({ kind: 'Status', defaultValue: { status } }),
          ],
        }),
      ],
    })

    emailTemplate = buildUniqueEmailConfig({
      translations: [translation],
    })

    userInfo = {
      banner: randomObject(),
      departmentSeal: randomObject(),
      stateSeal: randomObject(),
      disclaimer: randomObject(),
    }
  })

  it('creates email markup for preview text', () => {
    const result = renderEmailTranslationToString({ translation, emailTemplate, userInfo })

    expect(result).toContain(previewText)
  })

  it('creates email markup for components and subcomponents', () => {
    const result = renderEmailTranslationToString({ translation, emailTemplate, userInfo })

    expect(result).toContain(status)
    expect(result).toContain(name)
  })

  it('creates email markup with the EmailLayout', () => {
    const result = renderEmailTranslationToString({ translation, emailTemplate, userInfo })

    expect(result).toContain('xmlns:v=')
    expect(result).toContain('xmlns:o=')
    expect(result).toContain(`<title>${title}</title>`)
  })

  it('creates email markup with a doctype', () => {
    const result = renderEmailTranslationToString({ translation, emailTemplate, userInfo })

    expect(result).toContain(
      `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`,
    )
  })

  it('removes any content editable attributes', () => {
    const result = renderEmailTranslationToString({ translation, emailTemplate, userInfo })

    expect(result).not.toContain('contenteditable="true"')
    expect(result).not.toContain('aria-label="Title"')
    expect(result).not.toContain('contenteditable')
    expect(result).not.toContain('aria-label')
  })
})
