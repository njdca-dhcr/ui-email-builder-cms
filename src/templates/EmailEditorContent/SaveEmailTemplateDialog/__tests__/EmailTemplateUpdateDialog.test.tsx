import { render } from '@testing-library/react'
import React from 'react'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateConfig,
  buildEmailTranslation,
  buildUniqueEmailConfig,
  buildUseMutationResult,
} from 'src/factories'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate, Language } from 'src/appTypes'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { asMock } from 'src/testHelpers'
import { mergeEmailTemplateValues } from '../emailTemplateMergeDefaultValues'
import { randomUUID } from 'crypto'
import { navigate } from 'gatsby'
import { EmailTemplateUpdateDialog } from '../EmailTemplateUpdateDialog'
import { CurrentLanguage } from 'src/templates/CurrentLanguage'

jest.mock('src/network/emailTemplates', () => {
  return { useUpdateEmailTemplate: jest.fn() }
})

jest.mock('../emailTemplateMergeDefaultValues', () => {
  return {
    mergeEmailTemplateValues: jest.fn(),
  }
})

describe('EmailTemplateUpdateDialog', () => {
  let previewText: string
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTemplateChanges: EmailTemplate.Base.Config
  let user: UserEvent
  let language: Language
  let mergedEmailTemplate: EmailTemplate.Unique.Config

  beforeEach(async () => {
    language = 'english'
    previewText = faker.lorem.paragraph()
    emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [buildEmailTranslation({ language, previewText })],
    })
    mergedEmailTemplate = {
      name: 'mocked merged email template values',
    }
    asMock(mergeEmailTemplateValues).mockReturnValue(mergedEmailTemplate)
    user = userEvent.setup()
  })

  const renderDialog = () => {
    return render(
      <EmailTemplateConfig emailTemplateConfig={emailTemplate}>
        <CurrentLanguage emailTemplateConfig={emailTemplate}>
          {([_language]) => (
            <EmailPartsContent initialData={emailTemplateChanges}>
              <PreviewText emailTemplateConfig={emailTemplate} language={language}>
                <EmailTemplateUpdateDialog />
              </PreviewText>
            </EmailPartsContent>
          )}
        </CurrentLanguage>
      </EmailTemplateConfig>,
    )
  }

  it('has a trigger to open a dialog', async () => {
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult())
    const { queryByRole } = renderDialog()
    const button = queryByRole('button')
    expect(button).toHaveTextContent('Update')
    expect(queryByRole('dialog')).toBeNull()
    await user.click(button!)
    expect(queryByRole('dialog')).not.toBeNull()
  })

  it('updates the email template when submitted', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: emailTemplate.id! } })
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Update' }))
    expect(mutateAsync).toHaveBeenCalledWith(mergedEmailTemplate)
    expect(useUpdateEmailTemplate).toHaveBeenCalledWith(emailTemplate.id!)
  })

  it('does not navigate when successful', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: emailTemplate.id! } })
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Update' }))
    expect(mutateAsync).toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})
