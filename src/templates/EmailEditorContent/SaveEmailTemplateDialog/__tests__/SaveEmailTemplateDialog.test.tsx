import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { SaveEmailTemplateDialog } from '../SaveEmailTemplateDialog'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate, Language } from 'src/appTypes'
import {
  buildEmailTemplateConfig,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
} from 'src/factories'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'
import { randomUUID } from 'crypto'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { currentTimestamp } from 'src/utils/currentTimestamp'
import { asMock } from 'src/testHelpers'

jest.mock('src/utils/currentTimestamp')

describe('SaveEmailTemplateDialog', () => {
  let description: string
  let errorMessage: string | undefined
  let loading: boolean
  let loadingMessage: string
  let mutate: jest.Mock
  let onSuccess: jest.Mock
  let submitButtonText: string
  let title: string
  let trigger: string
  let previewText: string
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTemplateChanges: EmailTemplate.Base.Config
  let language: Language
  let user: UserEvent
  let emailPartsContent: Record<string, any>
  let versionTimestamp: string
  let groups: { id: string; name: string }[] | undefined

  beforeEach(async () => {
    language = 'english'
    description = faker.lorem.paragraph()
    errorMessage = undefined
    loading = false
    loadingMessage = faker.lorem.paragraph()
    mutate = jest.fn()
    onSuccess = jest.fn()
    submitButtonText = faker.lorem.words(3)
    title = faker.lorem.words(5)
    trigger = faker.lorem.words(2)
    previewText = faker.lorem.paragraph()
    const nameComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const originalTranslation = buildEmailTranslation({
      language,
      previewText,
      components: [nameComponent],
    })
    const newName = 'new name'
    const newTranslation = buildEmailTranslation({
      language,
      previewText,
      components: [{ ...nameComponent, defaultValue: { name: newName }, subComponents: [] }],
    })
    emailTemplate = buildUniqueEmailConfig({ translations: [originalTranslation] })
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [newTranslation],
    })
    emailPartsContent = { [nameComponent.id]: { name: newName } }
    user = userEvent.setup()
    versionTimestamp = faker.lorem.word()
    asMock(currentTimestamp).mockReturnValue(versionTimestamp)
  })

  it('displays its trigger', async () => {
    const { queryByRole } = render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {({ currentTranslation }) => (
          <EmailPartsContent initialData={emailTemplateChanges}>
            <PreviewText emailTranslation={currentTranslation}>
              <SaveEmailTemplateDialog
                description={description}
                errorMessage={errorMessage}
                loading={loading}
                loadingMessage={loadingMessage}
                mutate={mutate}
                onSuccess={onSuccess}
                submitButtonText={submitButtonText}
                title={title}
                trigger={trigger}
              />
            </PreviewText>
          </EmailPartsContent>
        )}
      </EmailTemplateState>,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveClass('save-email-template-dialog-trigger')
    expect(button).toHaveTextContent(trigger)
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const result = render(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ currentTranslation }) => (
            <EmailPartsContent initialData={emailPartsContent}>
              <PreviewText emailTranslation={currentTranslation}>
                <SaveEmailTemplateDialog
                  description={description}
                  errorMessage={errorMessage}
                  loading={loading}
                  loadingMessage={loadingMessage}
                  mutate={mutate}
                  onSuccess={onSuccess}
                  submitButtonText={submitButtonText}
                  title={title}
                  trigger={trigger}
                  groups={groups}
                />
              </PreviewText>
            </EmailPartsContent>
          )}
        </EmailTemplateState>,
      )
      await user.click(result.getByRole('button'))
      return result
    }

    it('displays its title', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(title)).not.toBeNull()
    })

    it('displays its description', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(description)).not.toBeNull()
    })

    describe('groups', () => {
      it('does not display the group field when the user lacks groups', async () => {
        const { queryByLabelText } = await renderAndOpen()
        expect(queryByLabelText('Group')).toBeNull()
      })

      it('displays the group field options when the user has groups', async () => {
        groups = [
          { id: randomUUID(), name: faker.lorem.word() },
          { id: randomUUID(), name: faker.lorem.word() },
        ]
        const { queryByRole, queryByLabelText } = await renderAndOpen()
        const groupSelect = queryByLabelText('Group')
        expect(groupSelect).not.toBeNull()
        await user.click(groupSelect!)
        expect(queryByRole('option', { name: 'None' })).not.toBeNull()
        expect(queryByRole('option', { name: groups[0].name })).not.toBeNull()
        expect(queryByRole('option', { name: groups[1].name })).not.toBeNull()
      })
    })

    it('displays the given error message', async () => {
      errorMessage = faker.lorem.paragraph()
      const { queryByText } = await renderAndOpen()
      expect(queryByText(errorMessage)).not.toBeNull()
    })

    describe('loading', () => {
      it('displays the loading message when loading', async () => {
        loading = true
        const { queryByRole } = await renderAndOpen()
        const loadingAlert = queryByRole('alert')
        expect(loadingAlert).not.toBeNull()
        expect(loadingAlert).toHaveTextContent(loadingMessage)
      })

      it('does not display the loading message when not loading', async () => {
        loading = false
        const { queryByRole } = await renderAndOpen()
        const loadingAlert = queryByRole('alert')
        expect(loadingAlert).toBeNull()
      })
    })

    it('calls mutate when the form is submitted', async () => {
      groups = [
        { id: randomUUID(), name: faker.lorem.word() },
        { id: randomUUID(), name: faker.lorem.word() },
      ]

      const { baseElement, getByLabelText, getByRole } = await renderAndOpen()
      mutate.mockResolvedValue({ emailTemplate: { id: randomUUID() } })
      await user.clear(getByLabelText('Name'))
      await user.type(getByLabelText('Name'), emailTemplateChanges.name)
      await user.clear(getByLabelText('Description'))
      await user.type(getByLabelText('Description'), emailTemplateChanges.description!)
      await user.type(getByLabelText('Tags'), 'tag')
      await user.click(getByLabelText('Group'))
      await user.click(getByRole('option', { name: groups[0].name }))

      const form = baseElement.querySelector('form')
      expect(form).not.toBeNull()

      const button = form!.querySelector('button[type="submit"]')
      expect(button).not.toBeNull()
      expect(button).toHaveTextContent(submitButtonText)

      expect(mutate).not.toHaveBeenCalled()
      await user.click(button!)
      expect(mutate).toHaveBeenCalledWith({
        ...emailTemplateChanges,
        versionTimestamp,
        tagNames: ['tag'],
        groupId: groups[0].id,
      })
    })

    describe('submitting when removing the group id', () => {
      it('submits the template with no group id', async () => {
        groups = [
          { id: randomUUID(), name: faker.lorem.word() },
          { id: randomUUID(), name: faker.lorem.word() },
        ]
        emailTemplate.groupId = groups[0].id

        const { baseElement, getByLabelText, getByRole } = await renderAndOpen()
        mutate.mockResolvedValue({ emailTemplate: { id: randomUUID() } })
        await user.clear(getByLabelText('Name'))
        await user.type(getByLabelText('Name'), emailTemplateChanges.name)
        await user.clear(getByLabelText('Description'))
        await user.type(getByLabelText('Description'), emailTemplateChanges.description!)
        await user.type(getByLabelText('Tags'), 'tag')
        await user.click(getByLabelText('Group'))
        await user.click(getByRole('option', { name: 'None' }))

        const form = baseElement.querySelector('form')
        expect(form).not.toBeNull()

        const button = form!.querySelector('button[type="submit"]')
        expect(button).not.toBeNull()
        expect(button).toHaveTextContent(submitButtonText)

        expect(mutate).not.toHaveBeenCalled()
        await user.click(button!)
        expect(mutate).toHaveBeenCalledWith({
          ...emailTemplateChanges,
          versionTimestamp,
          tagNames: ['tag'],
          groupId: '',
        })
      })
    })

    describe('submission with errors', () => {
      it('displays the inline errors', async () => {
        const { baseElement } = await renderAndOpen()
        const nameError = faker.lorem.words(4)
        mutate.mockResolvedValue({ errors: { name: nameError } })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(baseElement).toHaveTextContent(nameError)
      })

      it('does not call onSuccess', async () => {
        const { baseElement } = await renderAndOpen()
        const nameError = faker.lorem.words(4)
        mutate.mockResolvedValue({ errors: { name: nameError } })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(onSuccess).not.toHaveBeenCalled()
      })
    })

    describe('submission without errors', () => {
      it('calls onSuccess', async () => {
        const { baseElement } = await renderAndOpen()
        const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
        mutate.mockResolvedValue({ emailTemplate: emailTemplate })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(onSuccess).toHaveBeenCalledWith(emailTemplate)
      })

      it('calls closes the dialog', async () => {
        const { baseElement } = await renderAndOpen()
        const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
        mutate.mockResolvedValue({ emailTemplate })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(baseElement.querySelector('form')).toBeNull()
      })
    })
  })
})
