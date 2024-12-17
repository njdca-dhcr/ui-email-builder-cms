import { render } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { AVAILABLE_LANGUAGES, EmailTemplate } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailConfig,
  buildUseMutationResult,
} from 'src/factories'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { EmailTranslationSelector } from '..'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { asMock, buildUniqueEmailComponent } from 'src/testHelpers'

jest.mock('src/network/emailTemplates', () => {
  return { useUpdateEmailTemplate: jest.fn() }
})

describe('DeleteTranslationDialog', () => {
  let user: UserEvent
  let client: QueryClient
  let emailTemplateInEnglish: EmailTemplate.Unique.Config
  let emailTemplateWithTranslation: EmailTemplate.Unique.Config

  beforeEach(() => {
    user = userEvent.setup()
    client = new QueryClient()
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult())
  })

  const renderSelector = (emailTemplate: EmailTemplate.Unique.Config) => {
    return render(
      <QueryClientProvider client={client}>
        <EmailTemplateState emailTemplate={emailTemplate}>
          {() => <EmailTranslationSelector />}
        </EmailTemplateState>
        ,
      </QueryClientProvider>,
    )
  }

  it('does not render for the english translation', () => {
    emailTemplateInEnglish = buildUniqueEmailConfig({
      translations: [buildEmailTranslation({ language: 'english' })],
    })
    const { queryByRole } = renderSelector(emailTemplateInEnglish)
    const button = queryByRole('button', { name: 'Delete Translation' })
    expect(button).toBeNull()
  })

  it('renders for non-english translations', async () => {
    emailTemplateWithTranslation = buildUniqueEmailConfig({
      translations: AVAILABLE_LANGUAGES.map((language) => buildEmailTranslation({ language })),
    })
    const { queryByRole, getByLabelText, getByRole } = renderSelector(emailTemplateWithTranslation)
    await user.click(getByLabelText('Translation Language'))
    await user.click(getByRole('option', { name: 'Spanish' }))

    const button = queryByRole('button', { name: 'Delete Current Translation' })
    expect(button).not.toBeNull()
  })

  describe('dialog', () => {
    beforeEach(async () => {
      emailTemplateWithTranslation = buildUniqueEmailConfig({
        translations: AVAILABLE_LANGUAGES.map((language) =>
          buildEmailTranslation({
            language,
            components: [
              buildUniqueEmailComponent('Banner'),
              buildUniqueEmailComponent('TranslationLinks'),
            ],
          }),
        ),
      })
    })

    const renderAndOpen = async (emailTemplate: EmailTemplate.Unique.Config) => {
      const rendered = renderSelector(emailTemplate)
      await user.click(rendered.getByLabelText('Translation Language'))
      await user.click(rendered.getByRole('option', { name: 'Spanish' }))
      await user.click(rendered.getByRole('button', { name: 'Delete Current Translation' }))

      return rendered
    }

    describe('when confirming deletion', () => {
      it('calls the updateEmailTemplate mutation when the dialog is confirmed', async () => {
        const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: emailTemplateInEnglish })
        asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

        const { getByRole } = await renderAndOpen(emailTemplateWithTranslation)
        await user.click(getByRole('button', { name: 'Delete Translation' }))
        expect(mutateAsync).toHaveBeenCalled()
      })

      it('removes the current translation from the email template', async () => {
        const { getByRole } = await renderAndOpen(emailTemplateWithTranslation)
        await user.click(getByRole('button', { name: 'Delete Translation' }))
        expect(emailTemplateWithTranslation.translations).toHaveLength(
          AVAILABLE_LANGUAGES.length - 1,
        )
      })

      it('sets the current language to english', async () => {
        const { getByLabelText, getByRole } = await renderAndOpen(emailTemplateWithTranslation)

        await user.click(getByRole('button', { name: 'Delete Translation' }))
        expect(await getByLabelText('Translation Language')).toHaveTextContent('English')
      })

      it('removes translation links from the last translation if there is only one translation left', async () => {
        const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: emailTemplateInEnglish })
        asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

        const { getByRole } = await renderAndOpen(emailTemplateWithTranslation)

        await user.click(getByRole('button', { name: 'Delete Translation' }))
        expect(mutateAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            ...emailTemplateWithTranslation,
            translations: [
              expect.objectContaining({
                components: [emailTemplateWithTranslation.translations![0].components[0]],
              }),
            ],
          }),
        )
      })
    })

    describe('when cancelling deletion', () => {
      it('does not call mutateAsync', async () => {
        const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: emailTemplateInEnglish })
        asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

        const { queryByRole, getByRole } = await renderAndOpen(emailTemplateWithTranslation)
        await user.click(getByRole('button', { name: 'Cancel' }))
        expect(mutateAsync).not.toHaveBeenCalled()
      })

      it('does not delete the current translation', async () => {
        const { queryByRole, getByRole } = await renderAndOpen(emailTemplateWithTranslation)
        await user.click(getByRole('button', { name: 'Cancel' }))
        expect(queryByRole('dialog')).toBeNull()
        expect(emailTemplateWithTranslation.translations).toHaveLength(AVAILABLE_LANGUAGES.length)
      })

      it('stays on the current translation', async () => {
        const { getByLabelText, getByRole } = await renderAndOpen(emailTemplateWithTranslation)
        await user.click(getByRole('button', { name: 'Cancel' }))
        expect(await getByLabelText('Translation Language')).toHaveTextContent('Spanish')
      })
    })
  })
})
