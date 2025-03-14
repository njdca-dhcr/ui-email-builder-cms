import { render } from '@testing-library/react'
import React from 'react'
import { EmailTemplateSaveAsDialog } from '../EmailTemplateSaveAsDialog'
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
import { EmailTemplate, EmailTranslation, Language } from 'src/appTypes'
import { useCreateEmailTemplate } from 'src/network/emailTemplates'
import { asMock } from 'src/testHelpers'
import { randomUUID } from 'crypto'
import { navigate } from 'gatsby'
import { mergeEmailTemplateValues } from '../emailTemplateMergeDefaultValues'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { currentTimestamp } from 'src/utils/currentTimestamp'
import { applyTranslationStructures } from 'src/utils/applyTranslationStructures'

jest.mock('src/network/emailTemplates', () => {
  return { useCreateEmailTemplate: jest.fn() }
})

jest.mock('../emailTemplateMergeDefaultValues', () => {
  return {
    mergeEmailTemplateValues: jest.fn(),
  }
})

jest.mock('src/utils/applyTranslationStructures')

describe('EmailTemplateSaveAsDialog', () => {
  let previewText: string
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTemplateChanges: EmailTemplate.Base.Config
  let user: UserEvent
  let language: Language
  let mergedEmailTemplate: EmailTemplate.Unique.Config
  let appliedTranslationStructuresEmailTemplate: EmailTemplate.Unique.Config
  let emailTranslation: EmailTranslation.Unique
  let groups: { id: string; name: string }[]

  beforeEach(async () => {
    groups = []
    language = 'english'
    previewText = faker.lorem.paragraph()
    emailTemplate = buildUniqueEmailConfig()
    emailTranslation = buildEmailTranslation({ language, previewText })
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [emailTranslation],
    })
    mergedEmailTemplate = {
      name: 'mocked merged email template values',
      versionTimestamp: currentTimestamp(),
    }
    appliedTranslationStructuresEmailTemplate = {
      ...mergedEmailTemplate,
      name: 'mocked applied translation structures email template values',
    }

    asMock(mergeEmailTemplateValues).mockReturnValue(mergedEmailTemplate)
    asMock(applyTranslationStructures).mockReturnValue(appliedTranslationStructuresEmailTemplate)
    user = userEvent.setup()
  })

  const renderDialog = () => {
    return render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {({ currentTranslation }) => (
          <EmailPartsContent initialData={emailTemplateChanges}>
            <PreviewText emailTranslation={currentTranslation}>
              <EmailTemplateSaveAsDialog groups={groups} />
            </PreviewText>
          </EmailPartsContent>
        )}
      </EmailTemplateState>,
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

  it("has a dropdown for the user's groups", async () => {
    groups = [
      { id: randomUUID(), name: 'Group 1' },
      { id: randomUUID(), name: 'Group 2' },
    ]
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult())
    const { queryByLabelText, queryByRole } = renderDialog()
    await user.click(queryByRole('button')!)
    expect(queryByRole('dialog')).not.toBeNull()
    expect(queryByLabelText('Group')).not.toBeNull()
  })

  it('creates a new email template when submitted', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: randomUUID() } })
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Create' }))
    expect(mergeEmailTemplateValues).toHaveBeenCalled()
    expect(applyTranslationStructures).toHaveBeenCalledWith(mergedEmailTemplate)
    expect(mutateAsync).toHaveBeenCalledWith(appliedTranslationStructuresEmailTemplate)
    expect(useCreateEmailTemplate).toHaveBeenCalled()
  })

  it('navigates to the new email template show page when successful', async () => {
    const newEmaiilTemplateId = randomUUID()
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: { id: newEmaiilTemplateId } })
    asMock(useCreateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Create' }))
    expect(mutateAsync).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith(`/email-templates/${newEmaiilTemplateId}`)
  })
})
