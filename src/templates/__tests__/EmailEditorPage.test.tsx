import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import {
  buildBaseEmailTranslation,
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
  mockBackendUrl,
  userIsSignedIn,
} from 'src/testHelpers'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate.Base.Config
  let user: UserEvent
  let defaultPreviewText: string

  beforeEach(() => {
    const client = new QueryClient()
    user = userEvent.setup()
    userIsSignedIn()
    mockBackendUrl(faker.internet.url())
    defaultPreviewText = faker.lorem.paragraph()
    emailTemplate = buildEmailTemplateConfig({
      translations: [
        buildBaseEmailTranslation({
          language: 'english',
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
        }),
      ],
    })
  })

  const renderPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <EmailEditorPage pageContext={{ emailTemplate }} />
      </QueryClientProvider>,
    )
  }

  it('is displays the layout', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the EmailEditorContent', () => {
    const { baseElement } = renderPage()
    const h1 = baseElement.querySelector('h1[contenteditable="true"]')
    expect(h1).not.toBeNull()
    expect(h1).toHaveTextContent('Title')
  })

  it('displays the EmailEditorSidebar', () => {
    const { queryByText } = renderPage()
    expect(queryByText('Back')).not.toBeNull()
  })

  it('displays the heading and select navigator', () => {
    const { baseElement } = renderPage()
    expect(baseElement).toHaveTextContent('Go to')
  })

  it('can display the email in desktop or mobile', async () => {
    const user = userEvent.setup()
    const { baseElement, getByLabelText } = renderPage()

    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()

    await user.click(getByLabelText('Mobile'))

    expect(baseElement.querySelector('.email-preview-desktop')).toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).not.toBeNull()

    await user.click(getByLabelText('Desktop'))
    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()
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
      const { baseElement, getByRole } = renderPage()
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
      const { getAllByLabelText } = renderPage()
      const input = () => getAllByLabelText('Title')[1]
      const subComponentToggle = () => getAllByLabelText('Title')[0]
      const initialInput = input()

      await user.clear(initialInput!)
      await user.type(initialInput!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(subComponentToggle())
      expect(input()).toBeUndefined()

      await user.click(subComponentToggle())
      const newInput = input()
      expect(newInput).toBeDefined()
      expect(newInput).toHaveTextContent(value)
    })

    it('preserves entered component text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { queryByLabelText, getAllByLabelText } = renderPage()
      const input = () => queryByLabelText("Recipient's name")
      const componentToggle = getAllByLabelText('Name')[0]
      const initialInput = input()

      await user.clear(initialInput!)
      await user.type(initialInput!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle)
      expect(input()).toBeNull()

      await user.click(componentToggle)
      const newInput = input()
      expect(newInput).not.toBeNull()
      expect(newInput).toHaveTextContent(value)
    })
  })

  describe('saving and sharing', () => {
    it('prevents the user from updating email template', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Update' })).toBeNull()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
    })

    it('displays the export email template button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Share' })).toBeDefined()
    })
  })
})
