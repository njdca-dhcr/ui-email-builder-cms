import React from 'react'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { EmailEditorSidebar } from '..'
import { faker } from '@faker-js/faker'

describe('EmailEditorSidebar', () => {
  let emailTemplate: EmailTemplate.Unique.Config

  beforeEach(() => {
    emailTemplate = buildUniqueEmailConfig({
      translations: [buildEmailTranslation({ language: 'english' })],
    })
  })

  it('displays a link back to the home page', () => {
    const { baseElement } = render(
      <EmailEditorSidebar
        language="english"
        emailTemplate={emailTemplate}
        heading={<h1>{faker.lorem.words(3)}</h1>}
      />,
    )
    const link: HTMLAnchorElement = baseElement.querySelector('.back-link') as any
    expect(link).toHaveTextContent('Back')
  })

  it('displays the given heading', () => {
    const title = faker.lorem.words(3)
    const { baseElement } = render(
      <EmailEditorSidebar
        language="english"
        emailTemplate={emailTemplate}
        heading={<h1>{title}</h1>}
      />,
    )
    expect(baseElement).toContainHTML(`<h1>${title}</h1>`)
  })

  it('displays email edit component and subcomponent toggles', () => {
    emailTemplate = buildUniqueEmailConfig({
      translations: [
        {
          language: 'english',
          components: [
            buildUniqueEmailComponent('Banner'),
            buildUniqueEmailComponent('Header', {
              subComponents: [buildUniqueEmailSubComponent({ kind: 'Title' })],
            }),
            buildUniqueEmailComponent('Footer', {
              subComponents: [buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })],
            }),
          ],
        },
        {
          language: 'spanish',
          components: [],
        },
      ],
    })
    const { queryByLabelText, queryAllByLabelText } = render(
      <EmailEditorSidebar
        language="english"
        emailTemplate={emailTemplate}
        heading={<h1>{faker.lorem.words(3)}</h1>}
      />,
    )

    const headerAccordionButton = queryAllByLabelText('Header')[0]
    const footerAccordionButton = queryAllByLabelText('Footer')[0]

    expect(headerAccordionButton).not.toBeNull()
    expect(footerAccordionButton).not.toBeNull()
    expect(queryByLabelText('Title')).not.toBeNull()
    expect(queryByLabelText('Additional Content')).not.toBeNull()
  })

  describe('without an email template', () => {
    it('does not render the accordion', () => {
      const { baseElement } = render(
        <EmailEditorSidebar
          language="english"
          emailTemplate={undefined}
          heading={<h1>{faker.lorem.words(3)}</h1>}
        />,
      )

      expect(baseElement.querySelector('.sidebar-accordion-container')).toBeNull()
    })
  })
})
