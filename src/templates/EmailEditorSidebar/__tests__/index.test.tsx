import React from 'react'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
  urlFor,
} from 'src/testHelpers'
import { EmailEditorSidebar } from '..'

describe('EmailEditorSidebar', () => {
  let emailTemplate: EmailTemplate.Config

  beforeEach(() => {
    emailTemplate = buildEmailTemplateConfig()
  })

  it('displays a link back to the home page', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const link: HTMLAnchorElement = baseElement.querySelector('.back-link') as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual(urlFor('/'))
  })

  it('displays the heading and select navigator', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const h1 = baseElement.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1?.tagName).toEqual('H1')
  })

  it('displays email edit component and subcomponent toggles', () => {
    emailTemplate = buildEmailTemplateConfig({
      components: [
        buildEmailTemplateComponent('Banner'),
        buildEmailTemplateComponent('Header', {
          subComponents: [buildEmailTemplateSubComponent('Header', { kind: 'Title' })],
        }),
        buildEmailTemplateComponent('Footer', {
          subComponents: [
            buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' }),
            buildEmailTemplateSubComponent('Footer', { kind: 'StateSeal' }),
          ],
        }),
      ],
    })
    const { queryByLabelText } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    expect(queryByLabelText('Banner')).not.toBeNull()
    expect(queryByLabelText('Header')).not.toBeNull()
    expect(queryByLabelText('Title')).not.toBeNull()
    expect(queryByLabelText('Footer')).not.toBeNull()
    expect(queryByLabelText('Additional Content')).not.toBeNull()
    expect(queryByLabelText('State Seal')).not.toBeNull()
  })
})
