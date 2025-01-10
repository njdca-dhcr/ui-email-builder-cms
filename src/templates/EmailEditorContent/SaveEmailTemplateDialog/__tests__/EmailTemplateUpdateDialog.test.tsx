import { render } from '@testing-library/react'
import React, { FC } from 'react'
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
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { asMock } from 'src/testHelpers'
import { mergeEmailTemplateValues } from '../emailTemplateMergeDefaultValues'
import { randomUUID } from 'crypto'
import { navigate } from 'gatsby'
import { EmailTemplateUpdateDialog } from '../EmailTemplateUpdateDialog'
import { EmailTemplateState, useCurrentEmailTemplate } from 'src/utils/EmailTemplateState'
import { applyTranslationStructures } from 'src/utils/applyTranslationStructures'

jest.mock('src/network/emailTemplates', () => {
  return { useUpdateEmailTemplate: jest.fn() }
})

jest.mock('../emailTemplateMergeDefaultValues', () => {
  return {
    mergeEmailTemplateValues: jest.fn(),
  }
})

jest.mock('src/utils/applyTranslationStructures')

describe('EmailTemplateUpdateDialog', () => {
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
    emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
    emailTranslation = buildEmailTranslation({ language, previewText })
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [emailTranslation],
    })
    mergedEmailTemplate = buildUniqueEmailConfig({
      id: emailTemplate.id,
      name: 'mocked merged email template values',
    })
    appliedTranslationStructuresEmailTemplate = {
      ...mergedEmailTemplate,
      name: 'mocked applied translation structures email template values',
    }

    asMock(mergeEmailTemplateValues).mockReturnValue(mergedEmailTemplate)
    asMock(applyTranslationStructures).mockReturnValue(appliedTranslationStructuresEmailTemplate)
    user = userEvent.setup()
  })

  const Dummy: FC = () => {
    const [emailTemplate] = useCurrentEmailTemplate()
    return <span>{emailTemplate.name}</span>
  }

  const renderDialog = () => {
    return render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {({ currentTranslation }) => (
          <EmailPartsContent initialData={emailTemplateChanges}>
            <PreviewText emailTranslation={currentTranslation}>
              <EmailTemplateUpdateDialog groups={groups} />
              <Dummy />
            </PreviewText>
          </EmailPartsContent>
        )}
      </EmailTemplateState>,
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

  it("has a dropdown for the user's groups", async () => {
    groups = [
      { id: randomUUID(), name: 'Group 1' },
      { id: randomUUID(), name: 'Group 2' },
    ]
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult())
    const { queryByLabelText, queryByRole } = renderDialog()
    await user.click(queryByRole('button')!)
    expect(queryByRole('dialog')).not.toBeNull()
    expect(queryByLabelText('Group')).not.toBeNull()
  })

  it('updates the email template when submitted', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: mergedEmailTemplate })
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Update' }))
    expect(mergeEmailTemplateValues).toHaveBeenCalled()
    expect(applyTranslationStructures).toHaveBeenCalledWith(mergedEmailTemplate)
    expect(mutateAsync).toHaveBeenCalledWith(appliedTranslationStructuresEmailTemplate)
    expect(useUpdateEmailTemplate).toHaveBeenCalledWith(emailTemplate.id!)
  })

  it('does not navigate when successful', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: mergedEmailTemplate })
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Update' }))
    expect(mutateAsync).toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })

  it('resets the current email template with result', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ emailTemplate: mergedEmailTemplate })
    asMock(useUpdateEmailTemplate).mockReturnValue(buildUseMutationResult({ mutateAsync }))

    const { getByRole, baseElement } = renderDialog()
    await user.click(getByRole('button'))

    expect(mutateAsync).not.toHaveBeenCalled()
    expect(baseElement).not.toHaveTextContent(mergedEmailTemplate.name)
    await user.click(getByRole('button', { name: 'Update' }))
    expect(mutateAsync).toHaveBeenCalled()
    expect(baseElement).toHaveTextContent(mergedEmailTemplate.name)
  })
})
