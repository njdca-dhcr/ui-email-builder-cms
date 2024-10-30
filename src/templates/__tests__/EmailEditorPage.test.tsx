import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate.Base.Config
  let rendered: RenderResult
  let user: UserEvent
  let defaultPreviewText: string

  beforeEach(() => {
    const client = new QueryClient()
    user = userEvent.setup()
    defaultPreviewText = faker.lorem.paragraph()
    emailTemplate = buildEmailTemplateConfig({
      previewText: defaultPreviewText,
      components: [
        buildEmailTemplateComponent('Header', {
          subComponents: [
            buildEmailTemplateSubComponent({ kind: 'Title' }),
            buildEmailTemplateSubComponent({ kind: 'ProgramName' }),
          ],
        }),
        buildEmailTemplateComponent('Name'),
        buildEmailTemplateComponent('Body', {
          subComponents: [
            buildEmailTemplateSubComponent({ kind: 'Intro' }),
            buildEmailTemplateSubComponent({ kind: 'Status' }),
            buildEmailTemplateSubComponent({ kind: 'SupplementalContent' }),
          ],
        }),
        buildEmailTemplateComponent('Footer', {
          subComponents: [buildEmailTemplateSubComponent({ kind: 'AdditionalContent' })],
        }),
        buildEmailTemplateComponent('Disclaimer'),
      ],
    })
    rendered = render(
      <QueryClientProvider client={client}>
        <EmailEditorPage pageContext={{ emailTemplate }} />{' '}
      </QueryClientProvider>,
    )
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
    expect(queryByText('Back')).not.toBeNull()
  })

  it('displays the heading and select navigator', () => {
    const { baseElement } = rendered
    expect(baseElement).toHaveTextContent('Go to')
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })

  describe('preview text', () => {
    it('allows users to edit preview text in the sidebar which is added to the email markup', async () => {
      const value = faker.lorem.paragraph()
      const { baseElement, getByRole } = rendered
      const input = getByRole('textbox')
      expect(input).toHaveValue(defaultPreviewText)
      await user.type(input, value)
      const previewText = baseElement.querySelector('#preview-text')
      expect(previewText).not.toBeNull()
      expect(previewText).toHaveTextContent(defaultPreviewText + value)
    })
  })

  describe('toggling/editing components and their subcomponents', () => {
    it('preserves entered subcomponent text after toggling a subcomponent off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { getAllByLabelText } = rendered
      const input = () => getAllByLabelText('Title')[1]
      const subComponentToggle = () => getAllByLabelText('Title')[0]

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(subComponentToggle())
      expect(input()).toBeUndefined()

      await user.click(subComponentToggle())
      expect(input()).toBeDefined()
      expect(input()).toHaveTextContent(value)
    })

    it('preserves entered component text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { queryByLabelText, getAllByLabelText } = rendered
      const input = () => queryByLabelText("Recipient's name")
      const componentToggle = () => getAllByLabelText('Name')[0]

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle())
      expect(input()).toBeNull()

      await user.click(componentToggle())
      expect(input()).not.toBeNull()
      expect(input()).toHaveTextContent(value)
    })
  })
})
