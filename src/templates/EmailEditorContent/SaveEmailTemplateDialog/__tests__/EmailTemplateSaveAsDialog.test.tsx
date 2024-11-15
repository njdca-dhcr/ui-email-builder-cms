import { render } from '@testing-library/react'
import React from 'react'
import { EmailTemplateSaveAsDialog } from '../EmailTemplateSaveAsDialog'
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
import { useCreateEmailTemplate } from 'src/network/emailTemplates'
import { asMock } from 'src/testHelpers'
import { emailTemplateMergeDefaultValues } from '../emailTemplateMergeDefaultValues'
import { randomUUID } from 'crypto'
import { navigate } from 'gatsby'
import { CurrentLanguage } from 'src/templates/CurrentLanguage'

jest.mock('src/network/emailTemplates', () => {
  return { useCreateEmailTemplate: jest.fn() }
})

describe('EmailTemplateSaveAsDialog', () => {
  let previewText: string
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTemplateChanges: EmailTemplate.Base.Config
  let user: UserEvent
  let language: Language

  beforeEach(async () => {
    language = 'english'
    previewText = faker.lorem.paragraph()
    emailTemplate = buildUniqueEmailConfig()
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [buildEmailTranslation({ language })],
    })
    user = userEvent.setup()
  })

  const renderDialog = () => {
    return render(
      <EmailTemplateConfig emailTemplateConfig={emailTemplate}>
        <CurrentLanguage emailTemplateConfig={emailTemplate}>
          {([_language]) => (
            <EmailPartsContent initialData={emailTemplateChanges}>
              <PreviewText initialValue={previewText}>
                <EmailTemplateSaveAsDialog />
              </PreviewText>
            </EmailPartsContent>
          )}
        </CurrentLanguage>
      </EmailTemplateConfig>,
    )
  }

  it('has a trigger to open a dialog', async () => {
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult())
    const { queryByRole } = renderDialog()
    const button = queryByRole('button')
    expect(button).toHaveTextContent('Save As')
    expect(queryByRole('dialog')).toBeNull()
    await user.click(button!)
    expect(queryByRole('dialog')).not.toBeNull()
  })

  it('creates a new email template when submitted', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: randomUUID() } })
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Create' }))
    expect(mutateAsync).toHaveBeenCalledWith({
      ...emailTemplateMergeDefaultValues(emailTemplate, emailTemplateChanges, language),
      previewText,
      tagNames: [],
    })
  })

  it('navigates to /my-library when successful', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: randomUUID() } })
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Create' }))
    expect(mutateAsync).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/my-library')
  })
})
