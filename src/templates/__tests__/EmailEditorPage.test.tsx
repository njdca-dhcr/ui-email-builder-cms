import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate.Config
  let rendered: RenderResult

  beforeEach(() => {
    emailTemplate = buildEmailTemplateConfig({
      components: [
        buildEmailTemplateComponent('Header', {
          subComponents: [buildEmailTemplateSubComponent('Header', { kind: 'Title' })],
        }),
      ],
    })
    rendered = render(<EmailEditorPage pageContext={{ emailTemplate }} />)
  })

  it('is displays the layout', () => {
    const { baseElement } = rendered
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the EmailEditorContent', () => {
    const { baseElement } = rendered
    const h1 = baseElement.querySelector('h1[contenteditable="true"]')
    expect(h1).not.toBeNull()
    expect(h1).toHaveTextContent('Title')
  })

  it('displays the EmailEditorSidebar', () => {
    const { queryByText } = rendered
    expect(queryByText('Back to Home')).not.toBeNull()
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })
})
