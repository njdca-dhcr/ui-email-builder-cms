import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUserShow,
  mockAppMode,
  mockBackendUrl,
  randomBannerValue,
  userIsNotSignedIn,
  userIsSignedIn,
} from 'src/testHelpers'
import { EmailEditorContent } from '..'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { randomUUID } from 'crypto'
import { useRenderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'
import { CurrentUserEmailConfig } from 'src/network/users'
import { AuthProvider } from 'src/utils/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/utils/download')
jest.mock('src/templates/emailHtmlDocument/renderEmailTranslationToString')
jest.mock('src/network/useKeepHtmlTranslationsLinksPopulated')

describe('EmailEditorContent', () => {
  let emailTranslation: EmailTranslation.Unique
  let emailTemplate: EmailTemplate.Unique.Config
  let alertSpy: jest.SpyInstance
  let user: UserEvent
  let mockRenderEmailToString: jest.Mock
  let currentUser: CurrentUserEmailConfig

  beforeEach(() => {
    user = userEvent.setup()
    currentUser = buildUserShow()
    emailTranslation = buildEmailTranslation({
      language: 'english',
      components: [
        buildUniqueEmailComponent('Banner'),
        buildUniqueEmailComponent('Header', {
          subComponents: [
            buildUniqueEmailSubComponent({ kind: 'Title' }),
            buildUniqueEmailSubComponent({ kind: 'ProgramName' }),
          ],
        }),
      ],
    })
    emailTemplate = buildUniqueEmailConfig({ translations: [emailTranslation] })
    alertSpy = jest.spyOn(window, 'alert')
    alertSpy.mockReturnValue(false)
    userIsNotSignedIn()
    mockRenderEmailToString = jest.fn()
    asMock(useRenderEmailTranslationToString).mockReturnValue(mockRenderEmailToString)
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  it('can display the email in desktop or mobile', async () => {
    const { baseElement, getByLabelText } = render(
      <EmailEditorContent
        emailTranslation={emailTranslation}
        emailTemplate={emailTemplate}
        currentUser={currentUser}
      />,
    )

    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()

    await user.click(getByLabelText('Mobile'))

    expect(baseElement.querySelector('.email-preview-desktop')).toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).not.toBeNull()

    await user.click(getByLabelText('Desktop'))
    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()
  })

  it('can display the email components and subcomponents', () => {
    const { queryByText } = render(
      <EmailEditorContent
        emailTranslation={emailTranslation}
        emailTemplate={emailTemplate}
        currentUser={currentUser}
      />,
    )
    expect(queryByText('Title')).not.toBeNull()
    expect(queryByText('Dependency Benefits')).not.toBeNull()
  })

  it('displays the edit preview text field', () => {
    const { baseElement } = render(
      <EmailEditorContent
        emailTranslation={emailTranslation}
        emailTemplate={emailTemplate}
        currentUser={currentUser}
      />,
    )
    const input = baseElement.querySelector('#edit-preview-text')

    expect(input).not.toBeNull()
  })

  it('renders the preview text', () => {
    const { baseElement } = render(
      <EmailEditorContent
        emailTranslation={emailTranslation}
        emailTemplate={emailTemplate}
        currentUser={currentUser}
      />,
    )
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })

  describe('when restricted', () => {
    beforeEach(() => {
      mockAppMode('KY')
    })

    it('does not have a share dropdown', () => {
      const { queryByRole } = render(
        <EmailEditorContent
          emailTranslation={emailTranslation}
          emailTemplate={emailTemplate}
          currentUser={currentUser}
        />,
      )

      expect(queryByRole('menu', { name: 'Share' })).toBeNull()
    })
  })

  it('integrates the current user configuration', () => {
    const banner = randomBannerValue()
    const { baseElement } = render(
      <EmailEditorContent
        emailTranslation={emailTranslation}
        emailTemplate={emailTemplate}
        currentUser={{ ...currentUser, banner }}
      />,
    )

    expect(baseElement).toHaveTextContent(banner.primaryText)
  })

  describe('when read only', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsSignedIn()
      mockAppMode('NJ')
    })

    const renderReadOnly = () => {
      return render(
        <AuthProvider>
          <QueryClientProvider client={new QueryClient()}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: randomUUID() }}
              currentUser={currentUser}
              readOnly
            />
          </QueryClientProvider>
        </AuthProvider>,
      )
    }

    it('has read only fields', async () => {
      const { baseElement } = renderReadOnly()
      expect(baseElement!.querySelectorAll('[readonly]').length).toBeGreaterThan(0)
    })

    it('lacks an export button', async () => {
      const { queryByRole } = renderReadOnly()
      expect(queryByRole('button', { name: 'Share' })).toBeNull()
    })

    it('lacks an update button', async () => {
      const { queryByRole } = renderReadOnly()
      expect(queryByRole('button', { name: 'Update' })).toBeNull()
    })

    it('lacks a save as button', async () => {
      const { queryByRole } = renderReadOnly()
      expect(queryByRole('button', { name: 'Save As' })).toBeNull()
    })
  })

  describe('when the email template has an id and signed in', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsSignedIn()
      mockAppMode('NJ')
    })

    it('allows users to update the email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={new QueryClient()}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: randomUUID() }}
              currentUser={currentUser}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Update' })).not.toBeNull()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={new QueryClient()}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: randomUUID() }}
              currentUser={currentUser}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
    })

    it('displays the export email template button', async () => {
      const { queryByRole } = render(
        <EmailPartsContent>
          <EmailEditorContent
            emailTranslation={emailTranslation}
            emailTemplate={{ ...emailTemplate, id: randomUUID() }}
            currentUser={currentUser}
          />
        </EmailPartsContent>,
      )
      expect(queryByRole('button', { name: 'Share' })).toBeDefined()
    })
  })

  describe('when the email template lacks an id', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsSignedIn()
      mockAppMode('NJ')
    })

    it('does not have a way to update the email template', async () => {
      const { queryByRole } = render(
        <EmailEditorContent
          emailTranslation={emailTranslation}
          emailTemplate={{ ...emailTemplate, id: undefined }}
          currentUser={currentUser}
        />,
      )

      expect(queryByRole('button', { name: 'Update' })).toBeNull()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={new QueryClient()}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: undefined }}
              currentUser={currentUser}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
    })

    it('does not display the export email template button', async () => {
      const { queryByRole } = render(
        <EmailEditorContent
          emailTranslation={emailTranslation}
          emailTemplate={{ ...emailTemplate, id: undefined }}
          currentUser={currentUser}
        />,
      )
      expect(queryByRole('button', { name: 'Share' })).toBeNull()
    })
  })
})
