import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { SaveEmailTemplate, emailTemplateMergeDefaultValues } from '../SaveEmailTemplate'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { DateRangeValue, EmailTemplate, NameValue } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUseMutationResult,
} from 'src/factories'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { navigate } from 'gatsby'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'
import { useCreateOrUpdateEmailTemplate } from 'src/network/emailTemplates'
import { randomUUID } from 'crypto'

jest.mock('src/network/emailTemplates', () => {
  return { useCreateOrUpdateEmailTemplate: jest.fn() }
})

describe('SaveEmailTemplate', () => {
  let user: UserEvent
  let emailTemplateConfig: EmailTemplate.UniqueConfig
  let nameComponent: EmailTemplate.Name

  beforeEach(() => {
    user = userEvent.setup()
    nameComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    emailTemplateConfig = buildUniqueEmailConfig({
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      previewText: faker.lorem.sentence(),
      components: [nameComponent],
    })
    userIsSignedIn()
  })

  describe('when closed', () => {
    beforeEach(() => {
      const mutationResult =
        buildUseMutationResult<ReturnType<typeof useCreateOrUpdateEmailTemplate>>()
      asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
    })

    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          <SaveEmailTemplate />
        </EmailTemplateConfig>,
      )
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: 'Save' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    let newNameComponentValue: NameValue
    let newPreviewText: string

    beforeEach(() => {
      newNameComponentValue = { name: faker.lorem.sentence() }
      newPreviewText = faker.lorem.paragraph()
    })

    const renderAndOpen = async () => {
      const rendered = render(
        <PreviewText initialValue={newPreviewText}>
          <EmailPartsContent initialData={{ [nameComponent.id]: newNameComponentValue }}>
            <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
              <SaveEmailTemplate />
            </EmailTemplateConfig>
          </EmailPartsContent>
        </PreviewText>,
      )
      await user.click(rendered.getByRole('button', { name: 'Save' }))
      return rendered
    }

    describe('form fields', () => {
      beforeEach(() => {
        const mutationResult =
          buildUseMutationResult<ReturnType<typeof useCreateOrUpdateEmailTemplate>>()
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
      })

      it("uses the email template's name as the default value for name", async () => {
        const { getByRole } = await renderAndOpen()
        const input = getByRole('textbox', { name: 'Name' })
        expect(input).toHaveValue(emailTemplateConfig.name)
      })

      it("uses the email template's description as the default value for description", async () => {
        const { getByRole } = await renderAndOpen()
        const input = getByRole('textbox', { name: 'Description' })
        expect(input).toHaveValue(emailTemplateConfig.description)
      })
    })

    describe('successful mutation', () => {
      it('creates/updates an email template', async () => {
        const mutate = jest.fn()
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          mutateAsync: mutate,
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
        const { getByRole, getByLabelText } = await renderAndOpen()

        expect(mutate).not.toHaveBeenCalled()

        const emailTemplateName = faker.lorem.words(3)
        const emailTemplateDescription = faker.lorem.sentence()
        await user.clear(getByLabelText('Name'))
        await user.type(getByLabelText('Name'), emailTemplateName)
        await user.clear(getByLabelText('Description'))
        await user.type(getByLabelText('Description'), emailTemplateDescription)
        await user.click(getByRole('button', { name: 'Save' }))

        expect(mutate).toHaveBeenCalledWith({
          name: emailTemplateName,
          description: emailTemplateDescription,
          previewText: newPreviewText,
          components: [
            { ...nameComponent, defaultValue: newNameComponentValue, subComponents: undefined },
          ],
        })
      })
    })

    describe('successful update', () => {
      beforeEach(() => {
        emailTemplateConfig.id = randomUUID()
      })

      it('does not navigate away', async () => {
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          mutateAsync: jest.fn().mockResolvedValue({ id: '123' }),
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)

        const { getByRole } = await renderAndOpen()

        expect(navigate).not.toHaveBeenCalled()
        await user.click(getByRole('button', { name: 'Save' }))
        expect(navigate).not.toHaveBeenCalled()
      })

      it('closes the dialog', async () => {
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          mutateAsync: jest.fn().mockResolvedValue({ id: '123' }),
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)

        const { getByRole, queryByRole } = await renderAndOpen()
        expect(queryByRole('dialog')).not.toBeNull()
        await user.click(getByRole('button', { name: 'Save' }))
        expect(queryByRole('dialog')).toBeNull()
      })
    })

    describe('successful creation', () => {
      it('navigates to the my library page', async () => {
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          mutateAsync: jest.fn().mockResolvedValue({ id: '123' }),
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
        const { getByRole } = await renderAndOpen()

        expect(navigate).not.toHaveBeenCalled()
        await user.click(getByRole('button', { name: 'Save' }))
        expect(navigate).toHaveBeenCalledWith('/my-library')
      })
    })

    describe('unsuccessful mutation', () => {
      it('displays an error message when the request goes wrong', async () => {
        const error = new Error(faker.lorem.sentence())
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          error,
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
        const { baseElement } = await renderAndOpen()

        expect(baseElement).toHaveTextContent(error.message)
      })

      it('displays an error message when there are validation errors', async () => {
        const errorsResponse = { errors: { name: faker.lorem.sentence() } }
        const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
        const mutationResult = buildUseMutationResult<
          ReturnType<typeof useCreateOrUpdateEmailTemplate>
        >({
          mutateAsync,
        })
        asMock(useCreateOrUpdateEmailTemplate).mockReturnValue(mutationResult)
        const { baseElement, getByRole } = await renderAndOpen()
        await user.click(getByRole('button', { name: 'Save' }))

        expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
      })
    })
  })
})

describe('emailTemplateMergeDefaultValues', () => {
  describe('components', () => {
    let emailTemplate: EmailTemplate.UniqueConfig
    let nameComponent: EmailTemplate.Name

    beforeEach(() => {
      nameComponent = buildUniqueEmailComponent('Name', {
        defaultValue: { name: faker.lorem.word() },
      })
      emailTemplate = buildUniqueEmailConfig({
        components: [nameComponent],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newNameValue: NameValue = { name: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(emailTemplate, {
        [nameComponent.id]: newNameValue,
      })
      expect(result.components).toEqual([{ ...nameComponent, defaultValue: newNameValue }])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {})
      expect(result.components).toEqual([nameComponent])
    })
  })

  describe('subcomponents', () => {
    let emailTemplate: EmailTemplate.UniqueConfig
    let headerComponent: EmailTemplate.Header
    let dateRangeSubComponent: EmailTemplate.DateRange

    beforeEach(() => {
      dateRangeSubComponent = buildUniqueEmailSubComponent('Header', {
        kind: 'DateRange',
        defaultValue: { range: faker.lorem.word() },
      })

      headerComponent = buildUniqueEmailComponent('Header', {
        subComponents: [dateRangeSubComponent],
      })
      emailTemplate = buildUniqueEmailConfig({
        components: [headerComponent],
      })
    })

    it('replaces the default value with the value in content data', () => {
      const newDateRangeValue: DateRangeValue = { range: faker.lorem.words(3) }
      const result = emailTemplateMergeDefaultValues(emailTemplate, {
        [dateRangeSubComponent.id]: newDateRangeValue,
      })
      expect(result.components).toEqual([
        {
          ...headerComponent,
          subComponents: [{ ...dateRangeSubComponent, defaultValue: newDateRangeValue }],
        },
      ])
    })

    it('uses the existing value when there is no value in content data', () => {
      const result = emailTemplateMergeDefaultValues(emailTemplate, {})
      expect(result.components).toEqual([headerComponent])
    })
  })
})
