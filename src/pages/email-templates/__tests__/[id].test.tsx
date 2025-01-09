import React from 'react'
import { render } from '@testing-library/react'
import EmailTemplateShowPage, { Props } from '../[id]'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUseMutationResult,
  buildUseQueryResult,
  mockAppMode,
  userIsSignedIn,
} from 'src/testHelpers'
import {
  useEmailTemplate,
  EmailTemplateShow,
  useUpdateEmailTemplate,
  useCreateEmailTemplate,
} from 'src/network/emailTemplates'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import userEvent, { UserEvent } from '@testing-library/user-event'

jest.mock('src/network/emailTemplates')
jest.mock('src/templates/EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges')

describe('Email Template Show Page', () => {
  beforeEach(async () => {
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult())
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult())
  })

  const renderEmailTemplateShowPage = (props?: Partial<Props>) => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <EmailTemplateShowPage
            pageContext={null}
            uri=""
            path=""
            location={{} as any}
            pageResources={{} as any}
            params={{ id: faker.lorem.word() }}
            children={undefined}
            data={null}
            serverData={{}}
            {...props}
          />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
    asMock(useEmailTemplate).mockReturnValue(query)
    const { baseElement } = renderEmailTemplateShowPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('loads the correct email template', () => {
    const emailTemplateId = randomUUID()
    const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
    asMock(useEmailTemplate).mockReturnValue(query)
    renderEmailTemplateShowPage({ params: { id: emailTemplateId } })
    expect(useEmailTemplate).toHaveBeenCalledWith(emailTemplateId)
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
      asMock(useEmailTemplate).mockReturnValue(query)
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText('Loading your email template')).not.toBeNull()
    })

    it('does not display a language selector', async () => {
      const { queryByLabelText } = renderEmailTemplateShowPage()
      expect(queryByLabelText('Translation Language')).toBeNull()
    })
  })

  describe('when successful', () => {
    let emailTemplate: EmailTemplateShow
    let title: string
    let previewText: string

    beforeEach(() => {
      title = faker.lorem.words(3)
      previewText = faker.lorem.paragraph()
      emailTemplate = {
        id: randomUUID(),
        ...buildUniqueEmailConfig({
          translations: [
            buildEmailTranslation({
              language: 'english',
              previewText,
              components: [
                buildUniqueEmailComponent('Header', {
                  subComponents: [
                    buildUniqueEmailSubComponent({
                      kind: 'Title',
                      defaultValue: { title },
                    }),
                  ],
                }),
              ],
            }),
            buildEmailTranslation({
              language: 'spanish',
              previewText,
              components: [
                buildUniqueEmailComponent('Header', {
                  subComponents: [
                    buildUniqueEmailSubComponent({
                      kind: 'Title',
                      defaultValue: { title: faker.lorem.word() },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }
      const query = buildUseQueryResult({ data: emailTemplate })
      asMock(useEmailTemplate).mockReturnValue(query)
    })

    it('displays the email template', () => {
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText(emailTemplate.name)).not.toBeNull()
    })

    it('displays the EmailEditorContent', () => {
      const { baseElement } = renderEmailTemplateShowPage()
      const h1 = baseElement.querySelector('h1[contenteditable="true"]')
      expect(h1).not.toBeNull()
      expect(h1).toHaveTextContent(title)
    })

    it('can display the email in desktop or mobile', async () => {
      const user = userEvent.setup()
      const { baseElement, getByLabelText } = renderEmailTemplateShowPage()

      expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
      expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()

      await user.click(getByLabelText('Mobile'))

      expect(baseElement.querySelector('.email-preview-desktop')).toBeNull()
      expect(baseElement.querySelector('.email-preview-mobile')).not.toBeNull()

      await user.click(getByLabelText('Desktop'))
      expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
      expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()
    })

    it('displays the EmailEditorSidebar', () => {
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText('Back')).not.toBeNull()
    })

    it('displays a language selector', async () => {
      const { queryByLabelText } = renderEmailTemplateShowPage()
      expect(queryByLabelText('Translation Language')).not.toBeNull()
    })

    it('loads the saved preview text', () => {
      const { getByLabelText } = renderEmailTemplateShowPage()
      const textarea: HTMLTextAreaElement = getByLabelText('Preview Text') as any
      expect(textarea).toHaveValue(previewText)
    })

    describe('when restricted', () => {
      beforeEach(() => {
        mockAppMode('KY')
      })

      it('does not have a share dropdown', () => {
        const { queryByRole } = renderEmailTemplateShowPage()

        expect(queryByRole('menu', { name: 'Share' })).toBeNull()
      })
    })

    describe('saving and sharing', () => {
      it('allows users to update the email template', async () => {
        const { queryByRole } = renderEmailTemplateShowPage()

        expect(queryByRole('button', { name: 'Update' })).toBeTruthy()
      })

      it('allows users to save the email template as a new email template', async () => {
        const { queryByRole } = renderEmailTemplateShowPage()

        expect(queryByRole('button', { name: 'Save As' })).toBeTruthy()
      })

      it('displays the export email template button', async () => {
        const { queryByRole } = renderEmailTemplateShowPage()

        expect(queryByRole('button', { name: 'Share' })).toBeTruthy()
      })
    })

    describe('translation mode', () => {
      let user: UserEvent

      beforeEach(async () => {
        user = userEvent.setup()
        asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult())
      })

      const renderEmailTemplateShowPageInTranslationMode = async () => {
        const rendered = renderEmailTemplateShowPage()

        await user.click(rendered.getByLabelText('Translation Language'))
        await user.click(rendered.getByRole('option', { name: 'Spanish' }))
        return rendered
      }

      it('displays two translations in translation mode', async () => {
        const { baseElement } = await renderEmailTemplateShowPageInTranslationMode()
        expect(baseElement.querySelectorAll('.email-editor-content')).toHaveLength(2)
      })

      it('is possible to exit translation mode', async () => {
        const { queryByRole } = await renderEmailTemplateShowPageInTranslationMode()
        expect(queryByRole('button', { name: 'Edit Original Email' })).not.toBeNull()
      })

      it('has a read only version of the original translation', async () => {
        const { baseElement } = await renderEmailTemplateShowPageInTranslationMode()
        const originalTranslationContainer = baseElement.querySelector('.original-translation')

        expect(originalTranslationContainer).toBeTruthy()
        expect(originalTranslationContainer!.querySelectorAll('[readonly]').length).toBeGreaterThan(
          0,
        )
      })

      it('has a writable version of the other translation', async () => {
        const { baseElement } = await renderEmailTemplateShowPageInTranslationMode()
        const otherTranslationContainer = baseElement.querySelector('.translation')

        expect(otherTranslationContainer).toBeTruthy()
        expect(
          otherTranslationContainer!.querySelectorAll('[contenteditable="true"]').length,
        ).toBeGreaterThan(0)
      })

      it('can display the email in desktop or mobile', async () => {
        const user = userEvent.setup()
        const { baseElement, getByLabelText } = await renderEmailTemplateShowPageInTranslationMode()

        expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(2)
        expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(0)

        await user.click(getByLabelText('Mobile'))

        expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(0)
        expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(2)

        await user.click(getByLabelText('Desktop'))
        expect(baseElement.querySelectorAll('.email-preview-desktop')).toHaveLength(2)
        expect(baseElement.querySelectorAll('.email-preview-mobile')).toHaveLength(0)
      })

      describe('saving and sharing', () => {
        it('allows users to update the email template', async () => {
          const { queryByRole } = await renderEmailTemplateShowPageInTranslationMode()

          expect(queryByRole('button', { name: 'Update' })).not.toBeNull()
        })

        it('allows users to save the email template as a new email template', async () => {
          const { queryByRole } = await renderEmailTemplateShowPageInTranslationMode()

          expect(queryByRole('button', { name: 'Save As' })).not.toBeNull()
        })

        it('displays the export email template button', async () => {
          const { queryByRole } = await renderEmailTemplateShowPageInTranslationMode()

          expect(queryByRole('button', { name: 'Share' })).toBeDefined()
        })
      })
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      userIsSignedIn()
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<EmailTemplateShow>({ error, isError: true })
      asMock(useEmailTemplate).mockReturnValue(query)
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
