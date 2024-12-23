import React from 'react'
import { faker } from '@faker-js/faker'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { render } from '@testing-library/react'
import { EmailBody } from '../EmailBody'

describe('EmailBody', () => {
  let title: string
  let status: string
  let name: string
  let previewText: string
  let translation: EmailTranslation.Unique
  let emailTemplate: EmailTemplate.Unique.Config

  beforeEach(async () => {
    title = faker.lorem.words(4)
    status = faker.lorem.words(2)
    name = faker.lorem.words(3)
    previewText = faker.lorem.paragraph()

    translation = buildEmailTranslation({
      previewText: 'other',
      components: [
        buildUniqueEmailComponent('Banner'),
        buildUniqueEmailComponent('Header', {
          subComponents: [buildUniqueEmailSubComponent({ kind: 'Title', defaultValue: { title } })],
        }),
        buildUniqueEmailComponent('Name', { defaultValue: { name } }),
        buildUniqueEmailComponent('Body', {
          subComponents: [
            buildUniqueEmailSubComponent({ kind: 'Status', defaultValue: { status } }),
          ],
        }),
      ],
    })

    emailTemplate = buildUniqueEmailConfig({ translations: [translation] })
  })

  it('creates email markup for preview text', () => {
    const { baseElement } = render(
      <EmailBody previewText={previewText} translation={translation} />,
    )

    expect(baseElement).toHaveTextContent(previewText)
  })

  it('creates email markup for components and subcomponents', () => {
    const { baseElement } = render(
      <EmailBody previewText={previewText} translation={translation} />,
    )

    expect(baseElement).toHaveTextContent(status)
    expect(baseElement).toHaveTextContent(name)
  })
})
