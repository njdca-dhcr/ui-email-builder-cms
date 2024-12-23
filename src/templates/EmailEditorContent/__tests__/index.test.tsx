import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUseQueryResult,
  buildUserShow,
  mockAppMode,
  mockBackendUrl,
  randomBannerValue,
  userIsNotSignedIn,
  userIsSignedIn,
} from 'src/testHelpers'
import { EmailEditorContent } from '..'
import { download } from 'src/utils/download'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'
import { CurrentUser, useCurrentUser } from 'src/network/users'
import { randomUUID } from 'crypto'
import { AuthProvider } from 'src/utils/AuthContext'
import { useRenderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'

jest.mock('src/utils/download')

jest.mock('src/network/users')

jest.mock('src/templates/emailHtmlDocument/renderEmailTranslationToString')

describe('EmailEditorContent', () => {
  let emailTranslation: EmailTranslation.Unique
  let emailTemplate: EmailTemplate.Unique.Config
  let alertSpy: jest.SpyInstance
  let client: QueryClient
  let user: UserEvent
  let mockRenderEmailToString: jest.Mock

  beforeEach(() => {
    user = userEvent.setup()
    client = new QueryClient()
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
    const query = { ...buildUseQueryResult<CurrentUser>({ data: undefined }), enabled: false }
    asMock(useCurrentUser).mockReturnValue(query)
    mockRenderEmailToString = jest.fn()
    asMock(useRenderEmailTranslationToString).mockReturnValue(mockRenderEmailToString)
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  it('can display the email in desktop or mobile', async () => {
    const { baseElement, getByLabelText } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
      </QueryClientProvider>,
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
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    expect(queryByText('Title')).not.toBeNull()
    expect(queryByText('Dependency Benefits')).not.toBeNull()
  })

  it('displays the export email template button', async () => {
    const { queryByRole } = render(
      <QueryClientProvider client={client}>
        <EmailPartsContent>
          <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
        </EmailPartsContent>
      </QueryClientProvider>,
    )
    expect(queryByRole('button', { name: 'Share' })).toBeDefined()
  })

  it('displays the edit preview text field', () => {
    const { baseElement } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    const input = baseElement.querySelector('#edit-preview-text')

    expect(input).not.toBeNull()
  })

  it('renders the preview text', () => {
    const { baseElement } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })

  describe('when restricted', () => {
    beforeEach(() => {
      mockAppMode('KY')
    })

    it('does not have a share dropdown', () => {
      const { queryByRole } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )

      expect(queryByRole('menu', { name: 'Share' })).toBeNull()
    })
  })

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('integrates user info once it has loaded', () => {
      const banner = randomBannerValue()
      const query = {
        ...buildUseQueryResult<CurrentUser>({ data: { banner, ...buildUserShow() } }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(query)

      const { baseElement } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )

      expect(baseElement).toHaveTextContent(banner.primaryText)
    })

    it('displays a spinner when the user info is loading', () => {
      const query = {
        ...buildUseQueryResult<CurrentUser>({ isLoading: true, data: undefined }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(query)

      const { baseElement } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )
      expect(baseElement).toHaveTextContent('Loading your settings')
    })

    it('displays an error when the user info fails to load', () => {
      const error = new Error(faker.lorem.sentence())
      const query = { ...buildUseQueryResult<CurrentUser>({ error, isError: true }), enabled: true }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByText } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTranslation={emailTranslation} emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )
      expect(queryByText(error.message)).not.toBeNull()
    })
  })

  describe('when the email template has an id', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsSignedIn()
      mockAppMode('NJ')
    })

    it('allows users to update the email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={client}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: randomUUID() }}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Update' })).not.toBeNull()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={client}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: randomUUID() }}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
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
        <AuthProvider>
          <QueryClientProvider client={client}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: undefined }}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Update' })).toBeNull()
    })

    it('allows users to save the email template as a new email template', async () => {
      const { queryByRole } = render(
        <AuthProvider>
          <QueryClientProvider client={client}>
            <EmailEditorContent
              emailTranslation={emailTranslation}
              emailTemplate={{ ...emailTemplate, id: undefined }}
            />
          </QueryClientProvider>
        </AuthProvider>,
      )

      expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
    })
  })
})
