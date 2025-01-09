import React from 'react'
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
  randomBannerValue,
  userIsSignedIn,
} from 'src/testHelpers'
import { EmailEditorContent, Props } from '..'
import { useRenderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'
import { CurrentUserEmailConfig } from 'src/network/users'
import { AuthProvider } from 'src/utils/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/utils/download')
jest.mock('src/templates/emailHtmlDocument/renderEmailTranslationToString')

describe('EmailEditorContent', () => {
  let emailTranslation: EmailTranslation.Unique
  let emailTemplate: EmailTemplate.Unique.Config
  let alertSpy: jest.SpyInstance
  let mockRenderEmailToString: jest.Mock
  let currentUser: CurrentUserEmailConfig

  beforeEach(() => {
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
    userIsSignedIn()
    mockRenderEmailToString = jest.fn()
    asMock(useRenderEmailTranslationToString).mockReturnValue(mockRenderEmailToString)
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  const renderComponent = (options?: Partial<Props>) => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <EmailEditorContent
            emailTranslation={emailTranslation}
            emailTemplate={emailTemplate}
            currentUser={currentUser}
            preview="desktop"
            actions={null}
            {...options}
          />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  it('displays the email components and subcomponents', () => {
    const { queryByText } = renderComponent()
    expect(queryByText('Title')).not.toBeNull()
    expect(queryByText('Dependency Benefits')).not.toBeNull()
  })

  it('displays the edit preview text field', () => {
    const { baseElement } = renderComponent()
    const input = baseElement.querySelector('#edit-preview-text')

    expect(input).not.toBeNull()
  })

  it('renders the preview text', () => {
    const { baseElement } = renderComponent()
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })

  it('integrates the current user configuration', () => {
    const banner = randomBannerValue()
    const { baseElement } = renderComponent({ currentUser: { ...currentUser, banner } })

    expect(baseElement).toHaveTextContent(banner.primaryText)
  })

  describe('actions', () => {
    it('displays actions when given', async () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = renderComponent({ actions: <p>{text}</p> })

      const previewActions = baseElement.querySelector('.email-preview-actions')

      expect(previewActions).toBeDefined()
      expect(previewActions!.querySelector('.email-preview-actions-inner')).toBeTruthy()
      expect(previewActions).toContainHTML(`<p>${text}</p>`)
    })

    it('does not display actions when none are given', async () => {
      const { baseElement } = renderComponent({ actions: null })

      const previewActions = baseElement.querySelector('.email-preview-actions')

      expect(previewActions).toBeDefined()
      expect(previewActions!.querySelector('.email-preview-actions-inner')).toBeFalsy()
    })
  })

  describe('preview mode', () => {
    it('can be previewed in desktop mode', async () => {
      const { baseElement } = renderComponent({ preview: 'desktop' })

      expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
      expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()
    })

    it('can be previewed in mobile mode', async () => {
      const { baseElement } = renderComponent({ preview: 'mobile' })

      expect(baseElement.querySelector('.email-preview-desktop')).toBeNull()
      expect(baseElement.querySelector('.email-preview-mobile')).not.toBeNull()
    })
  })

  describe('when read only', () => {
    const renderReadOnly = () => {
      return renderComponent({ readOnly: true })
    }

    it('has read only fields', async () => {
      const { baseElement } = renderReadOnly()
      expect(baseElement!.querySelectorAll('[readonly]').length).toBeGreaterThan(0)
    })

    it('renders the preview text as read only', async () => {
      const { baseElement } = renderReadOnly()
      expect(baseElement.querySelector('.edit-preview-text textarea[readonly]')).not.toBeNull()
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
})
