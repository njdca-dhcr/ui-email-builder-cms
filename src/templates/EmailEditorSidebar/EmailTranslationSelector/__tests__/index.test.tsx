import { render } from '@testing-library/react'
import React from 'react'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'
import { EmailTranslationSelector } from '..'
import { AVAILABLE_LANGUAGES, EmailTemplate } from 'src/appTypes'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { hasUnsavedChanges } from 'src/utils/hasUnsavedChanges'
import { asMock } from 'src/testHelpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { randomUUID } from 'crypto'

jest.mock('src/utils/hasUnsavedChanges')

describe('EmailTranslationSelector', () => {
  let user: UserEvent
  let client: QueryClient

  beforeEach(async () => {
    user = userEvent.setup()
    client = new QueryClient()
  })

  const renderSelector = (emailTemplate: EmailTemplate.Unique.Config) => {
    return render(
      <QueryClientProvider client={client}>
        <EmailTemplateState emailTemplate={emailTemplate}>
          {() => <EmailTranslationSelector />}
        </EmailTemplateState>
      </QueryClientProvider>,
    )
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

    it('changes the language when there are no unsaved changes', async () => {
      asMock(hasUnsavedChanges).mockReturnValue(false)
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

      expect(hasUnsavedChanges).toHaveBeenCalled()
      expect(window.confirm).not.toHaveBeenCalled()
      expect(getByLabelText('Translation Language')).toHaveTextContent('Spanish')
    })

    it('changes the language when the user confirms', async () => {
      asMock(hasUnsavedChanges).mockReturnValue(true)
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

      expect(hasUnsavedChanges).toHaveBeenCalled()
      expect(window.confirm).toHaveBeenCalled()
      expect(getByLabelText('Translation Language')).toHaveTextContent('Spanish')
    })

    it('does not change the language when the user cancels', async () => {
      asMock(hasUnsavedChanges).mockReturnValue(true)
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

      expect(hasUnsavedChanges).toHaveBeenCalled()
      expect(window.confirm).toHaveBeenCalled()
      expect(getByLabelText('Translation Language')).toHaveTextContent('English')
    })

    it('changes the current language when an option is selected', async () => {
      asMock(hasUnsavedChanges).mockReturnValue(false)
      const { getByLabelText, getByRole } = renderSelector(
        buildUniqueEmailConfig({
          translations: [
            buildEmailTranslation({ language: 'english' }),
            buildEmailTranslation({ language: 'spanish' }),
          ],
        }),
      )

      const button = getByLabelText('Translation Language')
      expect(button).toHaveTextContent('English')

      await user.click(button)
      await user.click(getByRole('option', { name: 'Spanish' }))

      expect(getByLabelText('Translation Language')).toHaveTextContent('Spanish')
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
    })
  })
})
