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

  const renderPage = (options?: { location: { search?: string } }) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <EmailEditorPage
          pageContext={{ emailTemplate }}
          uri=""
          path=""
          location={{} as any}
          pageResources={{} as any}
          params={{}}
          children={undefined}
          data={{}}
          serverData={{}}
          {...options}
        />
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

  it('does not open in translation mode by default', async () => {
    const { baseElement } = renderPage({ location: {} })
    expect(baseElement.querySelectorAll('.translation-mode')).toHaveLength(0)
  })

  it('allows a translation to be added', async () => {
    const { getByRole, baseElement } = renderPage()
    // In the sidebar
    await user.click(getByRole('button', { name: 'Add Translation' }))
    // In the modal
    await user.click(getByRole('button', { name: 'Add Translation' }))
    expect(baseElement.querySelectorAll('.translation-mode')).toHaveLength(1)
  })

  it('opens in translation mode when the add-translation search param is present', async () => {
    const { baseElement } = renderPage({ location: { search: '?add-translation' } })
    expect(baseElement.querySelectorAll('.translation-mode')).toHaveLength(1)
    expect(baseElement.querySelector('.new-translation .email-preview table')).toBeTruthy()
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

      expect(queryByRole('button', { name: 'Update' })).toBeFalsy()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Save As' })).toBeTruthy()
    })

    it('does not display the export email template button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Share' })).toBeFalsy()
    })
  })

  describe('translation mode', () => {
    let user: UserEvent

    beforeEach(async () => {
      user = userEvent.setup()
    })

    const renderPageInTranslationMode = async () => {
      const rendered = renderPage()

      // In the sidebar
      await user.click(rendered.getByRole('button', { name: 'Add Translation' }))
      // In the modal
      await user.click(rendered.getByRole('button', { name: 'Add Translation' }))

      return rendered
    }

    it('displays two translations in translation mode', async () => {
      const { baseElement } = await renderPageInTranslationMode()
      expect(baseElement.querySelectorAll('.email-editor-content')).toHaveLength(2)
    })

    it('displays the translation mode header', async () => {
      const { baseElement } = await renderPageInTranslationMode()
      expect(baseElement.querySelector('.translation-mode-header')).toBeTruthy()
    })

    it('is possible to exit translation mode', async () => {
      const { queryByRole } = await renderPageInTranslationMode()
      expect(queryByRole('button', { name: 'Edit Original Email' })).toBeTruthy()
    })

    it('has a read only version of the original translation', async () => {
      const { baseElement } = await renderPageInTranslationMode()
      const originalTranslationContainer = baseElement.querySelector('.original-translation')

      expect(originalTranslationContainer).toBeTruthy()
      expect(originalTranslationContainer!.querySelectorAll('[readonly]').length).toBeGreaterThan(0)
    })

    it('has a writable version of the other translation', async () => {
      const { baseElement } = await renderPageInTranslationMode()
      const otherTranslationContainer = baseElement.querySelector('.new-translation')

      expect(otherTranslationContainer).toBeTruthy()
      expect(
        otherTranslationContainer!.querySelectorAll('[contenteditable="true"]').length,
      ).toBeGreaterThan(0)
    })

    it('can display the email in desktop or mobile', async () => {
      const user = userEvent.setup()
      const { baseElement, getByLabelText } = await renderPageInTranslationMode()

      expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(2)
      expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(0)

      await user.click(getByLabelText('Mobile'))

      expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(0)
      expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(2)

      await user.click(getByLabelText('Desktop'))
      expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(2)
      expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(0)
    })
  })
})
