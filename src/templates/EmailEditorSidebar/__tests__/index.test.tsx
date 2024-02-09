import React from 'react'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { EmailEditorSidebar } from '..'

describe('EmailEditorSidebar', () => {
  let emailTemplate: EmailTemplate.UniqueConfig

  beforeEach(() => {
    emailTemplate = buildUniqueEmailConfig()
  })

  it('displays a link back to the home page', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const link: HTMLAnchorElement = baseElement.querySelector('.back-link') as any
    expect(link).toHaveTextContent('Back')
  })

  it('displays the heading and select navigator', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const h1 = baseElement.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1?.tagName).toEqual('H1')
  })

  it('displays email edit component and subcomponent toggles', () => {
    emailTemplate = buildUniqueEmailConfig({
      components: [
        buildUniqueEmailComponent('Banner'),
        buildUniqueEmailComponent('Header', {
          subComponents: [buildUniqueEmailSubComponent('Header', { kind: 'Title' })],
        }),
        buildUniqueEmailComponent('Footer', {
          subComponents: [buildUniqueEmailSubComponent('Footer', { kind: 'AdditionalContent' })],
        }),
      ],
    })
    const { queryByLabelText, queryAllByLabelText, baseElement } = render(
      <EmailEditorSidebar emailTemplate={emailTemplate} />,
    )

    const headerAccordionButton = queryAllByLabelText('Header')[0]
    const footerAccordionButton = queryAllByLabelText('Footer')[0]

    expect(headerAccordionButton).not.toBeNull()
    expect(footerAccordionButton).not.toBeNull()
    expect(queryByLabelText('Title')).not.toBeNull()
    expect(queryByLabelText('Additional Content')).not.toBeNull()
  })
})
