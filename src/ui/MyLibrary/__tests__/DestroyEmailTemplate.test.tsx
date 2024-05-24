import React from 'react'
import { buildEmailTemplateIndex, buildUseMutationResult } from 'src/factories'
import { useDestroyEmailTemplate } from 'src/network/useDestroyEmailTemplate'
import { asMock } from 'src/testHelpers'
import { DestroyEmailTemplate } from '../DestroyEmailTemplate'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { randomUUID } from 'crypto'
import { EmailTemplateIndex } from 'src/network/useEmailTemplates'
import { faker } from '@faker-js/faker'

jest.mock('src/network/useDestroyEmailTemplate', () => {
  return { useDestroyEmailTemplate: jest.fn() }
})

describe('DestroyEmailTemplate', () => {
  let user: UserEvent
  let id: string
  let emailTemplate: EmailTemplateIndex

  beforeEach(() => {
    user = userEvent.setup()
    id = randomUUID()
    emailTemplate = buildEmailTemplateIndex({ id })
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
      await user.click(getByRole('button', { name: 'Delete' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(<DestroyEmailTemplate emailTemplate={emailTemplate} />)
      await user.click(rendered.getByRole('button', { name: 'Delete' }))
      return rendered
    }

    it('confirms and destroys the email template successfully and closes the modal', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyEmailTemplate>>({
        mutateAsync,
      })
      asMock(useDestroyEmailTemplate).mockReturnValue(mutationResult)
      const { getByRole, queryByRole } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()

      await user.click(getByRole('button', { name: 'Delete' }))

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
