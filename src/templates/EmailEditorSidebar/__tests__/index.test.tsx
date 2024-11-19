import React from 'react'
import { render } from '@testing-library/react'
import { EmailTranslation } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { EmailEditorSidebar } from '..'
import { faker } from '@faker-js/faker'

describe('EmailEditorSidebar', () => {
  let emailTranslation: EmailTranslation.Unique

  beforeEach(() => {
    emailTranslation = buildEmailTranslation({ language: 'english' })
  })

  it('displays a link back to the home page', () => {
    const { baseElement } = render(
      <EmailEditorSidebar
        heading={<h1>{faker.lorem.words(3)}</h1>}
        emailTranslation={emailTranslation}
      />,
    )
    const link: HTMLAnchorElement = baseElement.querySelector('.back-link') as any
    expect(link).toHaveTextContent('Back')
  })

  it('displays the given heading', () => {
    const title = faker.lorem.words(3)
    const { baseElement } = render(
      <EmailEditorSidebar emailTranslation={emailTranslation} heading={<h1>{title}</h1>} />,
    )
    expect(baseElement).toContainHTML(`<h1>${title}</h1>`)
  })

  it('displays email edit component and subcomponent toggles', () => {
    emailTranslation = buildEmailTranslation({
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
    })
    const { queryByLabelText, queryAllByLabelText } = render(
      <EmailEditorSidebar
        emailTranslation={emailTranslation}
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

  describe('when the translation is not set', () => {
    it('does not render the accordion', () => {
      const { baseElement } = render(
        <EmailEditorSidebar
          emailTranslation={buildEmailTranslation({ language: 'not-set' })}
          heading={<h1>{faker.lorem.words(3)}</h1>}
        />,
      )

      expect(baseElement.querySelector('.sidebar-accordion-container')).toBeNull()
    })
  })
})
