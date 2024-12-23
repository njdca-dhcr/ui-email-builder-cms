import { render } from '@testing-library/react'
import React from 'react'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'
import { EmailTranslationSelector } from '..'
import { AVAILABLE_LANGUAGES, EmailTemplate } from 'src/appTypes'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { asMock } from 'src/testHelpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { randomUUID } from 'crypto'
import { useTranslationHasChanges } from 'src/templates/EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'

jest.mock('src/templates/EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges')

describe('EmailTranslationSelector', () => {
  let user: UserEvent
  let client: QueryClient
  const currentEmailTemplateId = 'current-email-template'

  beforeEach(async () => {
    user = userEvent.setup()
    client = new QueryClient()
    asMock(useTranslationHasChanges).mockReturnValue(false)
  })

  const renderSelector = (emailTemplate: EmailTemplate.Unique.Config) => {
    return render(
      <QueryClientProvider client={client}>
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ currentEmailTemplate }) => (
            <>
              <EmailTranslationSelector />
              <template id={currentEmailTemplateId}>
                {JSON.stringify(currentEmailTemplate)}
              </template>
            </>
          )}
        </EmailTemplateState>
      </QueryClientProvider>,
    )
  }

  const getCurrentEmailTemplate = (element: HTMLElement): EmailTemplate.Unique.Config => {
    return JSON.parse(element.querySelector(`#${currentEmailTemplateId}`)!.textContent!)
  }

  describe('languages dropdown', () => {
    it('is the available languages in the current set of translations', async () => {
      const { getByLabelText, queryByRole } = renderSelector(
        buildUniqueEmailConfig({
          translations: [
            buildEmailTranslation({ language: 'english' }),
            buildEmailTranslation({ language: 'spanish' }),
          ],
        }),
      )

      await user.click(getByLabelText('Translation Language'))
      expect(queryByRole('option', { name: 'English' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Spanish' })).not.toBeNull()
    })

    describe('with unsaved changes', () => {
      beforeEach(async () => {
        asMock(useTranslationHasChanges).mockReturnValue(true)
      })

      it('changes the language when the user confirms', async () => {
        jest.spyOn(window, 'confirm').mockReturnValue(true)

        const { getByLabelText, getByRole } = renderSelector(
          buildUniqueEmailConfig({
            translations: [
              buildEmailTranslation({ language: 'english' }),
              buildEmailTranslation({ language: 'spanish' }),
            ],
          }),
        )

        await user.click(getByLabelText('Translation Language'))
        await user.click(getByRole('option', { name: 'Spanish' }))

        expect(window.confirm).toHaveBeenCalled()
        expect(getByLabelText('Translation Language')).toHaveTextContent('Spanish')
      })

      it('does not change the language when the user cancels', async () => {
        jest.spyOn(window, 'confirm').mockReturnValue(false)

        const { getByLabelText, getByRole } = renderSelector(
          buildUniqueEmailConfig({
            translations: [
              buildEmailTranslation({ language: 'english' }),
              buildEmailTranslation({ language: 'spanish' }),
            ],
          }),
        )

        await user.click(getByLabelText('Translation Language'))
        await user.click(getByRole('option', { name: 'Spanish' }))

        expect(window.confirm).toHaveBeenCalled()
        expect(getByLabelText('Translation Language')).toHaveTextContent('English')
      })
    })

    describe('without unsaved changes', () => {
      beforeEach(async () => {
        asMock(useTranslationHasChanges).mockReturnValue(false)
        jest.spyOn(window, 'confirm')
      })

      it('changes the language without confirmation', async () => {
        const { getByLabelText, getByRole } = renderSelector(
          buildUniqueEmailConfig({
            translations: [
              buildEmailTranslation({ language: 'english' }),
              buildEmailTranslation({ language: 'spanish' }),
            ],
          }),
        )

        await user.click(getByLabelText('Translation Language'))
        await user.click(getByRole('option', { name: 'Spanish' }))

        expect(window.confirm).not.toHaveBeenCalled()
        expect(getByLabelText('Translation Language')).toHaveTextContent('Spanish')
      })
    })

    it('renders nothing when there are no translations', async () => {
      const { queryByLabelText } = renderSelector(
        buildUniqueEmailConfig({ translations: undefined }),
      )
      expect(queryByLabelText('Translation Language')).toBeNull()
    })
  })

  describe('new language button', () => {
    it('does not render when all of the languages already exist', async () => {
      const { queryByRole } = renderSelector(
        buildUniqueEmailConfig({
          id: randomUUID(),
          translations: AVAILABLE_LANGUAGES.map((language) => buildEmailTranslation({ language })),
        }),
      )

      const button = queryByRole('button', { name: 'Add Translation' })
      expect(button).toBeNull()
    })

    it('does not render for template library templates', () => {
      const { queryByRole } = renderSelector(
        buildUniqueEmailConfig({
          id: undefined,
        }),
      )

      const button = queryByRole('button', { name: 'Add Translation' })
      expect(button).toBeNull()
    })

    it('renders when there is an available language', async () => {
      const { queryByRole } = renderSelector(
        buildUniqueEmailConfig({
          id: randomUUID(),
          translations: [buildEmailTranslation({ language: 'english' })],
        }),
      )
      const button = queryByRole('button', { name: 'Add Translation' })
      expect(button).not.toBeNull()
    })

    describe('dialog', () => {
      const renderAndOpen = async () => {
        const rendered = renderSelector(
          buildUniqueEmailConfig({
            id: randomUUID(),
            translations: [buildEmailTranslation({ language: 'english' })],
          }),
        )

        await user.click(rendered.getByRole('button', { name: 'Add Translation' }))
        return rendered
      }

      it('uses the selected language and creates a translation for it based on the current translation', async () => {
        const { getByRole, getByLabelText, queryByRole } = await renderAndOpen()

        expect(queryByRole('dialog')).not.toBeNull()

        await user.click(getByLabelText('Language'))
        await user.click(getByRole('option', { name: 'Spanish' }))
        await user.click(getByRole('button', { name: 'Add Translation' }))
        expect(queryByRole('dialog')).toBeNull()

        await user.click(getByLabelText('Translation Language'))
        expect(queryByRole('option', { name: 'English' })).not.toBeNull()
        expect(queryByRole('option', { name: 'Spanish' })).not.toBeNull()
      })

      it('adds translation links to each translation', async () => {
        const { getByRole, getByLabelText, queryByRole, baseElement } = await renderAndOpen()

        expect(queryByRole('dialog')).not.toBeNull()

        await user.click(getByLabelText('Language'))
        await user.click(getByRole('option', { name: 'Spanish' }))
        await user.click(getByRole('button', { name: 'Add Translation' }))

        const currentEmailTemplate = getCurrentEmailTemplate(baseElement)

        currentEmailTemplate.translations!.forEach((translation) => {
          expect(
            translation.components.find(({ kind }) => kind === 'TranslationLinks'),
          ).toBeDefined()
        })
      })
    })
  })
})
