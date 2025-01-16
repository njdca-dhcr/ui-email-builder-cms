import React from 'react'
import { buildEmailTemplateIndexItem, buildUseMutationResult } from 'src/factories'
import { useDestroyEmailTemplate } from 'src/network/emailTemplates'
import { asMock } from 'src/testHelpers'
import { DestroyEmailTemplate } from '../DestroyEmailTemplate'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { randomUUID } from 'crypto'
import { EmailTemplateIndexItem } from 'src/network/emailTemplates'
import { faker } from '@faker-js/faker'

jest.mock('src/network/emailTemplates', () => {
  return { useDestroyEmailTemplate: jest.fn() }
})

describe('DestroyEmailTemplate', () => {
  let user: UserEvent
  let id: string
  let emailTemplate: EmailTemplateIndexItem

  beforeEach(() => {
    user = userEvent.setup()
    id = randomUUID()
    emailTemplate = buildEmailTemplateIndexItem({ id })
  })

  describe('when closed', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>()
      asMock(useDestroyEmailTemplate).mockReturnValue(mutationResult)
    })

    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(
        <DestroyEmailTemplate emailTemplate={emailTemplate} />,
      )
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: 'Delete Template' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(<DestroyEmailTemplate emailTemplate={emailTemplate} />)
      await user.click(rendered.getByRole('button', { name: 'Delete Template' }))
      return rendered
    }

    it('can be closed', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>({
        mutateAsync,
      })

      const { getByRole, queryByRole, queryByText } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(queryByRole('dialog')).toBeNull()
    })

    it('confirms and destroys the email template successfully and closes the modal', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>({
        mutateAsync,
      })
      asMock(useDestroyEmailTemplate).mockReturnValue(mutationResult)
      const { getByRole, queryByRole, queryByText } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()
      expect(queryByText(emailTemplate.name)).not.toBeNull()

      await user.click(getByRole('button', { name: 'Delete Template' }))

      expect(mutateAsync).toHaveBeenCalledWith(id)
      expect(queryByRole('dialog')).toBeNull()
    })

    it('displays a loading spinner when destroying the email template', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>({
        isPending: true,
      })
      asMock(useDestroyEmailTemplate).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Deleting email template')
    })

    it('displays an error when destroying the email template fails', async () => {
      const errorMessage = faker.lorem.sentence()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>({
        error: new Error(errorMessage),
      })
      asMock(useDestroyEmailTemplate).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent(errorMessage)
    })
  })
})
